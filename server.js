import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import multer from 'multer';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5005;
const JWT_SECRET = process.env.JWT_SECRET || 'venus_secret_jwt_key_ambition_2026_hospital_doors';

// Ensure necessary directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'public', 'uploads');
const publicAssetsDir = path.join(__dirname, 'public', 'assets');
const distDir = path.join(__dirname, 'dist');

[dataDir, uploadsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const SERVICES_FILE = path.join(dataDir, 'services.json');
const CONTACTS_FILE = path.join(dataDir, 'contacts.json');
const ADMIN_FILE = path.join(dataDir, 'admin.json');

// Helper functions for reading and writing JSON files
function readJson(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      writeJson(filePath, defaultValue);
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Password hashing helpers using built-in crypto (scrypt)
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password, salt, hash) {
  try {
    const computed = hashPassword(password, salt);
    return crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(hash, 'hex'));
  } catch {
    return false;
  }
}

// Initialize Admin credentials if not present
function initAdmin() {
  let admin = readJson(ADMIN_FILE, null);
  if (!admin || !admin.passwordHash) {
    const salt = crypto.randomBytes(16).toString('hex');
    const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin@Venus2026';
    admin = {
      id: 'admin-1',
      name: 'Venus Administrator',
      username: 'admin',
      email: 'admin@venushospitaldoors.com',
      passwordHash: hashPassword(defaultPassword, salt),
      salt: salt,
      resetToken: null,
      resetTokenExpires: null,
      lastLogin: null,
    };
    writeJson(ADMIN_FILE, admin);
    console.log('Initialized default admin account (username: admin)');
  }
}
initAdmin();

// Token generation and verification using HMAC-SHA256
function createToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expected = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (expected !== signature) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

// Middleware: Admin Auth Guard
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please login.' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session. Please login again.' });
  }
  req.admin = decoded;
  next();
}

// Nodemailer transporter helper (graceful fallback if SMTP not configured)
function getMailTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
}

// Multer storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, 'service-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg|gif/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    if (allowed.test(ext) || allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP, SVG, GIF) are allowed.'));
    }
  },
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static Assets Serving:
// 1. Vite JS/CSS production bundles from dist/assets
app.use('/assets', express.static(path.join(distDir, 'assets')));

// 2. Uploaded files (from admin panel)
app.use('/uploads', express.static(uploadsDir));
app.use('/public/uploads', express.static(uploadsDir));

// 3. Static Images (support /assets/images/..., /public/assets/images/...)
app.use('/assets/images', express.static(path.join(publicAssetsDir, 'images')));
app.use('/public/assets/images', express.static(path.join(publicAssetsDir, 'images')));

// 4. Additional static assets
app.use('/assets', express.static(publicAssetsDir));
app.use('/public/assets', express.static(publicAssetsDir));

// 5. Vite production root files (index.html, favicon.svg, icons.svg)
app.use(express.static(distDir));

// -------------------------------------------------------------
// PUBLIC API ROUTES
// -------------------------------------------------------------

