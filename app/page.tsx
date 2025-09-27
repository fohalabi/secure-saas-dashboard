'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Shield, Users, FileText, Zap, Layers } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      title: "Passwordless Authentication",
      description: "Log in with passkeys (WebAuthn) — no need to remember or reset passwords."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Role-Based Access Control (RBAC)",
      description: "Invite team members, assign roles, and manage access with ease."
    },
    {
      icon: <FileText className="w-8 h-8 text-green-400" />,
      title: "Audit Logs",
      description: "Track key actions and activities to keep your team secure and accountable."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Built with Modern Tech",
      description: "Next.js, TypeScript, Prisma, PostgreSQL, Tailwind, and WebAuthn."
    }
  ];

  const techStack = [
    { name: "Next.js", color: "from-black to-gray-800" },
    { name: "TypeScript", color: "from-blue-500 to-blue-600" },
    { name: "Tailwind CSS", color: "from-cyan-400 to-blue-500" },
    { name: "Prisma + PostgreSQL", color: "from-indigo-500 to-purple-600" },
    { name: "WebAuthn (Passkeys)", color: "from-green-400 to-emerald-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.08),transparent_50%)] opacity-70"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.06),transparent_50%)]"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
            <Layers className="w-8 h-8 text-blue-600" />
            <span>SaaS Dashboard</span>
          </div>
          <div className="flex space-x-4">
            <Link href="https://github.com/fohalabi/secure-saas-dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Github />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-pulse">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-gray-200 shadow-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Security First Design</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Secure
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SaaS Dashboard
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            A modern dashboard with passwordless authentication, role-based access, and audit logs — 
            built to show how security and usability can work together.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]">
              <span className="relative z-10 flex items-center space-x-2">
                <span> Try Demo</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Feature Highlights</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
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
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <div className="relative mx-auto max-w-4xl">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border border-gray-300 shadow-xl overflow-hidden">
                {/* Browser header */}
                <div className="bg-gray-200 px-4 py-3 flex items-center space-x-2 border-b border-gray-300">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/80 rounded px-3 py-1 text-xs text-gray-600">
                      https://secure-saas-dashboard.vercel.app
                    </div>
                  </div>
                </div>
                
                {/* Dashboard mockup content */}
                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-8 bg-gray-200 rounded w-48"></div>
                      <div className="h-8 bg-blue-100 rounded w-24"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="h-24 bg-white rounded-lg border border-gray-200 shadow-sm"></div>
                      <div className="h-24 bg-white rounded-lg border border-gray-200 shadow-sm"></div>
                      <div className="h-24 bg-white rounded-lg border border-gray-200 shadow-sm"></div>
                    </div>
                    <div className="h-32 bg-white rounded-lg border border-gray-200 shadow-sm mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-white rounded-lg border border-gray-200 shadow-sm"></div>
                      <div className="h-20 bg-white rounded-lg border border-gray-200 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-2xl text-gray-600 italic">
            Designed with simplicity and scalability in mind.
          </p>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Powered By</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-12"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${tech.color} opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                <div className="text-white font-semibold text-lg">
                  {tech.name}
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; 2025 SaaS Dashboard. Built with security and usability in mind.</p>
          </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </div>
  );
};

export default HomePage;