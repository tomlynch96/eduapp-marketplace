'use client'

import { Upload, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header({ onUpload }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📚</div>
            <div>
              <h1 className="text-xl font-bold">EduApp Marketplace</h1>
              <p className="text-sm text-blue-100 hidden sm:block">Interactive Educational Tools</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#marketplace" 
              className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
            >
              Browse Apps
            </a>
            <a 
              href="#features" 
              className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
            >
              Features
            </a>
            <a 
              href="#help" 
              className="hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
            >
              Help
            </a>
            <button 
              onClick={onUpload}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition-colors"
            >
              <Upload size={16} />
              <span>Upload App</span>
            </button>
            <button className="flex items-center space-x-2 hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors">
              <User size={16} />
              <span className="hidden lg:inline">Sign In</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-blue-500 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-500">
            <nav className="flex flex-col space-y-2 mt-4">
              <a 
                href="#marketplace" 
                className="hover:bg-blue-500 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Apps
              </a>
              <a 
                href="#features" 
                className="hover:bg-blue-500 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#help" 
                className="hover:bg-blue-500 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </a>
              <button 
                onClick={() => {
                  onUpload()
                  setIsMenuOpen(false)
                }}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-400 px-4 py-3 rounded-lg transition-colors text-left"
              >
                <Upload size={16} />
                <span>Upload App</span>
              </button>
              <button 
                className="flex items-center space-x-2 hover:bg-blue-500 px-4 py-3 rounded-lg transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={16} />
                <span>Sign In</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
