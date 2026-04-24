'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const tabs = [
  { id: 'account', name: 'Account' },
  { id: 'privacy', name: 'Privacy' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'security', name: 'Security' }
];

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('account');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [accountSettings, setAccountSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    allowMessages: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    jobAlerts: true,
    applicationUpdates: true
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userStr = localStorage.getItem('user');

    if (authStatus !== 'true' || !userStr) {
      router.push('/Login');
      return;
    }

    setUserProfile(JSON.parse(userStr));
    setIsLoading(false);
  }, [router]);

  const onAccountChange = (e) => setAccountSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onPrivacyChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPrivacySettings((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const onNotificationChange = (e) => setNotificationSettings((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (accountSettings.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    alert('Password changed successfully');
    setAccountSettings({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const savePrivacy = () => {
    localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
    alert('Privacy settings saved');
  };

  const saveNotifications = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    alert('Notification settings saved');
  };

  const logoutAll = () => {
    localStorage.clear();
    alert('Logged out from all devices');
    router.push('/Login');
  };

  const confirmDeleteAccount = () => {
    localStorage.clear();
    alert('Account deleted');
    router.push('/');
  };

  if (isLoading) {
    return <div className="px-6 py-10 text-[var(--brand-700)]">Loading settings...</div>;
  }

  if (!userProfile) {
    return (
      <div className="px-6 py-10">
        <div className="glass-card mx-auto max-w-xl p-8 text-center">
          <p className="text-[var(--brand-700)]">Please login to access settings.</p>
          <Link href="/Login" className="btn-primary mt-4">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <section className="glass-panel fade-rise rounded-[28px] px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-[var(--brand-700)]">Settings</h1>
              <p className="mt-1 text-sm text-[rgba(15,31,61,0.72)]">Manage account controls, privacy preferences, and security choices.</p>
            </div>
            <Link href="/Profile" className="btn-outline">View Profile</Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="glass-card p-3">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors ${activeTab === tab.id ? 'bg-[rgba(30,111,208,0.14)] text-[var(--brand-700)]' : 'text-[rgba(15,31,61,0.78)] hover:bg-[rgba(30,111,208,0.1)]'}`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </aside>

          <main className="glass-card p-6 sm:p-8">
            {activeTab === 'account' && (
              <div>
                <h2 className="text-2xl font-extrabold text-[var(--brand-700)]">Account</h2>
                <form onSubmit={handleChangePassword} className="mt-5 space-y-3">
                  <input type="password" name="currentPassword" value={accountSettings.currentPassword} onChange={onAccountChange} className="input-field" placeholder="Current password" required />
                  <input type="password" name="newPassword" value={accountSettings.newPassword} onChange={onAccountChange} className="input-field" placeholder="New password" required />
                  <input type="password" name="confirmPassword" value={accountSettings.confirmPassword} onChange={onAccountChange} className="input-field" placeholder="Confirm new password" required />
                  <button type="submit" className="btn-primary">Change Password</button>
                </form>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-2xl font-extrabold text-[var(--brand-700)]">Privacy</h2>
                <div className="mt-5 space-y-4">
                  <select name="profileVisibility" value={privacySettings.profileVisibility} onChange={onPrivacyChange} className="input-field">
                    <option value="public">Public - Anyone can view</option>
                    <option value="private">Private - Only me</option>
                    <option value="contacts">Contacts only</option>
                  </select>
                  <Toggle label="Show Email" name="showEmail" checked={privacySettings.showEmail} onChange={onPrivacyChange} />
                  <Toggle label="Show Phone" name="showPhone" checked={privacySettings.showPhone} onChange={onPrivacyChange} />
                  <Toggle label="Allow Messages" name="allowMessages" checked={privacySettings.allowMessages} onChange={onPrivacyChange} />
                  <button onClick={savePrivacy} className="btn-primary" type="button">Save Privacy Settings</button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-extrabold text-[var(--brand-700)]">Notifications</h2>
                <div className="mt-5 space-y-4">
                  <Toggle label="Email Notifications" name="emailNotifications" checked={notificationSettings.emailNotifications} onChange={onNotificationChange} />
                  <Toggle label="Push Notifications" name="pushNotifications" checked={notificationSettings.pushNotifications} onChange={onNotificationChange} />
                  <Toggle label="Marketing Emails" name="marketingEmails" checked={notificationSettings.marketingEmails} onChange={onNotificationChange} />
                  <Toggle label="Job Alerts" name="jobAlerts" checked={notificationSettings.jobAlerts} onChange={onNotificationChange} />
                  <Toggle label="Application Updates" name="applicationUpdates" checked={notificationSettings.applicationUpdates} onChange={onNotificationChange} />
                  <button onClick={saveNotifications} className="btn-primary" type="button">Save Notification Settings</button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-extrabold text-[var(--brand-700)]">Security</h2>
                <div className="mt-5 space-y-4">
                  <button className="btn-outline" type="button">Setup Two-Factor Authentication</button>
                  <button onClick={logoutAll} className="btn-outline" type="button">Logout From All Devices</button>
                  <div className="rounded-2xl border border-[rgba(224,70,70,0.24)] bg-[rgba(224,70,70,0.08)] p-4">
                    <p className="text-sm font-semibold text-[#9f2d2d]">Danger Zone</p>
                    <p className="mt-1 text-sm text-[#9f2d2d]">Deleting your account is irreversible.</p>
                    <button onClick={() => setShowDeleteConfirm(true)} className="mt-3 rounded-xl bg-[#b83a3a] px-4 py-2 text-sm font-bold text-white" type="button">Delete Account</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </section>

        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="glass-card max-w-md p-6">
              <h3 className="text-xl font-extrabold text-[var(--brand-700)]">Delete Account</h3>
              <p className="mt-2 text-sm text-[rgba(15,31,61,0.78)]">This action cannot be undone. Are you sure you want to continue?</p>
              <div className="mt-5 flex gap-2">
                <button onClick={() => setShowDeleteConfirm(false)} className="btn-outline" type="button">Cancel</button>
                <button onClick={confirmDeleteAccount} className="rounded-xl bg-[#b83a3a] px-4 py-2 text-sm font-bold text-white" type="button">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Toggle({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-[rgba(30,111,208,0.16)] bg-white/70 px-4 py-3">
      <span className="text-sm font-semibold text-[var(--brand-700)]">{label}</span>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-[var(--brand-600)]" />
    </label>
  );
}
