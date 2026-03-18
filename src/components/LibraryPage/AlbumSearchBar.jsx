import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AlbumSearchBar({recordsList}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  // Filter records based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = recordsList.filter(record => {
      if (!record) return false;
      const searchLower = searchTerm.toLowerCase();
      const title = record.albumTitle || '';
      const artist = record.albumArtists[0].name || '';
      return (
        title.toLowerCase().includes(searchLower) ||
        artist.toLowerCase().includes(searchLower)
      );
    }).slice(0, 5); // Limit to 5 suggestions

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedIndex(-1);
  }, [searchTerm, recordsList]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (record) => {
    setSearchTerm(record.albumTitle);
    setShowSuggestions(false);
    // You can add additional logic here, like navigating to the album or displaying details
    console.log('Selected album:', record);
  };

  const navigateToAlbumInLibrary = (record) =>{
    navigate(`/library?search=${encodeURIComponent(record.albumTitle)}`);
    setSearchTerm("");
    setShowSuggestions(false);
    
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault();
      // Navigate to library with search term
      navigate(`/library?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
      return;
    }
  
    if (!showSuggestions) return;
  
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          // Use the selected suggestion's title for navigation
          const selectedAlbum = suggestions[selectedIndex];
          navigate(`/library?search=${encodeURIComponent(selectedAlbum.albumTitle)}`);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  const highlightMatch = (text, search) => {
    if (!search.trim()) return text;
    
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearch})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="font-semibold text-blue-600">{part}</span> : 
        part
    );
  };

  return (
    <div className="hidden md:block">
      <div ref={searchRef} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm && suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search albums by title or artist..."
            className="w-full bg-red-500 px-4 py-3 pr-10 text-gray-900 border-2 bg-white border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <svg 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {showSuggestions && (
          <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
            {suggestions.map((record, index) => (
              <div
                key={record.id}
                onClick={() => navigateToAlbumInLibrary(record)}
                className={`px-4 py-3 cursor-pointer transition ${
                  index === selectedIndex 
                    ? 'bg-blue-50 border-l-4 border-blue-500' 
                    : 'hover:bg-gray-50'
                } ${index !== suggestions.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="font-medium text-gray-900">
                  {highlightMatch(record?.albumTitle, searchTerm)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {highlightMatch(record?.albumArtists[0]?.name, searchTerm)} • {record.albumYear} • {record?.albumFormats?.[0].name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
