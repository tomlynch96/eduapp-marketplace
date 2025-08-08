'use client'

import { X, Copy, ExternalLink, Star, Eye, User } from 'lucide-react'
import { useEffect } from 'react'

export default function AppModal({ app, onClose, onCopy }) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden' // Prevent background scroll
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{app.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>By {app.author_name}</span>
                  </div>
                  {app.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" fill="currentColor" />
                      <span>{app.rating}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{formatNumber(app.download_count)} uses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onCopy(app)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Copy size={16} />
              Copy for Slides
            </button>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* App Description */}
        {app.description && (
          <div className="px-6 py-4 bg-gray-50 border-b">
            <p className="text-gray-700 leading-relaxed">{app.description}</p>
            {app.tags && app.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {app.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* App Content */}
        <div className="h-[70vh] bg-gray-100">
          {app.html_content ? (
            <iframe
              srcDoc={app.html_content}
              className="w-full h-full border-none"
              title={app.title}
              sandbox="allow-scripts allow-same-origin allow-forms"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <p>App content not available</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <p>Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Esc</kbd> to close</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  // In a real app, this would open the app in a new tab
                  window.open(`/apps/${app.id}`, '_blank')
                }}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <ExternalLink size={16} />
                Open in New Tab
              </button>
              <button 
                onClick={() => onCopy(app)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