// 1. Contact Form Submission (Backend API)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const newInquiry = {
      id: 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    // Save to contacts.json
    const contacts = readJson(CONTACTS_FILE, []);
    contacts.unshift(newInquiry);
    writeJson(CONTACTS_FILE, contacts);

    // Attempt email notification if SMTP is configured
    try {
      const transporter = getMailTransporter();
      if (transporter) {
        const toEmail = process.env.ADMIN_RECEIVER_EMAIL || 'venushospitaldoorsolutions@gmail.com';
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"${name}" <${email}>`,
          to: toEmail,
          replyTo: email,
          subject: `[New Inquiry] ${newInquiry.subject} from ${name}`,
          html: `
            <h2>New Contact Inquiry - Venus Hospital Door Solutions</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject/Product:</strong> ${newInquiry.subject}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
            <hr />
            <p><small>Received at: ${new Date().toLocaleString()}</small></p>
          `,
        });
      }
    } catch (mailErr) {
      console.warn('SMTP notification failed (inquiry saved to database):', mailErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted successfully. Our team will contact you shortly.',
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your message. Please try again.',
    });
  }
});

// 2. Dynamic Services (Public API)
app.get('/api/services', (req, res) => {
  try {
    const services = readJson(SERVICES_FILE, []);
    // Return only active services, sorted by order
    const activeServices = services
      .filter((s) => s.active !== false)
      .sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99));

    return res.json({ success: true, count: activeServices.length, data: activeServices });
  } catch (error) {
    console.error('Get services error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch services.' });
  }
});

app.get('/api/services/:id', (req, res) => {
  try {
    const { id } = req.params;
    const services = readJson(SERVICES_FILE, []);
    const service = services.find((s) => s.id === id || s.slug === id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    return res.json({ success: true, data: service });
  } catch (error) {
    console.error('Get service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch service.' });
  }
});

// -------------------------------------------------------------
// ADMIN AUTHENTICATION API ROUTES
// -------------------------------------------------------------

// Admin Login
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username/Email and password are required.' });
    }

    const admin = readJson(ADMIN_FILE, null);
    if (!admin) {
      return res.status(500).json({ success: false, message: 'Admin account not initialized.' });
    }

    const matchesUser =
      admin.username.toLowerCase() === username.trim().toLowerCase() ||
      admin.email.toLowerCase() === username.trim().toLowerCase();

    if (!matchesUser || !verifyPassword(password, admin.salt, admin.passwordHash)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your username and password.' });
    }

    admin.lastLogin = new Date().toISOString();
    writeJson(ADMIN_FILE, admin);

    const token = createToken({ id: admin.id, username: admin.username, email: admin.email });

    return res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
  }
});

// Get Current Admin Profile
app.get('/api/admin/me', authenticateAdmin, (req, res) => {
  const admin = readJson(ADMIN_FILE, null);
  if (!admin) {
    return res.status(404).json({ success: false, message: 'Admin not found.' });
  }
  return res.json({
    success: true,
    admin: {
      id: admin.id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
      lastLogin: admin.lastLogin,
    },
  });
});

// Admin Forgot Password
app.post('/api/admin/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const admin = readJson(ADMIN_FILE, null);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }

    if (admin.email.toLowerCase() !== email.trim().toLowerCase()) {
      return res.status(404).json({ success: false, message: 'No admin account found with that email address.' });
    }

    // Generate 6-digit verification code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 60 * 60 * 1000; // 1 hour

    admin.resetToken = resetCode;
    admin.resetTokenExpires = expires;
    writeJson(ADMIN_FILE, admin);

    // Try sending email if SMTP is configured
    let emailSent = false;
    try {
      const transporter = getMailTransporter();
      if (transporter) {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || '"Venus Admin Security" <no-reply@venushospitaldoors.com>',
          to: admin.email,
          subject: 'Your Venus Admin Password Reset Code',
          html: `
            <h2>Venus Hospital Door Solutions - Admin Reset Code</h2>
            <p>You requested to reset your password. Use the 6-digit code below to reset your password:</p>
            <h1 style="background: #0d2c54; color: #fff; padding: 12px 24px; display: inline-block; letter-spacing: 4px;">${resetCode}</h1>
            <p>This code expires in 1 hour.</p>
            <p>If you did not make this request, you can safely ignore this email.</p>
          `,
        });
        emailSent = true;
      }
    } catch (err) {
      console.warn('Failed to send reset email via SMTP:', err.message);
    }

    return res.json({
      success: true,
      message: emailSent
        ? 'A 6-digit password reset code has been sent to your email.'
        : 'Password reset code generated. Use code below to reset password.',
      // Always provide resetCode in development/fallback mode so user is never blocked
      resetCode: resetCode,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ success: false, message: 'Unable to process reset request.' });
  }
});

// Admin Reset Password (with code)
app.post('/api/admin/reset-password', (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email, reset code, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    const admin = readJson(ADMIN_FILE, null);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin account not found.' });
    }

    if (admin.email.toLowerCase() !== email.trim().toLowerCase()) {
      return res.status(400).json({ success: false, message: 'Email does not match.' });
    }

    if (!admin.resetToken || admin.resetToken !== code.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid reset code.' });
    }

    if (!admin.resetTokenExpires || Date.now() > admin.resetTokenExpires) {
      return res.status(400).json({ success: false, message: 'Reset code has expired. Please request a new one.' });
    }

    // Update password
    const newSalt = crypto.randomBytes(16).toString('hex');
    admin.passwordHash = hashPassword(newPassword, newSalt);
    admin.salt = newSalt;
    admin.resetToken = null;
    admin.resetTokenExpires = null;
    writeJson(ADMIN_FILE, admin);

    return res.json({ success: true, message: 'Password reset successfully! You can now log in.' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, message: 'Password reset failed.' });
  }
});

// Admin Change Password (Authenticated)
app.post('/api/admin/change-password', authenticateAdmin, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current password and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' });
    }

    const admin = readJson(ADMIN_FILE, null);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }

    if (!verifyPassword(currentPassword, admin.salt, admin.passwordHash)) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    const newSalt = crypto.randomBytes(16).toString('hex');
    admin.passwordHash = hashPassword(newPassword, newSalt);
    admin.salt = newSalt;
    writeJson(ADMIN_FILE, admin);

    return res.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ success: false, message: 'Failed to change password.' });
  }
});

// -------------------------------------------------------------
// ADMIN SERVICES CRUD ROUTES
// -------------------------------------------------------------

// Get All Services (Admin view)
app.get('/api/admin/services', authenticateAdmin, (req, res) => {
  try {
    const services = readJson(SERVICES_FILE, []);
    return res.json({ success: true, data: services });
  } catch (error) {
    console.error('Admin get services error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch services.' });
  }
});

function parseProjects(projects) {
  if (!Array.isArray(projects)) return null;
  return projects
    .map((p, i) => ({
      id: (p && p.id) || `project-${Date.now()}-${i}`,
      name: String((p && p.name) || '').trim(),
      price: String((p && p.price) || '').trim(),
      image: String((p && p.image) || '').trim(),
    }))
    .filter((p) => p.name && p.image);
}

// Create New Service
app.post('/api/admin/services', authenticateAdmin, (req, res) => {
  try {
    const { title, description, image, icon, href, slug, features, projects, order, active } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const services = readJson(SERVICES_FILE, []);

    const generatedSlug = slug
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newId = generatedSlug || 'service-' + Date.now();
    const serviceNumber = String(services.length + 1).padStart(2, '0');

    // Parse features if string
    let parsedFeatures = [];
    if (Array.isArray(features)) {
      parsedFeatures = features;
    } else if (typeof features === 'string') {
      parsedFeatures = features.split('\n').map((f) => f.trim()).filter(Boolean);
    }

    const newService = {
      id: newId,
      number: serviceNumber,
      title: title.trim(),
      slug: generatedSlug,
      description: description.trim(),
      image: image || '/assets/images/services/OT.png',
      icon: icon || 'DoorOpen',
      href: href || `/services/${generatedSlug}`,
      features: parsedFeatures,
      projects: parseProjects(projects) || [],
      order: Number(order) || services.length + 1,
      active: active !== false,
      createdAt: new Date().toISOString(),
    };

    services.push(newService);
    writeJson(SERVICES_FILE, services);

    return res.status(201).json({ success: true, message: 'Service created successfully!', data: newService });
  } catch (error) {
    console.error('Create service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create service.' });
  }
});

// Update Existing Service
app.put('/api/admin/services/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, icon, href, slug, features, projects, order, active } = req.body;

    const services = readJson(SERVICES_FILE, []);
    const index = services.findIndex((s) => s.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    let parsedFeatures = services[index].features;
    if (Array.isArray(features)) {
      parsedFeatures = features;
    } else if (typeof features === 'string') {
      parsedFeatures = features.split('\n').map((f) => f.trim()).filter(Boolean);
    }

    services[index] = {
      ...services[index],
      title: title !== undefined ? title.trim() : services[index].title,
      description: description !== undefined ? description.trim() : services[index].description,
      image: image !== undefined ? image : services[index].image,
      icon: icon !== undefined ? icon : services[index].icon,
      href: href !== undefined ? href : services[index].href,
      slug: slug !== undefined ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') : services[index].slug,
      features: parsedFeatures,
      projects: parseProjects(projects) || services[index].projects || [],
      order: order !== undefined ? Number(order) : services[index].order,
      active: active !== undefined ? Boolean(active) : services[index].active,
      updatedAt: new Date().toISOString(),
    };

    writeJson(SERVICES_FILE, services);

    return res.json({ success: true, message: 'Service updated successfully!', data: services[index] });
  } catch (error) {
    console.error('Update service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update service.' });
  }
});

// Delete Service
app.delete('/api/admin/services/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    let services = readJson(SERVICES_FILE, []);
    const initialLen = services.length;
    services = services.filter((s) => s.id !== id);

    if (services.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    writeJson(SERVICES_FILE, services);
    return res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    console.error('Delete service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete service.' });
  }
});

// Image Upload Endpoint
app.post('/api/admin/upload', authenticateAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    return res.json({ success: true, url: imageUrl, filename: req.file.filename });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: 'File upload failed.' });
  }
});

// -------------------------------------------------------------
// ADMIN CONTACT MESSAGES ROUTES
// -------------------------------------------------------------

// Get All Contact Messages
app.get('/api/admin/contacts', authenticateAdmin, (req, res) => {
  try {
    const contacts = readJson(CONTACTS_FILE, []);
    return res.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch contact inquiries.' });
  }
});

// Mark Contact as Read/Unread
app.patch('/api/admin/contacts/:id/read', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;
    const contacts = readJson(CONTACTS_FILE, []);
    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    contacts[index].read = read !== undefined ? Boolean(read) : true;
    writeJson(CONTACTS_FILE, contacts);

    return res.json({ success: true, data: contacts[index] });
  } catch (error) {
    console.error('Update contact status error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
});

// Delete Contact Message
app.delete('/api/admin/contacts/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    let contacts = readJson(CONTACTS_FILE, []);
    const initialLen = contacts.length;
    contacts = contacts.filter((c) => c.id !== id);

    if (contacts.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    writeJson(CONTACTS_FILE, contacts);
    return res.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error) {
    console.error('Delete contact error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete inquiry.' });
  }
});

// -------------------------------------------------------------
// SPA Catch-All Fallback (Compatible with Express 4 & 5)
// -------------------------------------------------------------
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  // Any static file with extension not found on disk should 404, not fallback to index.html
  if (path.extname(req.path)) {
    return res.status(404).send('Not Found');
  }
  const indexPath = path.join(distDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head><title>Venus Backend Server Running</title></head>
      <body style="font-family: system-ui, sans-serif; padding: 40px; text-align: center;">
        <h1 style="color: #0b1a2f;">Venus Hospital Door Solutions Backend API is running!</h1>
        <p>Port: ${PORT}</p>
        <p>To view the full React frontend, run <code>npm run build</code> or start the Vite dev server with <code>npm run dev</code>.</p>
        <p><a href="/api/services" style="color: #c98b2c; font-weight: bold;">View Services API (/api/services)</a></p>
      </body>
    </html>
  `);
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` Venus Backend Server running on port ${PORT}`);
  console.log(` Health/Services API: http://localhost:${PORT}/api/services`);
  console.log(` Default Admin Email: admin@venushospitaldoors.com`);
  console.log(` Default Admin Password: Admin@Venus2026`);
  console.log(`=================================================`);
});

// Keep process active and handle graceful shutdowns
setInterval(() => {}, 1000 * 60 * 60);

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
