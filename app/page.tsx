'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Shield, Users, FileText, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Passwordless Authentication",
      description: "Log in with passkeys (WebAuthn) — no need to remember or reset passwords."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Role-Based Access Control (RBAC)",
      description: "Invite team members, assign roles, and manage access with ease."
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Audit Logs",
      description: "Track key actions and activities to keep your team secure and accountable."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Built with Modern Tech",
      description: "Next.js, TypeScript, Prisma, PostgreSQL, Tailwind, and WebAuthn."
    }
  ];

  const techStack = [
    { 
      name: "Next.js", 
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 180 180" fill="none">
          <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black"/>
        </mask>

          <g mask="url(#mask0)">
            <circle cx="90" cy="90" r="90" fill="black"/>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear)"/>
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)"/>
          </g>
          <defs>
            <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      )
    },
    { 
      name: "TypeScript",
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 256 256" fill="none">
          <rect width="256" height="256" fill="#3178C6"/>
          <path d="M20 20h216v216H20V20z" fill="#3178C6"/>
          <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a31.748 31.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.389 1.611 4.276 3.366 5.659 5.265 1.383 1.899 2.075 4.058 2.075 6.476 0 2.246-.633 4.186-1.899 5.82-1.266 1.633-2.977 2.977-5.135 4.031-2.157 1.055-4.664 1.834-7.52 2.338-2.857.504-5.874.756-9.052.756-10.697 0-20.797-2.591-30.3-7.773z" fill="#FFF"/>
          <path d="M71.002 200.475h23.912V77.528H71.002v122.947zm-1.072-167.396h26.057v23.912H69.93V33.079z" fill="#FFF"/>
        </svg>
      )
    },
    { 
      name: "Tailwind CSS",
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 256 154" fill="none">
          <defs>
            <linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="tailwind-gradient">
              <stop stopColor="#2298BD" offset="0%"></stop>
              <stop stopColor="#0ED7B5" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z" fill="url(#tailwind-gradient)"></path>
        </svg>
      )
    },
    { 
      name: "PostgreSQL",
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 256 264" fill="none">
          <path d="M255.008 158.086c-1.535-4.649-5.556-7.887-10.756-8.664-2.452-.366-5.26-.21-8.583.475-5.792 1.195-10.089 1.65-13.225 1.738 11.837-19.985 21.462-42.775 27.003-64.228 8.96-34.689 4.172-50.492-1.423-57.64C233.217 10.847 211.614.683 185.552.372c-13.903-.17-26.108 2.575-32.475 4.549-5.928-1.046-12.302-1.63-18.99-1.738-12.537-.2-23.614 2.533-33.079 8.15-5.24-1.772-13.65-4.27-23.362-5.864-22.842-3.75-41.252-.828-54.718 8.685C6.622 25.672-.937 45.684.461 73.634c.444 8.874 5.408 35.874 13.224 61.48 4.492 14.718 9.282 26.94 14.237 36.33 7.027 13.315 14.546 21.156 22.987 23.972 4.731 1.576 13.327 2.68 22.368-4.85 1.146 1.388 2.675 2.767 4.704 4.048 2.577 1.625 5.728 2.953 8.875 3.74 11.341 2.835 21.964 2.126 31.027-1.848.056 1.612.099 3.152.135 4.482.06 2.157.12 4.272.199 6.25.537 13.374 1.447 23.773 4.143 31.049.148.4.347 1.015.557 1.757 1.85 6.531 4.124 14.572 9.863 18.668 1.988 1.42 4.108 2.136 6.305 2.136 6.529 0 11.977-6.552 17.08-12.66 1.738-2.078 3.552-4.25 5.39-6.165 7.363-7.67 13.774-11.946 20.925-13.577 2.215-.504 7.186-1.446 12.693-2.468 9.232-1.714 19.678-3.655 26.818-5.66 2.227-.626 4.306-1.356 6.207-2.182 5.825-2.53 11.011-6.99 13.908-11.965 7.31-12.562 11.497-28.61 12.434-47.725.202-4.127.253-8.255.158-12.315 8.558-3.383 14.549-9.586 17.742-18.37 2.864-7.882 3.037-17.628.539-28.965z" fill="#336791"/>
          <path d="M238.111 161.365c-2.158 5.939-6.68 10.256-13.424 12.827-1.668.635-3.504 1.249-5.476 1.83-6.842 2.016-17.149 3.923-26.318 5.627-5.594 1.04-10.856 2.02-13.451 2.604-5.672 1.286-10.815 4.628-17.088 11.264-1.659 1.755-3.367 3.801-5.004 5.77-3.975 4.767-8.107 9.712-11.793 10.72-1.07-1.926-1.906-7.132-2.423-19.775-.08-1.963-.14-4.05-.199-6.207-.089-3.188-.179-6.481-.353-10.056-.05-1.007.123-1.907.998-2.912 2.349-2.694 5.057-5.57 8.226-8.694.828-.816 1.665-1.65 2.518-2.484 1.276-1.253 1.336-2.109 1.251-3.075-.091-1.029-.511-1.89-1.186-2.445-1.243-.998-3.05-1.021-5.242-.068-1.012.438-2.008.998-3.021 1.674-1.397.916-2.838 1.864-4.43 2.74-2.139 1.183-4.187 2.14-6.218 2.915-5.888 2.246-11.37 3.294-16.316 3.138l-.035-.004a1.086 1.086 0 0 0-.106.004c-4.674.15-8.936-.846-12.691-2.947-2.064-1.15-3.813-2.524-5.21-4.069-.108-.12-.237-.227-.351-.346l-.124-.131c-1.013-1.055-1.915-2.06-2.794-3.003-2.75-2.95-4.655-4.725-6.448-5.734-12.742-7.169-14.353-25.859-18.219-50.31-.107-.673-.213-1.346-.317-2.017l-.05-.324c-4.19-27.04-9.438-60.663-7.609-71.478 1.09-6.439 6.515-13.354 17.283-15.103 8.435-1.37 17.44.473 26.763 5.477.996.536 1.993 1.12 2.997 1.746.003.002.006.004.008.006 1.03.645 2.03 1.308 3.023 1.991 1.113.767 2.226 1.583 3.352 2.446 1.146.88 2.292 1.807 3.438 2.787.906.775 1.841 1.578 2.813 2.43 2.95-4.009 6.168-8.018 9.634-12.017.296-.342.593-.681.888-1.02 6.202-7.12 12.596-13.488 19.014-18.93z" fill="#FFF"/>
        </svg>
      )
    },
    { 
      name: "WebAuthn",
      logo: <Shield className="w-12 h-12 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="relative z-10 p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
            <Shield className="w-8 h-8 text-blue-600" />
            <span>SaaS Dashboard</span>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/auth" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Login | Sign Up
            </Link>
            <Link href="https://github.com/fohalabi/secure-saas-dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Github className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Security First Design</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Secure
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              SaaS Dashboard
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            A modern dashboard with passwordless authentication, role-based access, and audit logs — 
            built to show how security and usability can work together.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Feature Highlights</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <div className="relative mx-auto max-w-5xl">
              <div className="bg-white rounded-2xl border border-gray-300 shadow-2xl overflow-hidden">
                {/* Browser header */}
                <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b border-gray-300">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded px-3 py-1 text-xs text-gray-600 flex items-center">
                      <Shield className="w-3 h-3 mr-2 text-green-600" />
                      <span className="truncate">https://secure-saas-dashboard.vercel.app/dashboard</span>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard screenshot mockup */}
                <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-white">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h3>
                      <p className="text-xs md:text-sm text-gray-600">Welcome back, John Doe</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-semibold">
                        JD
                      </div>
                      <button className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        New Report
                      </button>
                    </div>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 md:p-4">
                      <p className="text-xs text-gray-500 mb-2">Total Users</p>
                      <p className="text-xl md:text-2xl font-bold text-green-600 mb-1">2,847</p>
                      <p className="text-xs text-blue-600">↑ 12.5% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 md:p-4">
                      <p className="text-xs text-gray-500 mb-2">Active Sessions</p>
                      <p className="text-xl md:text-2xl font-bold text-orange-600 mb-1">1,234</p>
                      <p className="text-xs text-purple-600">↑ 8.2% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 md:p-4">
                      <p className="text-xs text-gray-500 mb-2">Revenue</p>
                      <p className="text-xl md:text-2xl font-bold text-blue-600 mb-1">$45.2K</p>
                      <p className="text-xs text-green-600">↑ 23.1% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 md:p-4">
                      <p className="text-xs text-gray-500 mb-2">Conversion Rate</p>
                      <p className="text-xl md:text-2xl font-bold text-purple-600 mb-1">3.24%</p>
                      <p className="text-xs text-red-600">↓ 2.1% from last month</p>
                    </div>
                  </div>
                  
                  {/* Main Chart Area */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 md:p-6 mb-4 md:mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                      <h4 className="text-sm md:text-base font-semibold text-gray-900">User Growth</h4>
                      <div className="flex space-x-2">
                        <button className="px-2 md:px-3 py-1 text-xs md:text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200">7D</button>
                        <button className="px-2 md:px-3 py-1 text-xs md:text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200">30D</button>
                        <button className="px-2 md:px-3 py-1 text-xs md:text-sm text-white bg-blue-600 rounded">90D</button>
                      </div>
                    </div>
                    <div className="h-32 md:h-48 bg-gradient-to-t from-blue-50 to-transparent rounded relative">
                      <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                        <path d="M 0 120 L 50 100 L 100 110 L 150 80 L 200 90 L 250 60 L 300 70 L 350 40 L 400 50" 
                              stroke="#3B82F6" strokeWidth="3" fill="none"/>
                        <path d="M 0 120 L 50 100 L 100 110 L 150 80 L 200 90 L 250 60 L 300 70 L 350 40 L 400 50 L 400 150 L 0 150 Z" 
                              fill="url(#chart-gradient)" opacity="0.3"/>
                        <defs>
                          <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6"/>
                            <stop offset="100%" stopColor="#3B82F600"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Bottom Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Team Members */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 md:p-5">
                      <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-3 md:mb-4">Team Members</h4>
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            SA
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm font-medium text-gray-900">Sarah Anderson</p>
                            <p className="text-xs text-gray-500">Admin</p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex-shrink-0">Active</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            MJ
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm font-medium text-gray-900">Michael Johnson</p>
                            <p className="text-xs text-gray-500">Editor</p>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex-shrink-0">Active</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            EL
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm font-medium text-gray-900">Emily Lee</p>
                            <p className="text-xs text-gray-500">Viewer</p>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex-shrink-0">Offline</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 md:p-5">
                      <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-3 md:mb-4">Recent Activity</h4>
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm text-gray-900">New user registered via passkey</p>
                            <p className="text-xs text-gray-500">2 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm text-gray-900">Payment received from Acme Corp</p>
                            <p className="text-xs text-gray-500">15 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm text-gray-900">Sarah updated team permissions</p>
                            <p className="text-xs text-gray-500">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 italic mt-8">
            Designed with simplicity and scalability in mind.
          </p>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Powered By</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-12"></div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {tech.logo}
                  </div>
                  <div className="text-gray-700 font-semibold text-sm">
                    {tech.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 SaaS Dashboard. Built with security and usability in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;