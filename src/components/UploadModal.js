'use client'

import { X, Upload, AlertCircle, CheckCircle, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function UploadModal({ onClose, onUpload, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    htmlContent: ''
  })
  const [errors, setErrors] = useState({})
  const [showPreview, setShowPreview] = useState(false)

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !loading) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, loading])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }
    
    if (!formData.htmlContent.trim()) {
      newErrors.htmlContent = 'HTML content is required'
    } else if (!formData.htmlContent.includes('<html') && !formData.htmlContent.includes('<!DOCTYPE')) {
      newErrors.htmlContent = 'Please provide complete HTML document (should include <html> tag or <!DOCTYPE>)'
    }
    
    // Validate tags if provided
    if (formData.tags.trim()) {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t)
      if (tags.length > 10) {
        newErrors.tags = 'Maximum 10 tags allowed'
      }
      if (tags.some(tag => tag.length > 20)) {
        newErrors.tags = 'Each tag must be less than 20 characters'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }
    
    onUpload(formData)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose()
    }
  }

  const sampleHtml = `<!DOCTYPE html>
<html>
<head>
    <title>My Educational App</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            height: 100vh;
            margin: 0;
        }
        button { 
            background: #3b82f6; 
            color: white; 
            border: none; 
            padding: 15px 30px; 
            border-radius: 10px; 
            cursor: pointer; 
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>My Interactive App</h1>
    <p>This is an example educational app!</p>
    <button onclick="alert('Hello from my app!')">Click Me!</button>
</body>
</html>`

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload Educational App</h2>
            <p className="text-gray-600 mt-1">Share your interactive educational content with educators worldwide</p>
          </div>
          <button 
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex h-[60vh]">
          {/* Form Section */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Interactive Fraction Builder"
                  disabled={loading}
                />
                {errors.title && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.title}
                  </div>
                )}
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe what your app does and what students will learn..."
                  disabled={loading}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.description ? (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.description}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      {formData.description.length}/500 characters
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.tags ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="math, fractions, grade-3, interactive"
                  disabled={loading}
                />
                {errors.tags ? (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.tags}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    Separate tags with commas. Use subject areas, grade levels, and learning objectives.
                  </p>
                )}
              </div>
              
              {/* HTML Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    HTML Content *
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({...prev, htmlContent: sampleHtml}))}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      disabled={loading}
                    >
                      Use Sample
                    </button>
                    {formData.htmlContent && (
                      <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        disabled={loading}
                      >
                        <Eye size={14} />
                        {showPreview ? 'Hide' : 'Show'} Preview
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={formData.htmlContent}
                  onChange={(e) => handleInputChange('htmlContent', e.target.value)}
                  rows={16}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm resize-vertical ${
                    errors.htmlContent ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Paste your complete HTML app code here..."
                  disabled={loading}
                />
                {errors.htmlContent && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    {errors.htmlContent}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Preview Section */}
          {showPreview && formData.htmlContent && (
            <div className="w-1/2 border-l bg-gray-50">
              <div className="p-4 border-b bg-white">
                <h3 className="font-medium text-gray-900">Live Preview</h3>
              </div>
              <div className="h-full">
                <iframe
                  srcDoc={formData.htmlContent}
                  className="w-full h-full border-none"
                  title="App Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>Your app will be reviewed before being published to ensure quality and safety.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.title || !formData.description || !formData.htmlContent}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Upload App
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}