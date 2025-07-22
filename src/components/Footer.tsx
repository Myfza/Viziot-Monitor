import React from 'react'
import { Github, Globe, Linkedin, Twitter, Mail ,Instagram } from 'lucide-react'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/myfza',
      icon: Github,
      color: 'hover:text-orange-400'
    },
    {
      name: 'Portfolio',
      url: 'http://vizdev.netlify.app/',
      icon: Globe,
      color: 'hover:text-orange-400'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/myfza',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/vizart.in',
      icon: Twitter,
      color: 'hover:text-sky-400'
    },
    {
      name: 'Email',
      url: 'mailto:Vizart@gmail.com',
      icon: Mail,
      color: 'hover:text-green-400'
    }
  ]

  return (
    <footer className="bg-gray-800/50 backdrop-blur-xl border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-2">IoT Controller</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced IoT device management platform for smart homes and industrial automation.
              Control your devices from anywhere in the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-md font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#dashboard" 
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  aria-label="Go to Dashboard"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a 
                  href="#devices" 
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  aria-label="Manage Devices"
                >
                  My Devices
                </a>
              </li>
              <li>
                <a 
                  href="#help" 
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  aria-label="Get Help"
                >
                  Help & Support
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-md font-semibold text-white mb-3">Connect With Me</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-gray-700/50 text-gray-400 ${link.color} transition-all duration-200 hover:bg-gray-600/50 hover:scale-110`}
                    aria-label={`Visit my ${link.name} profile`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
            <p className="text-gray-400 text-xs">
              Open source • Built with React & Supabase
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} IoT Controller. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made by</span>
              <span>Muhammad Yusuf Aditiya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
