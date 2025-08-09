'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import SearchFilters from '../components/SearchFilters'
import AppCard from '../components/AppCard'
import AppModal from '../components/AppModal'
import UploadModal from '../components/UploadModal'
import Notification from '../components/Notification'
import { sampleApps } from '../data/sampleApps'
import { appsAPI } from '../lib/supabase' // Uncomment when Supabase is set up

export default function HomePage() {
  // State management
  const [apps, setApps] = useState([])
  const [filteredApps, setFilteredApps] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalApp, setModalApp] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [notification, setNotification] = useState('')
  const [loading, setLoading] = useState(true)

// Initialize apps - using Supabase database
useEffect(() => {
  const loadApps = async () => {
    try {
      // Load from Supabase database
      const apps = await appsAPI.getApps()
      setApps(apps)
      setFilteredApps(apps)
      
      // Fallback to sample data if database fails
      if (!apps || apps.length === 0) {
        setApps(sampleApps)
        setFilteredApps(sampleApps)
        console.log('Using sample data as fallback')
      }
    } catch (error) {
      console.error('Failed to load apps from database:', error)
      // Use sample data as fallback
      setApps(sampleApps)
      setFilteredApps(sampleApps)
      showNotification('⚠️ Using sample data - database connection issue')
    } finally {
      setLoading(false)
    }
  }

  loadApps()
}, [])

  // Search and filter logic
  useEffect(() => {
    let filtered = apps.filter(app => {
      const matchesSearch = searchTerm === '' || 
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => app.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })
    
    // Sort by rating and download count
    filtered.sort((a, b) => {
      return (b.rating * b.download_count) - (a.rating * a.download_count)
    })
    
    setFilteredApps(filtered)
  }, [searchTerm, selectedTags, apps])

  // Utility functions
  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 5000)
  }

  const copyToClipboard = async (app) => {
    const appUrl = `${window.location.origin}/apps/${app.id}`
    
    try {
      // Create canvas for screenshot
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 800
      canvas.height = 600
      
      // Generate preview image
      const gradient = ctx.createLinearGradient(0, 0, 800, 600)
      gradient.addColorStop(0, '#3b82f6')
      gradient.addColorStop(1, '#8b5cf6')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 800, 600)
      
      ctx.fillStyle = 'white'
      ctx.font = 'bold 48px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(app.title, 400, 250)
      
      ctx.font = '24px Arial'
      ctx.fillText(`⭐ ${app.rating} • ${app.download_count} uses`, 400, 300)
      ctx.fillText('🎯 Click to Launch Educational App', 400, 350)
      
      // Add app icon/subject indicator
      ctx.font = '32px Arial'
      const subjectEmoji = app.tags.includes('math') ? '🧮' : 
                          app.tags.includes('science') ? '🔬' : 
                          app.tags.includes('english') ? '📚' : '🎓'
      ctx.fillText(subjectEmoji, 400, 400)
      
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      
      const htmlContent = `<a href="${appUrl}" target="_blank" rel="noopener"><img src="${canvas.toDataURL()}" alt="${app.title} - Interactive Educational App" style="width:400px;height:300px;border:3px solid #3b82f6;border-radius:12px;box-shadow:0 4px 12px rgba(59,130,246,0.3);transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"></a>`
      
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
        'text/plain': new Blob([`${app.title}\n${appUrl}\n\nInteractive educational app - click to launch!`], { type: 'text/plain' }),
        'image/png': blob
      })
      
      await navigator.clipboard.write([clipboardItem])
      showNotification('✅ Copied! Paste into PowerPoint or Google Slides. The image will be clickable and will launch the app.')
      
    } catch (err) {
      console.error('Clipboard operation failed:', err)
      try {
        await navigator.clipboard.writeText(appUrl)
        showNotification('📋 Link copied! Insert an image in your presentation and add this URL as a hyperlink.')
      } catch (e) {
        showNotification('❌ Copy failed. Manual URL: ' + appUrl)
      }
    }
  }

  const launchApp = (app) => {
    setModalApp(app)
    setShowModal(true)
    
    // Increment download count (in production, call API)
    // appsAPI.incrementDownloads(app.id)
  }

const handleUpload = async (appData) => {
  try {
    setLoading(true)
    
    const newApp = {
      id: `app-${Date.now()}`,
      title: appData.title,
      description: appData.description,
      author_id: 'current-user', // Replace with actual user ID
      author_name: 'Current User', // Replace with actual user name
      tags: appData.tags.split(',').map(t => t.trim()).filter(t => t),
      rating: 0,
      review_count: 0,
      download_count: 0,
      created_at: new Date().toISOString().split('T')[0],
      screenshot_url: `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(appData.title)}`,
      status: 'published',
      html_content: appData.htmlContent
    }
    
    // Save to Supabase database
    try {
      const savedApp = await appsAPI.createApp(newApp)
      setApps(prev => [savedApp, ...prev])
    } catch (dbError) {
      console.error('Database save failed:', dbError)
      // Fallback to local state
      setApps(prev => [newApp, ...prev])
      showNotification('⚠️ App uploaded locally - database sync pending')
    }
    
    setShowUpload(false)
    showNotification('🎉 App uploaded successfully!')
    
  } catch (error) {
    console.error('Upload failed:', error)
    showNotification('❌ Upload failed. Please try again.')
  } finally {
    setLoading(false)
  }
}

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleTagFilter = (tags) => {
    setSelectedTags(tags)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading educational apps...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onUpload={() => setShowUpload(true)} />
      
      <SearchFilters
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        allTags={[...new Set(apps.flatMap(app => app.tags))].sort()}
        onSearch={handleSearch}
        onTagFilter={handleTagFilter}
        resultCount={filteredApps.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {searchTerm || selectedTags.length > 0 ? 'Search Results' : 'Featured Educational Apps'}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'} • Ready to embed in your presentations
            </p>
          </div>
          
          {filteredApps.length > 0 && (
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
              <span>📊 Sorted by popularity</span>
            </div>
          )}
        </div>
        
        {filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No apps found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedTags.length > 0 
                ? 'Try adjusting your search terms or filters'
                : 'Be the first to upload an educational app!'
              }
            </p>
            {!searchTerm && selectedTags.length === 0 && (
              <button
                onClick={() => setShowUpload(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Upload First App
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map(app => (
              <AppCard
                key={app.id}
                app={app}
                onLaunch={launchApp}
                onCopy={copyToClipboard}
              />
            ))}
          </div>
        )}
        
        {filteredApps.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">
              Found what you're looking for? These apps are ready to enhance your presentations!
            </p>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Share Your Own App
            </button>
          </div>
        )}
      </main>
      
      {showModal && modalApp && (
        <AppModal
          app={modalApp}
          onClose={() => setShowModal(false)}
          onCopy={copyToClipboard}
        />
      )}
      
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
          loading={loading}
        />
      )}
      
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
    </div>
  )
}
