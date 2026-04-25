import React from 'react';
import { motion } from 'motion/react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  ExternalLink,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import ThreeDIcon from './ThreeDIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Academic Calendar', href: '#' },
    { name: 'Library Archives', href: '#' },
    { name: 'Student Portal', href: '#' },
    { name: 'Research Center', href: '#' },
  ];

  const social = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Github, href: '#' },
  ];

  return (
    <footer className="bg-bg-dark border-t border-border-subtle mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center border border-accent-gold/20">
                <span className="font-display font-bold text-accent-gold text-xl">S</span>
              </div>
              <h2 className="text-xl font-display font-bold tracking-tight">THE SCHOLAR'S PORTAL</h2>
            </div>
            <p className="text-text-muted font-sans text-sm leading-relaxed mb-6">
              Advancing the frontiers of English Studies through immersive digital archives and intelligent academic assistance.
            </p>
            <div className="flex gap-4">
              {social.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  whileHover={{ y: -3, color: '#d4af37' }}
                  className="text-text-muted transition-colors"
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-display font-bold uppercase tracking-[0.2em] text-accent-gold mb-6">University Links</h3>
            <ul className="space-y-4">
              {links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-text-muted hover:text-text-main transition-colors font-sans text-sm flex items-center gap-2 group">
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-display font-bold uppercase tracking-[0.2em] text-accent-gold mb-6">Contact Registrar</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-text-muted font-sans text-sm">
                <MapPin size={18} className="text-accent-gold shrink-0" />
                <span>123 Academic Way, Scholar's District, FLSHM</span>
              </li>
              <li className="flex items-center gap-3 text-text-muted font-sans text-sm">
                <Phone size={18} className="text-accent-gold shrink-0" />
                <span>+1 (555) SCHOLAR</span>
              </li>
              <li className="flex items-center gap-3 text-text-muted font-sans text-sm">
                <Mail size={18} className="text-accent-gold shrink-0" />
                <span>registrar@scholars-portal.edu</span>
              </li>
            </ul>
          </div>

          {/* Newsletter/Status */}
          <div>
            <h3 className="text-sm font-display font-bold uppercase tracking-[0.2em] text-accent-gold mb-6">Portal Status</h3>
            <div className="glass-panel p-4 rounded-2xl border border-accent-gold/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-success-light rounded-full pulse-glow" />
                <span className="text-xs font-sans font-medium">All Systems Operational</span>
              </div>
              <p className="text-[10px] text-text-muted font-sans">
                Last Archive Sync: {new Date().toLocaleTimeString()}
              </p>
              <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-display font-bold uppercase tracking-widest transition-all">
                View System Logs
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted font-sans">
            © {currentYear} The Scholar's Portal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] text-text-muted hover:text-accent-gold uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] text-text-muted hover:text-accent-gold uppercase tracking-widest transition-colors">Terms of Service</a>
            <a href="#" className="text-[10px] text-text-muted hover:text-accent-gold uppercase tracking-widest transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
