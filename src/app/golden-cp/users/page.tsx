// src/app/golden-cp/users/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import AdminBreadcrumb from '../../../components/admin/layout/AdminBreadcrumb';
import {
  Users,
  UserPlus,
  Key,
  Shield,
  Trash2,
  Edit2,
  Lock,
  Mail,
  User,
  CheckCircle,
  XCircle,
  X,
  Eye,
  EyeOff,
  AlertTriangle,
} from 'lucide-react';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended';
  createdDate: string;
  permissions: {
    properties: boolean;
    projects: boolean;
    media: boolean;
    submissions: boolean;
    settings: boolean;
  };
}

// Initial mock accounts
const INITIAL_ACCOUNTS: UserAccount[] = [
  {
    id: 'user-1',
    name: 'عبدالرحمن الغامدي',
    email: 'admin@alghrbiagolden.com',
    status: 'active',
    createdDate: '2026-01-10',
    permissions: {
      properties: true,
      projects: true,
      media: true,
      submissions: true,
      settings: true,
    },
  },
  {
    id: 'user-2',
    name: 'سارة خالد',
    email: 'sara.k@alghrbiagolden.com',
    status: 'active',
    createdDate: '2026-03-15',
    permissions: {
      properties: true,
      projects: true,
      media: true,
      submissions: false,
      settings: false,
    },
  },
  {
    id: 'user-3',
    name: 'خالد العنزي',
    email: 'khaled.a@alghrbiagolden.com',
    status: 'suspended',
    createdDate: '2026-05-02',
    permissions: {
      properties: false,
      projects: false,
      media: true,
      submissions: true,
      settings: false,
    },
  },
];

const PERMISSION_LABELS = {
  properties: 'إدارة العقارات',
  projects: 'إدارة المشاريع',
  media: 'إدارة الوسائط',
  submissions: 'الاستفسارات والرسائل',
  settings: 'التحليلات والإعدادات',
};

