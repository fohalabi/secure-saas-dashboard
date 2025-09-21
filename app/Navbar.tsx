'use client';
import React, { useState } from 'react'
import Link from 'next/link';
import {
  Layers,
  Search,
  Bell,
  ChevronDown,
  Menu,
  Settings,
  User,
  Shield,
  CreditCard,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

const mockUser ={
  id: '1',
  name: 'John Doe',
  email: 'john@acme.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const mockNotifications = [
  { id: '1', title: 'New team member  joined', unread:  true },
  { id: '2', title: 'Billing update required', unread:  true },
  { id: '3', title: 'Project deployed successfully', unread:  false }
];

export default function Navbar({ onMobileMenuToggle }) {

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const unreadCount = mockNotifications.filter(n => n.unread).length;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Intergrate with next-themes to intergrate
    document.documentElement.classList.toggle('dark');
  }

  return (
    <nav className='bg-white flex px-4 py-3 border-b border-gray-200 h-10 space-x-4 items-center justify-between relative z-50'>
      {/* Left Section */}
      <div className='flex items-center space-x-4'>
        <button
          onClick={onMobileMenuToggle}
          className='lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
        >
          <Menu className='w-5 h-5' />
        </button>

        {/* Logo */}
        <div className='flex items-center space-x-3'>
            <Link 
              href='/'
              className='flex items-enter justify-center w-8 h-8'
            >
              <Layers />
            </Link>
            <span className='hidden sm:block font-semibold text-gray-900 dark:text-white'>SaaS Dashboard</span>
        </div>
      </div>

      {/* center section - search */}
      <div>
        <div className={`relative w-full transition-all ${searchFocused ? 'scale-105' : ''}`}>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search className='h-4 w-4 text-gray-400' />
          </div>
          <input 
            type="text" 
            placeholder='Search teams, members,...'
            className='block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className='flex items-center space-x-2'>
        {/* Mobile Search */}
        <button className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

           {/* Notifications Dropdown */}
          {notificationsOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setNotificationsOpen(false)}
              />
              <div className="absolute top-full right-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-20">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white">{notification.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}

          {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {mockUser.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400 hidden sm:block" />
          </button>

          {/* User Dropdown */}
          {userDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setUserDropdownOpen(false)}
              />
              <div className="absolute top-full right-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-20">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{mockUser.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{mockUser.email}</p>
                </div>
                
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Shield className="w-4 h-4" />
                  <span>Security & Devices</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CreditCard className="w-4 h-4" />
                  <span>Billing</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                
                <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
        <div/>  
      </div>
    </nav>
  )
}

