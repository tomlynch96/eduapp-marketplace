'use client'

import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

export default function SearchFilters({ 
  searchTerm, 
  selectedTags, 
  allTags, 
  onSearch, 
  onTagFilter, 
  resultCount 
}) {
  const [showAllTags, setShowAllTags] = useState(false)

  const popularTags = ['math', 'science', 'english', 'grade-3', 'grade-4', 'grade-5']
  const displayTags = showAllTags ? allTags : popularTags.filter(tag => allTags.includes(tag))

  const handleTagClick = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    onTagFilter(newSelectedTags)
  }

  const clearAllFilters = () => {
    onSearch('')
    onTagFilter([])
  }

  return (
    <div className="bg-white shadow-sm border-b sticky top-[84px] z-30">
      <div className="max-w-7xl mx-auto p-4">
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search apps, subjects, or grade levels..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          {/* Results Count */}
          <div className="text-sm text-gray-600 whitespace-nowrap">
            {resultCount} {resultCount === 1 ? 'app' : 'apps'} found
          </div>
        </div>
        
        {/* Tag Filters */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-blue-600 hover:underline ml-2"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {displayTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'
                }`}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X size={12} className="inline ml-1" />
                )}
              </button>
            ))}
            
            {allTags.length > popularTags.length && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {showAllTags ? 'Show less' : `+${allTags.length - popularTags.filter(tag => allTags.includes(tag)).length} more`}
              </button>
            )}
          </div>
        </div>
        
        {/* Active Filters Summary */}
        {(searchTerm || selectedTags.length > 0) && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span>Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                Search: "{searchTerm}"
                <button onClick={() => onSearch('')} className="hover:text-blue-900">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedTags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {tag}
                <button onClick={() => handleTagClick(tag)} className="hover:text-blue-900">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
