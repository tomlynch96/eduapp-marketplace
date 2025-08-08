'use client'

import { Star, Eye, Copy, Play, Calendar, User } from 'lucide-react'
import { useState } from 'react'

export default function AppCard({ app, onLaunch, onCopy }) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  const getSubjectEmoji = (tags) => {
    if (tags.includes('math')) return '🧮'
    if (tags.includes('science')) return '🔬'
    if (tags.includes('english')) return '📚'
    if (tags.includes('history')) return '🏛️'
    if (tags.includes('geography')) return '🌍'
    if (tags.includes('art')) return '🎨'
    return '🎓'
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* App Preview/Screenshot */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        {!imageError && app.screenshot_url ? (
          <img 
            src={app.screenshot_url} 
            alt={`${app.title} preview`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-4xl mb-2">{getSubjectEmoji(app.tags)}</div>
              <div className="text-lg font-semibold px-4">{app.title}</div>
            </div>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? 'bg-opacity-30' : 'bg-opacity-0'
        }`}>
          <button 
            onClick={() => onLaunch(app)}
            className={`bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <Play size={16} className="inline mr-2" />
            Launch App
          </button>
        </div>

        {/* Rating Badge */}
        {app.rating > 0 && (
          <div className="absolute top-3 right-3 bg-white bg-opacity-95 px-2 py-1 rounded-full flex items-center text-sm font-medium">
            <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
            <span>{app.rating}</span>
          </div>
        )}
      </div>
      
      {/* App Information */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {app.title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {app.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {app.tags.slice(0, 4).map(tag => (
            <span 
              key={tag} 
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {app.tags.length > 4 && (
            <span className="text-gray-400 text-xs px-2 py-1">
              +{app.tags.length - 4} more
            </span>
          )}
        </div>
        
        {/* Author and Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{app.author_name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye size={12} />
              <span>{formatNumber(app.download_count)}</span>
            </div>
            {app.review_count > 0 && (
              <span>{app.review_count} reviews</span>
            )}
          </div>
        </div>
        
        {/* Date */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <Calendar size={12} />
          <span>Added {formatDate(app.created_at)}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onLaunch(app)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <Play size={14} />
            Launch App
          </button>
          <button 
            onClick={() => onCopy(app)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center"
            title="Copy for PowerPoint/Google Slides"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
