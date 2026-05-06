import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Ticket, Calendar, Shield, LogOut, User } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Book Tickets', path: '/', icon: Ticket },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
  ];

  if (user) {
    navItems.push({ name: 'My Bookings', path: '/my-bookings', icon: Ticket });
  }

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin Dashboard', path: '/admin', icon: Shield });
  }

  return (
    <header className="h-20 border-b border-border flex items-center px-10 justify-between shrink-0 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="font-black text-2xl tracking-tighter uppercase flex items-center gap-3 group">
        <div className="w-8 h-8 bg-accent/20 rounded flex items-center justify-center group-hover:bg-accent/30 transition-colors">
          <Ticket className="w-5 h-5 text-accent" />
        </div>
        Techfest<span className="text-accent">2026</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'text-accent' : 'text-text-dim hover:text-text-main'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-text-dim">
              <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-text-main">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden md:inline">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-text-dim hover:text-error transition-colors px-3 py-2 rounded border border-transparent hover:border-error/30 hover:bg-error/10"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-text-dim hover:text-text-main transition-colors px-4 py-2"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-bold bg-accent text-bg px-5 py-2 rounded hover:bg-white hover:shadow-[0_0_15px_#00FFB2] transition-all"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
