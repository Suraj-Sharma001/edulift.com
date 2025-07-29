'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SettingsPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    allowMessages: true
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    jobAlerts: true,
    applicationUpdates: true
  });

  useEffect(() => {
    // Check authentication and get user data
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const userStr = localStorage.getItem('user');
      
      if (authStatus !== 'true' || !userStr) {
        router.push('/Login');
        return;
      }

      const user = JSON.parse(userStr);
      setUserProfile(user);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleAccountSettingChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrivacySettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNotificationSettingChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (accountSettings.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      // Here you would make an API call to change password
      alert('Password changed successfully!');
      setAccountSettings({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    }
  };

  const handleSavePrivacySettings = () => {
    try {
      // Here you would make an API call to save privacy settings
      localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
      alert('Privacy settings saved successfully!');
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      alert('Failed to save privacy settings');
    }
  };

  const handleSaveNotificationSettings = () => {
    try {
      // Here you would make an API call to save notification settings
      localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
      alert('Notification settings saved successfully!');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Failed to save notification settings');
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      // Here you would make an API call to delete the account
      localStorage.clear();
      alert('Account deleted successfully');
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account');
    }
  };

  const handleLogoutAllDevices = () => {
    try {
      // Here you would make an API call to logout from all devices
      localStorage.clear();
      alert('Logged out from all devices');
      router.push('/Login');
    } catch (error) {
      console.error('Error logging out from all devices:', error);
      alert('Failed to logout from all devices');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Please login to access settings</p>
          <Link href="/Login" className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🛡️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
            </div>
            <Link
              href="/profile"
              className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>View Profile</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Account Settings */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                  
                  <div className="space-y-8">
                    {/* Change Password */}
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h3>
                      <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={accountSettings.currentPassword}
                            onChange={handleAccountSettingChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            name="newPassword"
                            value={accountSettings.newPassword}
                            onChange={handleAccountSettingChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={accountSettings.confirmPassword}
                            onChange={handleAccountSettingChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Change Password
                        </button>
                      </form>
                    </div>

                    {/* Account Information */}
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                          <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{userProfile.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                          <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg capitalize">{userProfile.role}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                          <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">January 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                      <select
                        name="profileVisibility"
                        value={privacySettings.profileVisibility}
                        onChange={handlePrivacySettingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="public">Public - Anyone can view</option>
                        <option value="private">Private - Only me</option>
                        <option value="contacts">Contacts Only</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700">Show Email Address</h4>
                          <p className="text-sm text-gray-500">Allow others to see your email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="showEmail"
                            checked={privacySettings.showEmail}
                            onChange={handlePrivacySettingChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700">Show Phone Number</h4>
                          <p className="text-sm text-gray-500">Allow others to see your phone number</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="showPhone"
                            checked={privacySettings.showPhone}
                            onChange={handlePrivacySettingChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700">Allow Messages</h4>
                          <p className="text-sm text-gray-500">Allow other users to send you messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="allowMessages"
                            checked={privacySettings.allowMessages}
                            onChange={handlePrivacySettingChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleSavePrivacySettings}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Save Privacy Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={notificationSettings.emailNotifications}
                            onChange={handleNotificationSettingChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700">Push Notifications</h4>
                          <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="pushNotifications"
                            checked={notificationSettings.pushNotifications}
                            onChange={handleNotificationSettingChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700">Marketing Emails</h4>
                          <p className="text-sm text-gray-500">Receive promotional emails and updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="marketingEmails"
                            checked={notificationSettings.marketingEmails}
                            onChange={handleNotificationSettingChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700">Job Alerts</h4>
                          <p className="text-sm text-gray-500">Get notified about new job opportunities</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="jobAlerts"
                            checked={notificationSettings.jobAlerts}
                            onChange={handleNotificationSettingChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700">Application Updates</h4>
                          <p className="text-sm text-gray-500">Get updates on your job applications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="applicationUpdates"
                            checked={notificationSettings.applicationUpdates}
                            onChange={handleNotificationSettingChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveNotificationSettings}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Save Notification Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Security & Account</h2>
                  
                  <div className="space-y-8">
                    {/* Two-Factor Authentication */}
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-700">Enable 2FA</h4>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Setup 2FA
                        </button>
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 font-bold">🖥️</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700">Current Device</h4>
                              <p className="text-sm text-gray-500">Chrome on Windows • Active now</p>
                            </div>
                          </div>
                          <span className="text-green-600 text-sm font-medium">Current</span>
                        </div>
                        
                        <button
                          onClick={handleLogoutAllDevices}
                          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Logout from All Devices
                        </button>
                      </div>
                    </div>

                    {/* Login Activity */}
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Login Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-700">Successful login</p>
                            <p className="text-sm text-gray-500">Today at 10:30 AM</p>
                          </div>
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-700">Successful login</p>
                            <p className="text-sm text-gray-500">Yesterday at 3:45 PM</p>
                          </div>
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-red-700">Delete Account</h4>
                          <p className="text-sm text-red-600 mb-3">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <button
                            onClick={handleDeleteAccount}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Account</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteAccount}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;