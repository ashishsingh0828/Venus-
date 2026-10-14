import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Layers,
  Mail,
  KeyRound,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Upload,
  RefreshCw,
  Clock,
  Eye,
  EyeOff,
  User,
  Phone,
  Search,
  Check,
  ArrowUp,
  ArrowDown,
  Briefcase,
  MapPin,
  Calendar,
} from 'lucide-react';
import './Admin.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'projects' | 'contacts' | 'security'
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'danger', message: '' }

  // Modal State for Add/Edit Service
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    slug: '',
    description: '',
    image: '/assets/images/services/OT.png',
    icon: 'DoorOpen',
    href: '',
    features: '',
    projects: [],
    order: 1,
    active: true,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingProjectIndex, setUploadingProjectIndex] = useState(null);

  // Modal State for Add/Edit Project
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    slug: '',
    category: 'Hospital & OT Doors',
    client: '',
    location: '',
    year: '2025',
    image: '/assets/images/project/OT.png',
    gallery: ['/assets/images/project/OT.png'],
    description: '',
    scope: '',
    specifications: '',
    order: 1,
    active: true,
  });
  const [uploadingProjectMainImage, setUploadingProjectMainImage] = useState(false);
  const [uploadingGalleryIdx, setUploadingGalleryIdx] = useState(null);

  // Security / Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [securityLoading, setSecurityLoading] = useState(false);

  // Contact filter & search
  const [contactSearch, setContactSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('venus_admin_token');
  const user = JSON.parse(localStorage.getItem('venus_admin_user') || '{}');

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  // Fetch Services & Contacts
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Services
      const servRes = await fetch('/api/admin/services', {
        headers: getAuthHeaders(),
      });
      if (servRes.status === 401) {
        handleLogout();
        return;
      }
      const servData = await servRes.json();
      if (servData.success) {
        setServices(servData.data);
      }

      // 2. Fetch Projects
      const projRes = await fetch('/api/admin/projects', {
        headers: getAuthHeaders(),
      });
      const projData = await projRes.json();
      if (projData.success) {
        setProjects(projData.data);
      }

      // 3. Fetch Contacts
      const contRes = await fetch('/api/admin/contacts', {
        headers: getAuthHeaders(),
      });
      const contData = await contRes.json();
      if (contData.success) {
        setContacts(contData.data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      showAlert('Could not load data from backend server.', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('venus_admin_token');
    localStorage.removeItem('venus_admin_user');
    navigate('/admin/login');
  };

  // Open Modal for Create
  const handleOpenCreateModal = () => {
    setEditingService(null);
    setServiceFormData({
      title: '',
      slug: '',
      description: '',
      image: '/assets/images/services/OT.png',
      icon: 'DoorOpen',
      href: '',
      features: '',
      projects: [],
      order: services.length + 1,
      active: true,
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setServiceFormData({
      title: service.title,
      slug: service.slug || service.id,
      description: service.description,
      image: service.image || '/assets/images/services/OT.png',
      icon: service.icon || 'DoorOpen',
      href: service.href || `/services/${service.slug || service.id}`,
      features: Array.isArray(service.features) ? service.features.join('\n') : '',
      projects: Array.isArray(service.projects) ? service.projects.map((p) => ({ ...p })) : [],
      order: service.order || 1,
      active: service.active !== false,
    });
    setIsModalOpen(true);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Image upload failed');
    }
    return data.url;
  };

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadFile(file);
      setServiceFormData((prev) => ({ ...prev, image: url }));
      showAlert('Image uploaded successfully!');
    } catch (err) {
      showAlert(err.message || 'Image upload error', 'danger');
    } finally {
      setUploadingImage(false);
    }
  };

  // Projects slider items
  const updateProject = (index, field, value) => {
    setServiceFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    }));
  };

  const addProject = () => {
    setServiceFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: `project-${Date.now()}`, name: '', price: '', image: '' },
      ],
    }));
  };

  const removeProject = (index) => {
    setServiceFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const moveProject = (index, direction) => {
    setServiceFormData((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.projects.length) return prev;
      const projects = [...prev.projects];
      [projects[index], projects[target]] = [projects[target], projects[index]];
      return { ...prev, projects };
    });
  };

  const handleProjectImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingProjectIndex(index);
    try {
      const url = await uploadFile(file);
      updateProject(index, 'image', url);
      showAlert('Project image uploaded!');
    } catch (err) {
      showAlert(err.message || 'Image upload error', 'danger');
    } finally {
      setUploadingProjectIndex(null);
    }
  };

  // Save Service (Create or Update)
  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...serviceFormData,
        features: serviceFormData.features
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
        projects: serviceFormData.projects.filter((p) => p.name.trim() && p.image.trim()),
      };

      const url = editingService
        ? `/api/admin/services/${editingService.id}`
        : '/api/admin/services';
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Save failed');
      }

      showAlert(editingService ? 'Service updated successfully!' : 'Service created successfully!');
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      showAlert(err.message || 'Failed to save service.', 'danger');
    }
  };

  // Delete Service
  const handleDeleteService = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Delete failed');
      }
      showAlert(`Deleted "${title}".`);
      fetchData();
    } catch (err) {
      showAlert(err.message || 'Delete failed.', 'danger');
    }
  };

  // Project Management Handlers
  const handleOpenCreateProjectModal = () => {
    setEditingProject(null);
    setProjectFormData({
      title: '',
      slug: '',
      category: 'Hospital & OT Doors',
      client: '',
      location: 'India',
      year: new Date().getFullYear().toString(),
      image: '/assets/images/project/OT.png',
      gallery: ['/assets/images/project/OT.png'],
      description: '',
      scope: '',
      specifications: '',
      order: projects.length + 1,
      active: true,
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectFormData({
      title: proj.title || '',
      slug: proj.slug || proj.id,
      category: proj.category || 'Hospital & OT Doors',
      client: proj.client || '',
      location: proj.location || '',
      year: proj.year || '',
      image: proj.image || '/assets/images/project/OT.png',
      gallery:
        Array.isArray(proj.gallery) && proj.gallery.length > 0
          ? [...proj.gallery]
          : [proj.image || '/assets/images/project/OT.png'],
      description: proj.description || '',
      scope: proj.scope || '',
      specifications: Array.isArray(proj.specifications)
        ? proj.specifications.join('\n')
        : proj.specifications || '',
      order: proj.order || 1,
      active: proj.active !== false,
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectFormData.title.trim()) {
      showAlert('Project title is required.', 'danger');
      return;
    }
    if (!projectFormData.description.trim()) {
      showAlert('Project description is required.', 'danger');
      return;
    }

    try {
      const payload = {
        ...projectFormData,
        specifications:
          typeof projectFormData.specifications === 'string'
            ? projectFormData.specifications
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean)
            : projectFormData.specifications,
        gallery: Array.isArray(projectFormData.gallery)
          ? projectFormData.gallery.filter(Boolean)
          : [projectFormData.image],
      };

      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Save failed');
      }

      showAlert(
        editingProject
          ? 'Project updated successfully!'
          : 'Project created successfully!'
      );
      setIsProjectModalOpen(false);
      fetchData();
    } catch (err) {
      showAlert(err.message || 'Failed to save project.', 'danger');
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Delete failed');
      }
      showAlert(`Deleted project "${title}".`);
      fetchData();
    } catch (err) {
      showAlert(err.message || 'Delete failed.', 'danger');
    }
  };

  const handleProjectMainUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingProjectMainImage(true);
    try {
      const url = await uploadFile(file);
      setProjectFormData((prev) => ({
        ...prev,
        image: url,
        gallery:
          prev.gallery.length === 0 ||
          (prev.gallery.length === 1 && prev.gallery[0] === '/assets/images/project/OT.png')
            ? [url]
            : prev.gallery,
      }));
      showAlert('Project main image uploaded!');
    } catch (err) {
      showAlert(err.message || 'Image upload error', 'danger');
    } finally {
      setUploadingProjectMainImage(false);
    }
  };

  const handleProjectGalleryUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingGalleryIdx(index);
    try {
      const url = await uploadFile(file);
      setProjectFormData((prev) => {
        const newGallery = [...prev.gallery];
        newGallery[index] = url;
        return { ...prev, gallery: newGallery };
      });
      showAlert('Gallery photo uploaded!');
    } catch (err) {
      showAlert(err.message || 'Gallery upload error', 'danger');
    } finally {
      setUploadingGalleryIdx(null);
    }
  };

  const addGalleryItem = () => {
    setProjectFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ''],
    }));
  };

  const updateGalleryItem = (index, val) => {
    setProjectFormData((prev) => {
      const newGallery = [...prev.gallery];
      newGallery[index] = val;
      return { ...prev, gallery: newGallery };
    });
  };

  const removeGalleryItem = (index) => {
    setProjectFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Toggle Contact Read Status
  const handleToggleContactRead = async (id, currentRead) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}/read`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ read: !currentRead }),
      });
      const data = await response.json();
      if (data.success) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, read: !currentRead } : c))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Contact
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        showAlert('Inquiry deleted.');
        setContacts((prev) => prev.filter((c) => c.id !== id));
        if (selectedContact?.id === id) setSelectedContact(null);
      }
    } catch (err) {
      showAlert('Could not delete inquiry.', 'danger');
    }
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showAlert('New password must be at least 6 characters.', 'danger');
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert('New passwords do not match.', 'danger');
      return;
    }

    setSecurityLoading(true);
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to change password');
      }

      showAlert('Password changed successfully! Keep it safe.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      showAlert(err.message || 'Failed to change password.', 'danger');
    } finally {
      setSecurityLoading(false);
    }
  };

  const filteredContacts = contacts.filter((c) => {
    const q = contactSearch.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.subject?.toLowerCase().includes(q) ||
      c.message?.toLowerCase().includes(q)
    );
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="admin-dashboard-layout">
      {/* Top Navbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-brand">
            <ShieldCheck size={28} color="#c98b2c" />
            <div className="brand-title-wrap">
              <h1>VENUS ADMIN</h1>
              <span>Hospital Door Solutions</span>
            </div>
          </div>
        </div>

        <nav className="admin-nav-tabs">
          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Layers size={18} />
            <span>Dynamic Services</span>
            <span className="tab-badge">{services.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Briefcase size={18} />
            <span>Dynamic Projects</span>
            <span className="tab-badge">{projects.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <Mail size={18} />
            <span>Contact Inquiries</span>
            {unreadCount > 0 ? (
              <span className="tab-badge highlight">{unreadCount}</span>
            ) : (
              <span className="tab-badge">{contacts.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <KeyRound size={18} />
            <span>Change Password</span>
          </button>
        </nav>

        <div className="admin-topbar-right">
          <Link to="/" target="_blank" className="admin-btn-action" title="View Public Website">
            <ExternalLink size={16} />
            <span>View Site</span>
          </Link>
          <button onClick={handleLogout} className="admin-btn-logout" title="Sign Out">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Alert Banner */}
      {alert && (
        <div className={`admin-toast admin-toast-${alert.type}`}>
          <span>{alert.message}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="admin-content-area">
        {isLoading ? (
          <div className="admin-loading-state">
            <RefreshCw size={36} className="spin-icon" color="#c98b2c" />
            <p>Connecting to backend API...</p>
          </div>
        ) : (
          <>
            {/* TAB 1: DYNAMIC SERVICES */}
            {activeTab === 'services' && (
              <section className="admin-tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Dynamic Services Management</h2>
                    <p>Manage services displayed across the Services page &amp; homepage sliders in real time.</p>
                  </div>
                  <button onClick={handleOpenCreateModal} className="admin-btn admin-btn-primary">
                    <Plus size={18} />
                    <span>Add New Service</span>
                  </button>
                </div>

                <div className="admin-table-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Image</th>
                        <th>Title &amp; Route</th>
                        <th>Description</th>
                        <th>Features</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, idx) => (
                        <tr key={service.id || idx}>
                          <td style={{ fontWeight: '600', color: '#c98b2c' }}>
                            #{service.order || idx + 1}
                          </td>
                          <td>
                            <div className="service-thumb-wrap">
                              <img
                                src={service.image}
                                alt={service.title}
                                className="service-thumb-img"
                                onError={(e) => {
                                  e.target.src = '/assets/images/services/OT.png';
                                }}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="service-title-cell">
                              <strong>{service.title}</strong>
                              <span className="service-route-sub">
                                {service.href || `/services/${service.slug}`}
                              </span>
                            </div>
                          </td>
                          <td className="service-desc-cell">
                            <p>{service.description}</p>
                          </td>
                          <td>
                            <span className="feature-count-pill">
                              {service.features?.length || 0} specs
                            </span>
                            <span className="feature-count-pill">
                              {service.projects?.length || 0} projects
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status-pill ${
                                service.active !== false ? 'status-active' : 'status-inactive'
                              }`}
                            >
                              {service.active !== false ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions">
                              <button
                                onClick={() => handleOpenEditModal(service)}
                                className="action-btn edit"
                                title="Edit Service"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id, service.title)}
                                className="action-btn delete"
                                title="Delete Service"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* TAB 2: DYNAMIC PROJECTS */}
            {activeTab === 'projects' && (
              <section className="admin-tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Dynamic Projects Management</h2>
                    <p>Manage hospital engineering installations, OT projects, specifications, and client showcase.</p>
                  </div>
                  <button onClick={handleOpenCreateProjectModal} className="admin-btn admin-btn-primary">
                    <Plus size={18} />
                    <span>Add New Project</span>
                  </button>
                </div>

                <div className="admin-table-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Image</th>
                        <th>Project Title &amp; Category</th>
                        <th>Client &amp; Location</th>
                        <th>Year</th>
                        <th>Specifications</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.length === 0 ? (
                        <tr>
                          <td colSpan="8" style={{ textAlign: 'center', padding: '36px' }}>
                            <p style={{ color: '#8a99ad', margin: 0 }}>No projects found. Click "Add New Project" to create one.</p>
                          </td>
                        </tr>
                      ) : (
                        projects.map((proj, idx) => (
                          <tr key={proj.id || idx}>
                            <td style={{ fontWeight: '600', color: '#c98b2c' }}>
                              #{proj.order || idx + 1}
                            </td>
                            <td>
                              <div className="service-thumb-wrap">
                                <img
                                  src={proj.image}
                                  alt={proj.title}
                                  className="service-thumb-img"
                                  onError={(e) => {
                                    e.target.src = '/assets/images/project/OT.png';
                                  }}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="service-title-cell">
                                <strong>{proj.title}</strong>
                                <span className="service-route-sub" style={{ color: '#c98b2c', fontWeight: 500 }}>
                                  {proj.category || 'Hospital & OT Doors'}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <strong>{proj.client || 'Medical Facility'}</strong>
                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{proj.location || 'India'}</span>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontWeight: 600, color: '#334155' }}>{proj.year || '2025'}</span>
                            </td>
                            <td>
                              <span className="feature-count-pill">
                                {proj.specifications?.length || 0} specs
                              </span>
                              <span className="feature-count-pill">
                                {proj.gallery?.length || 1} photos
                              </span>
                            </td>
                            <td>
                              <span
                                className={`status-pill ${
                                  proj.active !== false ? 'status-active' : 'status-inactive'
                                }`}
                              >
                                {proj.active !== false ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div className="table-actions">
                                <Link
                                  to={`/project/${proj.slug || proj.id}`}
                                  target="_blank"
                                  className="action-btn"
                                  title="View Project Page"
                                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                  <ExternalLink size={16} />
                                </Link>
                                <button
                                  onClick={() => handleOpenEditProjectModal(proj)}
                                  className="action-btn edit"
                                  title="Edit Project"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(proj.id, proj.title)}
                                  className="action-btn delete"
                                  title="Delete Project"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* TAB 3: CONTACT INQUIRIES */}
            {activeTab === 'contacts' && (
              <section className="admin-tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Customer Contact Inquiries</h2>
                    <p>All inquiries submitted through your website contact form backend.</p>
                  </div>
                  <div className="pane-search-bar">
                    <Search size={18} />
                    <input
                      type="text"
                      placeholder="Search inquiries by name, email, or subject..."
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                    />
                  </div>
                </div>

                {filteredContacts.length === 0 ? (
                  <div className="admin-empty-state">
                    <Mail size={48} color="#8a99ad" />
                    <h3>No inquiries found</h3>
                    <p>When customers submit the contact form on your website, inquiries will appear here.</p>
                  </div>
                ) : (
                  <div className="inquiries-layout">
                    <div className="inquiries-list">
                      {filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className={`inquiry-card ${
                            !contact.read ? 'unread' : ''
                          } ${selectedContact?.id === contact.id ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedContact(contact);
                            if (!contact.read) handleToggleContactRead(contact.id, false);
                          }}
                        >
                          <div className="inquiry-card-head">
                            <div className="inquiry-avatar">
                              {contact.name?.charAt(0).toUpperCase() || 'C'}
                            </div>
                            <div className="inquiry-meta">
                              <h4>{contact.name}</h4>
                              <span>{contact.email}</span>
                            </div>
                            <span className="inquiry-date">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="inquiry-subject-tag">{contact.subject}</div>

                          <p className="inquiry-snippet">{contact.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Inquiry Details Viewer */}
                    <div className="inquiry-detail-viewer">
                      {selectedContact ? (
                        <div className="inquiry-detail-card">
                          <div className="detail-header">
                            <div>
                              <h3>{selectedContact.subject}</h3>
                              <span className="detail-date">
                                Received:{' '}
                                {new Date(selectedContact.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <div className="detail-actions">
                              <button
                                onClick={() =>
                                  handleToggleContactRead(
                                    selectedContact.id,
                                    selectedContact.read
                                  )
                                }
                                className="admin-btn-action"
                                title="Toggle Read Status"
                              >
                                {selectedContact.read ? (
                                  <>
                                    <XCircle size={16} /> Mark Unread
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 size={16} /> Mark Read
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleDeleteContact(selectedContact.id)}
                                className="admin-btn-action danger"
                                title="Delete Inquiry"
                              >
                                <Trash2 size={16} /> Delete
                              </button>
                            </div>
                          </div>

                          <div className="detail-sender-box">
                            <div className="sender-row">
                              <User size={18} />
                              <strong>{selectedContact.name}</strong>
                            </div>
                            <div className="sender-row">
                              <Mail size={18} />
                              <a href={`mailto:${selectedContact.email}`}>
                                {selectedContact.email}
                              </a>
                            </div>
                            {selectedContact.phone && (
                              <div className="sender-row">
                                <Phone size={18} />
                                <a href={`tel:${selectedContact.phone}`}>
                                  {selectedContact.phone}
                                </a>
                              </div>
                            )}
                          </div>

                          <div className="detail-message-body">
                            <h4>Project Specifications &amp; Message:</h4>
                            <p>{selectedContact.message}</p>
                          </div>

                          <div className="detail-reply-bar">
                            <a
                              href={`mailto:${selectedContact.email}?subject=Re: Inquiry on ${encodeURIComponent(
                                selectedContact.subject
                              )}&body=Dear ${encodeURIComponent(selectedContact.name)},%0D%0A%0D%0AThank you for contacting Venus Hospital Door Solutions regarding ${encodeURIComponent(
                                selectedContact.subject
                              )}...`}
                              className="admin-btn admin-btn-primary"
                            >
                              <Mail size={18} />
                              <span>Reply to {selectedContact.name}</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="inquiry-detail-placeholder">
                          <Mail size={40} color="#8a99ad" />
                          <p>Select an inquiry from the list on the left to read full details.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* TAB 3: CHANGE PASSWORD & SECURITY */}
            {activeTab === 'security' && (
              <section className="admin-tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Admin Account &amp; Password Settings</h2>
                    <p>Update your admin login password and manage account credentials.</p>
                  </div>
                </div>

                <div className="security-cards-grid">
                  <div className="security-card">
                    <div className="security-card-header">
                      <KeyRound size={24} color="#c98b2c" />
                      <h3>Change Admin Password</h3>
                    </div>

                    <form onSubmit={handleChangePassword} className="admin-form">
                      <div className="admin-input-group">
                        <label>Current Password</label>
                        <div className="admin-input-wrapper">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="admin-input-group">
                        <label>New Password (min 6 characters)</label>
                        <div className="admin-input-wrapper">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter new strong password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="admin-input-group">
                        <label>Confirm New Password</label>
                        <div className="admin-input-wrapper">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Re-enter new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="admin-btn admin-btn-primary"
                        disabled={securityLoading}
                      >
                        {securityLoading ? (
                          <span>Updating...</span>
                        ) : (
                          <>
                            <Check size={18} />
                            <span>Update Password</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  <div className="security-card info-card">
                    <div className="security-card-header">
                      <User size={24} color="#0d2c54" />
                      <h3>Current Admin Profile</h3>
                    </div>

                    <div className="admin-profile-details">
                      <div className="profile-row">
                        <span className="profile-label">Full Name:</span>
                        <span className="profile-val">{user.name || 'Venus Administrator'}</span>
                      </div>
                      <div className="profile-row">
                        <span className="profile-label">Username:</span>
                        <span className="profile-val">{user.username || 'admin'}</span>
                      </div>
                      <div className="profile-row">
                        <span className="profile-label">Email:</span>
                        <span className="profile-val">
                          {user.email || 'admin@venushospitaldoors.com'}
                        </span>
                      </div>
                      <div className="profile-row">
                        <span className="profile-label">Last Login:</span>
                        <span className="profile-val">
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleString()
                            : 'Active Session'}
                        </span>
                      </div>
                      <div className="profile-row">
                        <span className="profile-label">Password Reset Link:</span>
                        <span className="profile-val">
                          <Link to="/admin/forgot-password" style={{ color: '#c98b2c' }}>
                            /admin/forgot-password
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Modal for Add / Edit Service */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingService ? 'Edit Service' : 'Add New Dynamic Service'}</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="modal-close-btn"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveService} className="modal-form">
              <div className="modal-form-grid">
                <div className="admin-input-group">
                  <label>Service Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Cleanroom Hermetic Doors"
                    value={serviceFormData.title}
                    onChange={(e) =>
                      setServiceFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                        slug:
                          !editingService && !prev.slug
                            ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                            : prev.slug,
                      }))
                    }
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label>URL Slug / Route Key</label>
                  <input
                    type="text"
                    placeholder="e.g. cleanroom-hermetic-doors"
                    value={serviceFormData.slug}
                    onChange={(e) =>
                      setServiceFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                  />
                </div>

                <div className="admin-input-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={serviceFormData.order}
                    onChange={(e) =>
                      setServiceFormData((prev) => ({ ...prev, order: e.target.value }))
                    }
                  />
                </div>

                <div className="admin-input-group">
                  <label>Page Link (href)</label>
                  <input
                    type="text"
                    placeholder="e.g. /hospital-doors or /services/cleanroom"
                    value={serviceFormData.href}
                    onChange={(e) =>
                      setServiceFormData((prev) => ({ ...prev, href: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="admin-input-group">
                <label>Description *</label>
                <textarea
                  rows="3"
                  placeholder="Detailed description of the service and capabilities..."
                  value={serviceFormData.description}
                  onChange={(e) =>
                    setServiceFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Image Selection / Upload */}
              <div className="admin-input-group">
                <label>Service Image</label>
                <div className="image-field-wrap">
                  <div className="image-preview-box">
                    <img
                      src={serviceFormData.image}
                      alt="Preview"
                      onError={(e) => {
                        e.target.src = '/assets/images/services/OT.png';
                      }}
                    />
                  </div>
                  <div className="image-inputs">
                    <input
                      type="text"
                      placeholder="Image URL (e.g. /assets/images/services/OT.png)"
                      value={serviceFormData.image}
                      onChange={(e) =>
                        setServiceFormData((prev) => ({ ...prev, image: e.target.value }))
                      }
                    />
                    <div className="upload-btn-wrap">
                      <label className="upload-file-label">
                        <Upload size={16} />
                        <span>{uploadingImage ? 'Uploading...' : 'Upload Image from PC'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <small>Supports PNG, JPG, WebP</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features / Bullet Points */}
              <div className="admin-input-group">
                <label>Key Specifications &amp; Features (one item per line)</label>
                <textarea
                  rows="4"
                  placeholder="SS304 Heavy Duty Construction&#10;Acoustic &amp; Dust Proofing&#10;Microprocessor Automation&#10;Antimicrobial Finish"
                  value={serviceFormData.features}
                  onChange={(e) =>
                    setServiceFormData((prev) => ({ ...prev, features: e.target.value }))
                  }
                />
              </div>

              {/* Projects Slider */}
              <div className="admin-input-group">
                <div className="projects-editor-head">
                  <label>Projects Slider ({serviceFormData.projects.length})</label>
                  <button
                    type="button"
                    onClick={addProject}
                    className="admin-btn admin-btn-outline admin-btn-sm"
                  >
                    <Plus size={14} /> Add Project
                  </button>
                </div>
                <small className="projects-editor-hint">
                  Shown in the projects slider on this service's page. Items without a name
                  or image are skipped.
                </small>

                <div className="projects-editor-list">
                  {serviceFormData.projects.map((project, index) => (
                    <div className="project-row" key={project.id || index}>
                      <div className="project-row-thumb">
                        {project.image ? (
                          <img src={project.image} alt={project.name || 'Project'} />
                        ) : (
                          <span>No image</span>
                        )}
                      </div>
                      <div className="project-row-fields">
                        <input
                          type="text"
                          placeholder="Project / product name"
                          value={project.name}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Price (e.g. ₹ 65,000/Piece or Get Latest Price)"
                          value={project.price}
                          onChange={(e) => updateProject(index, 'price', e.target.value)}
                        />
                        <div className="project-row-image">
                          <input
                            type="text"
                            placeholder="Image URL"
                            value={project.image}
                            onChange={(e) => updateProject(index, 'image', e.target.value)}
                          />
                          <label className="upload-file-label">
                            <Upload size={14} />
                            <span>
                              {uploadingProjectIndex === index ? 'Uploading...' : 'Upload'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProjectImageUpload(index, e)}
                              disabled={uploadingProjectIndex !== null}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="project-row-actions">
                        <button
                          type="button"
                          className="action-btn"
                          onClick={() => moveProject(index, -1)}
                          disabled={index === 0}
                          title="Move up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          className="action-btn"
                          onClick={() => moveProject(index, 1)}
                          disabled={index === serviceFormData.projects.length - 1}
                          title="Move down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="action-btn delete"
                          onClick={() => removeProject(index)}
                          title="Remove project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-checkbox-row">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={serviceFormData.active}
                    onChange={(e) =>
                      setServiceFormData((prev) => ({ ...prev, active: e.target.checked }))
                    }
                  />
                  <span>Active (Visible on public website)</span>
                </label>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="admin-btn admin-btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Add / Edit Project */}
      {isProjectModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProject ? 'Edit Project' : 'Add New Hospital Project'}</h3>
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="modal-close-btn"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="modal-form">
              <div className="modal-form-grid">
                <div className="admin-input-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. AIIMS Modular OT Hermetic Doors"
                    value={projectFormData.title}
                    onChange={(e) =>
                      setProjectFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                        slug:
                          !editingProject && !prev.slug
                            ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                            : prev.slug,
                      }))
                    }
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label>URL Slug</label>
                  <input
                    type="text"
                    placeholder="e.g. aiims-modular-ot-hermetic-doors"
                    value={projectFormData.slug}
                    onChange={(e) =>
                      setProjectFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="admin-input-group">
                  <label>Category</label>
                  <select
                    value={projectFormData.category}
                    onChange={(e) =>
                      setProjectFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="Hospital & OT Doors">Hospital &amp; OT Doors</option>
                    <option value="Hermetic Sliding Doors">Hermetic Sliding Doors</option>
                    <option value="Radiation Shielding">Radiation Shielding</option>
                    <option value="Surgical Pendants & Scrub Sinks">Surgical Pendants &amp; Scrub Sinks</option>
                    <option value="Motor Automation">Motor Automation</option>
                    <option value="Cleanroom Airlocks">Cleanroom Airlocks</option>
                  </select>
                </div>

                <div className="admin-input-group">
                  <label>Client / Healthcare Facility</label>
                  <input
                    type="text"
                    placeholder="e.g. AIIMS New Delhi"
                    value={projectFormData.client}
                    onChange={(e) =>
                      setProjectFormData((prev) => ({ ...prev, client: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="admin-input-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi, India"
                    value={projectFormData.location}
                    onChange={(e) =>
                      setProjectFormData((prev) => ({ ...prev, location: e.target.value }))
                    }
                  />
                </div>

                <div className="admin-input-group">
                  <label>Completion Year</label>
                  <input
                    type="text"
                    placeholder="e.g. 2025"
                    value={projectFormData.year}
                    onChange={(e) =>
                      setProjectFormData((prev) => ({ ...prev, year: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Main Image */}
              <div className="admin-input-group">
                <label>Main Project Image *</label>
                <div className="image-field-wrap">
                  <div className="preview-box">
                    <img
                      src={projectFormData.image}
                      alt="Project Preview"
                      onError={(e) => {
                        e.target.src = '/assets/images/project/OT.png';
                      }}
                    />
                  </div>
                  <div className="image-inputs">
                    <input
                      type="text"
                      placeholder="Image URL (e.g. /assets/images/project/OT.png)"
                      value={projectFormData.image}
                      onChange={(e) =>
                        setProjectFormData((prev) => ({ ...prev, image: e.target.value }))
                      }
                      required
                    />
                    <div className="upload-btn-wrap">
                      <label className="upload-file-label">
                        <Upload size={16} />
                        <span>{uploadingProjectMainImage ? 'Uploading...' : 'Upload Image from PC'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProjectMainUpload}
                          disabled={uploadingProjectMainImage}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <small>Supports PNG, JPG, WebP</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scope of Work */}
              <div className="admin-input-group">
                <label>Scope of Work / Summary</label>
                <input
                  type="text"
                  placeholder="e.g. Supply and turnkey installation of 24 Hermetic Sliding Doors..."
                  value={projectFormData.scope}
                  onChange={(e) =>
                    setProjectFormData((prev) => ({ ...prev, scope: e.target.value }))
                  }
                />
              </div>

              {/* Detailed Description */}
              <div className="admin-input-group">
                <label>Detailed Project Overview *</label>
                <textarea
                  rows="4"
                  placeholder="Comprehensive clinical engineering details, certifications, and compliance..."
                  value={projectFormData.description}
                  onChange={(e) =>
                    setProjectFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Specifications / Features */}
              <div className="admin-input-group">
                <label>Technical Specifications &amp; Features (one item per line)</label>
                <textarea
                  rows="4"
                  placeholder="Hermetic sealing with 4-sided silicone gasket&#10;Microprocessor brushless motor automation&#10;Touchless infrared &amp; foot sensor switches&#10;NABH &amp; Class 100 cleanroom compliance"
                  value={projectFormData.specifications}
                  onChange={(e) =>
                    setProjectFormData((prev) => ({ ...prev, specifications: e.target.value }))
                  }
                />
              </div>

              {/* Gallery Photos */}
              <div className="admin-input-group">
                <div className="projects-editor-head">
                  <label>Project Gallery Photos ({projectFormData.gallery.length})</label>
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="admin-btn admin-btn-outline admin-btn-sm"
                  >
                    <Plus size={14} /> Add Photo
                  </button>
                </div>
                <small className="projects-editor-hint">
                  Showcase multiple angles and OT door installation shots for this project.
                </small>

                <div className="projects-editor-list">
                  {projectFormData.gallery.map((imgUrl, index) => (
                    <div className="project-row" key={index}>
                      <div className="project-row-thumb">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={`Gallery ${index + 1}`}
                            onError={(e) => {
                              e.target.src = '/assets/images/project/OT.png';
                            }}
                          />
                        ) : (
                          <span>No image</span>
                        )}
                      </div>
                      <div className="project-row-fields">
                        <div className="project-row-image">
                          <input
                            type="text"
                            placeholder="Image URL or upload"
                            value={imgUrl}
                            onChange={(e) => updateGalleryItem(index, e.target.value)}
                          />
                          <label className="upload-file-label">
                            <Upload size={14} />
                            <span>
                              {uploadingGalleryIdx === index ? 'Uploading...' : 'Upload'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProjectGalleryUpload(index, e)}
                              disabled={uploadingGalleryIdx !== null}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="project-row-actions">
                        <button
                          type="button"
                          className="action-btn delete"
                          onClick={() => removeGalleryItem(index)}
                          title="Remove photo"
                          disabled={projectFormData.gallery.length <= 1}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="admin-input-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={projectFormData.order}
                    onChange={(e) =>
                      setProjectFormData((prev) => ({
                        ...prev,
                        order: parseInt(e.target.value, 10) || 1,
                      }))
                    }
                  />
                </div>
                <div className="admin-input-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={projectFormData.active}
                      onChange={(e) =>
                        setProjectFormData((prev) => ({ ...prev, active: e.target.checked }))
                      }
                    />
                    <span>Active (Visible on public website)</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="admin-btn admin-btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