export default function UsersManagementPage() {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [activeTab, setActiveTab] = useState<'list' | 'change-password'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Account Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPermissions, setNewPermissions] = useState({
    properties: true,
    projects: true,
    media: true,
    submissions: false,
    settings: false,
  });
  const [newStatus, setNewStatus] = useState<'active' | 'suspended'>('active');

  // Change Password Modal (For specific sub-accounts)
  const [changePasswordAccount, setChangePasswordAccount] = useState<UserAccount | null>(null);
  const [subNewPassword, setSubNewPassword] = useState('');
  const [subConfirmPassword, setSubConfirmPassword] = useState('');
  const [showSubPass, setShowSubPass] = useState(false);

  // Edit Permissions Modal
  const [editPermissionsAccount, setEditPermissionsAccount] = useState<UserAccount | null>(null);

  // Delete Confirmation Modal
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState<UserAccount | null>(null);

  // Password visibility
  const [showNewPass, setShowNewPass] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Change Password Form State (For currently logged in user)
  const [currentPassword, setCurrentPassword] = useState('');
  const [mainNewPassword, setMainNewPassword] = useState('');
  const [mainConfirmPassword, setMainConfirmPassword] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    // Load accounts from localStorage if exists, or use initial mock data
    const local = localStorage.getItem('golden-cp-accounts');
    if (local) {
      try {
        setAccounts(JSON.parse(local));
      } catch {
        setAccounts(INITIAL_ACCOUNTS);
      }
    } else {
      setAccounts(INITIAL_ACCOUNTS);
      localStorage.setItem('golden-cp-accounts', JSON.stringify(INITIAL_ACCOUNTS));
    }
  }, []);

  const saveAccounts = (newAccounts: UserAccount[]) => {
    setAccounts(newAccounts);
    localStorage.setItem('golden-cp-accounts', JSON.stringify(newAccounts));
  };

  // Add Account Action
  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword) {
      alert('الرجاء إدخال كافة الحقول المطلوبة');
      return;
    }

    // Check if email already exists
    if (accounts.some((acc) => acc.email.toLowerCase() === newEmail.toLowerCase())) {
      alert('هذا البريد الإلكتروني مسجل بالفعل لمستخدم آخر');
      return;
    }

    const newAcc: UserAccount = {
      id: `user-${Date.now()}`,
      name: newName,
      email: newEmail,
      status: newStatus,
      createdDate: new Date().toISOString().split('T')[0],
      permissions: { ...newPermissions },
    };

    const updated = [newAcc, ...accounts];
    saveAccounts(updated);
    
    // Reset Form & Close Modal
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewPermissions({
      properties: true,
      projects: true,
      media: true,
      submissions: false,
      settings: false,
    });
    setNewStatus('active');
    setShowAddModal(false);
    
    showToast('تمت إضافة الحساب الجديد بنجاح');
  };

  // Toggle Account Status (Active / Suspended)
  const handleToggleStatus = (id: string) => {
    const updated = accounts.map((acc) => {
      if (acc.id === id) {
        const nextStatus = acc.status === 'active' ? ('suspended' as const) : ('active' as const);
        return { ...acc, status: nextStatus };
      }
      return acc;
    });
    saveAccounts(updated);
    showToast('تم تحديث حالة الحساب بنجاح');
  };

  // Update Permissions
  const handleUpdatePermissions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPermissionsAccount) return;

    const updated = accounts.map((acc) => {
      if (acc.id === editPermissionsAccount.id) {
        return { ...acc, permissions: { ...editPermissionsAccount.permissions } };
      }
      return acc;
    });
    saveAccounts(updated);
    setEditPermissionsAccount(null);
    showToast('تم تحديث الصلاحيات بنجاح');
  };

  // Delete User
  const handleDeleteUser = () => {
    if (!confirmDeleteAccount) return;
    const updated = accounts.filter((acc) => acc.id !== confirmDeleteAccount.id);
    saveAccounts(updated);
    setConfirmDeleteAccount(null);
    showToast('تم حذف الحساب بنجاح');
  };

  // Change Sub-User Password
  const handleSubChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changePasswordAccount) return;
    if (!subNewPassword || !subConfirmPassword) {
      alert('الرجاء تعبئة كافة حقول كلمة المرور');
      return;
    }
    if (subNewPassword !== subConfirmPassword) {
      alert('كلمتا المرور غير متطابقتين');
      return;
    }

    // Since this is mock state, we just reset it and show success
    setSubNewPassword('');
    setSubConfirmPassword('');
    setChangePasswordAccount(null);
    showToast(`تم تغيير كلمة المرور للمستخدم "${changePasswordAccount.name}" بنجاح`);
  };

  // Change Logged In User Password (Main form)
  const handleMainChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !mainNewPassword || !mainConfirmPassword) {
      setFeedbackMsg({ text: 'الرجاء تعبئة كافة الحقول المطلوبة', type: 'error' });
      return;
    }
    if (mainNewPassword !== mainConfirmPassword) {
      setFeedbackMsg({ text: 'كلمة المرور الجديدة وتأكيدها غير متطابقين', type: 'error' });
      return;
    }

    // Mock verification
    if (currentPassword !== 'admin123' && currentPassword.length < 5) {
      setFeedbackMsg({ text: 'كلمة المرور الحالية غير صحيحة', type: 'error' });
      return;
    }

    setFeedbackMsg({ text: 'تم تغيير كلمة مرور مدير النظام بنجاح', type: 'success' });
    setCurrentPassword('');
    setMainNewPassword('');
    setMainConfirmPassword('');
    
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 4000);
  };

  const showToast = (msg: string) => {
    alert(msg); // Simplified for admin CP; can be replaced by toast state if desired.
  };

  const filtered = accounts.filter(
    (acc) =>
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <AdminBreadcrumb items={[{ label: 'إدارة الحسابات' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--neu-text-heading)]">الحسابات والصلاحيات</h2>
          <p className="text-sm text-[var(--neu-text-muted)] mt-1">
            إدارة حسابات موظفي لوحة التحكم وتوزيع صلاحيات الاستخدام وتحديث كلمات المرور.
          </p>
        </div>
        
        {activeTab === 'list' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="neu-btn neu-btn-primary"
            title="إضافة حساب جديد"
          >
            <UserPlus className="w-4 h-4" />
            إضافة حساب
          </button>
        )}
      </div>

      {/* Tabs Selector */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('list')}
          className={`neu-btn flex items-center gap-2 ${
            activeTab === 'list' ? 'neu-btn-primary' : 'neu-btn-secondary'
          }`}
        >
          <Users className="w-4 h-4" />
          قائمة الحسابات
        </button>
        <button
          onClick={() => setActiveTab('change-password')}
          className={`neu-btn flex items-center gap-2 ${
            activeTab === 'change-password' ? 'neu-btn-primary' : 'neu-btn-secondary'
          }`}
        >
          <Lock className="w-4 h-4" />
          تغيير كلمة المرور الخاصة بك
        </button>
      </div>

      {/* TAB 1: Account List */}
      {activeTab === 'list' && (
        <>
          {/* Search bar */}
          <div className="neu-card mb-6">
            <div className="relative">
              <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neu-text-muted)]" />
              <input
                type="text"
                placeholder="ابحث باسم الموظف أو البريد الإلكتروني..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="neu-input pe-10"
              />
            </div>
          </div>

          {/* Accounts list */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((acc) => (
              <div key={acc.id} className="neu-card relative overflow-hidden flex flex-col justify-between">
                {/* Status Indicator */}
                <div className="absolute top-4 left-4">
                  <button
                    onClick={() => handleToggleStatus(acc.id)}
                    className="flex items-center gap-1 focus:outline-none"
                    title={acc.status === 'active' ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                  >
                    {acc.status === 'active' ? (
                      <span className="neu-badge neu-badge-success flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        نشط
                      </span>
                    ) : (
                      <span className="neu-badge neu-badge-danger flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        معطل
                      </span>
                    )}
                  </button>
                </div>

                <div>
                  {/* Account Identity */}
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--neu-gold)]/10 flex items-center justify-center text-[var(--neu-gold)] font-bold text-lg">
                      {acc.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--neu-text-heading)]">{acc.name}</h3>
                      <p className="text-xs text-[var(--neu-text-muted)]" dir="ltr">
                        {acc.email}
                      </p>
                    </div>
                  </div>

                  <hr className="border-white/5 my-4" />

                  {/* Permissions section */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-[var(--neu-text-secondary)] flex items-center gap-1.5 mb-2">
                      <Shield className="w-3.5 h-3.5 text-[var(--neu-gold)]" />
                      صلاحيات الوصول:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(acc.permissions).map(([key, value]) => (
                        <span
                          key={key}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${
                            value
                              ? 'bg-[var(--neu-gold-glow)] border-[var(--neu-gold)]/30 text-[var(--neu-gold)]'
                              : 'bg-white/5 border-white/5 text-[var(--neu-text-muted)] line-through opacity-50'
                          }`}
                        >
                          {PERMISSION_LABELS[key as keyof typeof PERMISSION_LABELS]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/5 mt-auto">
                  <button
                    onClick={() => setEditPermissionsAccount(acc)}
                    className="neu-btn neu-btn-secondary flex-1 py-1.5 text-xs gap-1.5"
                    title="تعديل الصلاحيات"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    تعديل الصلاحيات
                  </button>
                  <button
                    onClick={() => setChangePasswordAccount(acc)}
                    className="neu-btn neu-btn-secondary p-2"
                    title="تغيير كلمة المرور"
                  >
                    <Key className="w-4 h-4 text-[var(--neu-gold)]" />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteAccount(acc)}
                    disabled={acc.email === 'admin@alghrbiagolden.com'} // Protect master admin
                    className="neu-btn neu-btn-secondary p-2 text-red-400 hover:text-red-500 disabled:opacity-30"
                    title="حذف الحساب"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="neu-card text-center py-16">
              <Users className="w-12 h-12 text-[var(--neu-text-muted)] mx-auto mb-3 opacity-30" />
              <p className="text-[var(--neu-text-secondary)] font-medium">لا توجد حسابات مطابقة</p>
              <p className="text-xs text-[var(--neu-text-muted)] mt-1">جرّب كتابة بريد إلكتروني أو اسم آخر</p>
            </div>
          )}
        </>
      )}

      {/* TAB 2: Change Main Admin Password */}
      {activeTab === 'change-password' && (
        <div className="max-w-md mx-auto">
          <div className="neu-card p-6">
            <h3 className="text-lg font-bold text-[var(--neu-text-heading)] mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[var(--neu-gold)]" />
              تحديث كلمة مرور المشرف
            </h3>

            {feedbackMsg && (
              <div
                className={`p-3 rounded-xl mb-4 text-xs font-medium ${
                  feedbackMsg.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}
              >
                {feedbackMsg.text}
              </div>
            )}

            <form onSubmit={handleMainChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--neu-text-secondary)] mb-1">
                  كلمة المرور الحالية *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="neu-input pe-10"
                    placeholder="ادخل كلمة المرور الحالية"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neu-text-muted)] hover:text-white"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--neu-text-secondary)] mb-1">
                  كلمة المرور الجديدة *
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={mainNewPassword}
                    onChange={(e) => setMainNewPassword(e.target.value)}
                    className="neu-input pe-10"
                    placeholder="ادخل كلمة المرور الجديدة"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neu-text-muted)] hover:text-white"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--neu-text-secondary)] mb-1">
                  تأكيد كلمة المرور الجديدة *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={mainConfirmPassword}
                    onChange={(e) => setMainConfirmPassword(e.target.value)}
                    className="neu-input pe-10"
                    placeholder="اعد كتابة كلمة المرور الجديدة"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neu-text-muted)] hover:text-white"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="neu-btn neu-btn-primary w-full mt-2">
                حفظ كلمة المرور الجديدة
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Account */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
          role="dialog"
          aria-label="إضافة حساب جديد"
        >
          <div
            className="neu-card w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)]">إضافة حساب موظف جديد</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="neu-btn neu-btn-ghost neu-btn-sm p-1.5"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--neu-text-secondary)] mb-1">
                  الاسم الكامل *
                </label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neu-text-muted)]" />
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="neu-input pe-10"
                    placeholder="ادخل اسم الموظف"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--neu-text-secondary)] mb-1">
                  البريد الإلكتروني *
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neu-text-muted)]" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="neu-input pe-10"
                    placeholder="example@alghrbiagolden.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--neu-text-secondary)] mb-1">
                  كلمة المرور الافتراضية *
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neu-text-muted)]" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="neu-input pe-10"
                    placeholder="ادخل كلمة مرور الحساب"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--neu-text-secondary)] mb-1">
                  حالة الحساب
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as 'active' | 'suspended')}
                  className="neu-input neu-select"
                  title="تحديد حالة الحساب"
                >
                  <option value="active">نشط (يستطيع الدخول لوحة التحكم)</option>
                  <option value="suspended">معطل (موقوف مؤقتاً)</option>
                </select>
              </div>

              {/* Permissions list */}
              <div>
                <label className="block text-xs font-bold text-[var(--neu-text-secondary)] mb-2">
                  صلاحيات لوحة التحكم الممنوحة:
                </label>
                <div className="space-y-2 rounded-xl p-3.5 neu-inset-sm">
                  {Object.entries(PERMISSION_LABELS).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-3 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={newPermissions[key as keyof typeof newPermissions]}
                        onChange={(e) =>
                          setNewPermissions((prev) => ({
                            ...prev,
                            [key]: e.target.checked,
                          }))
                        }
                        className="rounded border-white/10 bg-white/5 text-[var(--neu-gold)] focus:ring-[var(--neu-gold)]"
                      />
                      <span className="text-[var(--neu-text-secondary)]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="neu-btn neu-btn-primary flex-1">
                  إنشاء الحساب
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="neu-btn neu-btn-secondary"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Permissions */}
      {editPermissionsAccount && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={() => setEditPermissionsAccount(null)}
          role="dialog"
          aria-label="تعديل صلاحيات الحساب"
        >
          <div
            className="neu-card w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)]">تعديل صلاحيات الوصول</h3>
              <button
                onClick={() => setEditPermissionsAccount(null)}
                className="neu-btn neu-btn-ghost neu-btn-sm p-1.5"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePermissions} className="space-y-4">
              <div className="mb-2">
                <p className="text-xs text-[var(--neu-text-muted)]">الحساب المختار:</p>
                <p className="text-sm font-semibold text-[var(--neu-text-heading)] mt-0.5">
                  {editPermissionsAccount.name} ({editPermissionsAccount.email})
                </p>
              </div>

              <div className="space-y-2 rounded-xl p-3.5 neu-inset-sm">
                {Object.entries(PERMISSION_LABELS).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editPermissionsAccount.permissions[key as keyof typeof editPermissionsAccount.permissions]}
                      onChange={(e) =>
                        setEditPermissionsAccount((prev) => {
                          if (!prev) return null;
                          return {
                            ...prev,
                            permissions: {
                              ...prev.permissions,
                              [key]: e.target.checked,
                            },
                          };
                        })
                      }
                      className="rounded border-white/10 bg-white/5 text-[var(--neu-gold)] focus:ring-[var(--neu-gold)]"
                    />
                    <span className="text-[var(--neu-text-secondary)]">{label}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="neu-btn neu-btn-primary flex-1">
                  حفظ الصلاحيات الجديدة
                </button>
                <button
                  type="button"
                  onClick={() => setEditPermissionsAccount(null)}
                  className="neu-btn neu-btn-secondary"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Change Sub-Account Password */}
      {changePasswordAccount && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={() => setChangePasswordAccount(null)}
          role="dialog"
          aria-label="تغيير كلمة المرور"
        >
          <div
            className="neu-card w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)]">تغيير كلمة المرور</h3>
              <button
                onClick={() => setChangePasswordAccount(null)}
                className="neu-btn neu-btn-ghost neu-btn-sm p-1.5"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubChangePassword} className="space-y-4">
              <div className="mb-2">
                <p className="text-xs text-[var(--neu-text-muted)]">إعادة تعيين كلمة المرور لحساب:</p>
                <p className="text-sm font-semibold text-[var(--neu-text-heading)] mt-0.5">
                  {changePasswordAccount.name} ({changePasswordAccount.email})
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--neu-text-secondary)] mb-1">
                  كلمة المرور الجديدة *
                </label>
                <div className="relative">
                  <input
                    type={showSubPass ? 'text' : 'password'}
                    value={subNewPassword}
                    onChange={(e) => setSubNewPassword(e.target.value)}
                    className="neu-input pe-10"
                    placeholder="ادخل كلمة المرور الجديدة"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSubPass(!showSubPass)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neu-text-muted)] hover:text-white"
                  >
                    {showSubPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--neu-text-secondary)] mb-1">
                  تأكيد كلمة المرور الجديدة *
                </label>
                <input
                  type="password"
                  value={subConfirmPassword}
                  onChange={(e) => setSubConfirmPassword(e.target.value)}
                  className="neu-input"
                  placeholder="اعد كتابة كلمة المرور الجديدة"
                  required
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="neu-btn neu-btn-primary flex-1">
                  تغيير كلمة المرور
                </button>
                <button
                  type="button"
                  onClick={() => setChangePasswordAccount(null)}
                  className="neu-btn neu-btn-secondary"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete User Confirmation */}
      {confirmDeleteAccount && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[210] flex items-center justify-center p-4"
          onClick={() => setConfirmDeleteAccount(null)}
          role="dialog"
          aria-label="تأكيد حذف الحساب"
        >
          <div
            className="neu-card w-full max-w-md p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-[var(--neu-danger)]/10 border-2 border-[var(--neu-danger)]/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-[var(--neu-danger)]" />
            </div>

            <h3 className="text-lg font-bold text-[var(--neu-text-heading)] mb-2">تأكيد حذف الحساب</h3>
            <p className="text-sm text-[var(--neu-text-secondary)] mb-6">
              هل أنت متأكد من حذف حساب الموظف <strong className="text-[var(--neu-text-heading)]">"{confirmDeleteAccount.name}"</strong>؟
              <br />
              لن يتمكن هذا المستخدم من الدخول للوحة التحكم مجدداً، ولا يمكن التراجع عن هذا الإجراء.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteUser}
                className="neu-btn neu-btn-primary bg-[var(--neu-danger)] hover:bg-[var(--neu-danger)]/90 border-0 flex-1"
              >
                نعم، احذف الحساب
              </button>
              <button
                onClick={() => setConfirmDeleteAccount(null)}
                className="neu-btn neu-btn-secondary flex-1"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
