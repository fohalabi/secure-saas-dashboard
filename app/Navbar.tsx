import React from 'react';
import Link from 'next/link';
import { Layers, Bell, ArrowRight, ArrowLeft, User, Settings, LogOut } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  pageTitle?: string;
  userEmail?: string;
  onSidebarToggle?: () => void;
  isSidebarOpen?: boolean;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  pageTitle = 'SaaS Dashboard',
  userEmail = 'user@example.com',
  onSidebarToggle,
  isSidebarOpen = false,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}) => {
  // Extract first name from email
  const getFirstNameFromEmail = (email: string): string => {
    const beforeAt = email.split('@')[0];
    const firstName = beforeAt.split('.')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  const userInitials = getFirstNameFromEmail(userEmail).charAt(0);
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Left: Page Title */}
            <div className="flex space-x-5 items-center">
              <Link 
                href='/'
                className='h-5 w-5 flex items-center justify-center'
              >
                <Layers className='h-5 w-5'/>
              </Link>
              <span className="font-semibold text-gray-900 dark:text-white">
                {pageTitle}
              </span>
            </div>

            {/* Right: Notification, Theme Toggle, User Avatar */}
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onNotificationClick}
                className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Theme Toggle */}
              <ModeToggle />

              {/* User Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm"
                  >
                    {userInitials}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogoutClick} className="cursor-pointer text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Left: Sidebar Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isSidebarOpen ? (
                <ArrowLeft className="h-5 w-5" />
              ) : (
                <ArrowRight className="h-5 w-5" />
              )}
            </Button>

            {/* Center: Page Title */}
            <div className='flex items-center space-x-4'>
              <Layers />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {pageTitle}
              </span>
            </div> 

            {/* Right: User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm"
                >
                  {userInitials}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogoutClick} className="cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;