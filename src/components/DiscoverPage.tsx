import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Music, Hash, Users } from 'lucide-react';
import { generateMockVideos, generateMockLiveStreams } from '../utils/mockData';

const DiscoverPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('trending');
  const [trendingVideos] = useState(generateMockVideos(12));
  const [liveStreams] = useState(generateMockLiveStreams(6));

  const categories = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'hashtags', label: 'Hashtags', icon: Hash },
    { id: 'live', label: 'Live', icon: Users },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-black min-h-screen pt-20 pb-20">
      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search videos, users, sounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content Based on Category */}
      {activeCategory === 'trending' && (
        <div className="px-4">
          <h2 className="text-white text-lg font-semibold mb-4">Trending Videos</h2>
          <div className="grid grid-cols-2 gap-3">
            {trendingVideos.map((video) => (
              <motion.div
                key={video.id}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gray-900 rounded-lg overflow-hidden aspect-[3/4]"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Video Stats */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-sm font-medium line-clamp-2 mb-1">
                    {video.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-300">
                    <span>❤️ {formatNumber(video.likes)}</span>
                    <span>👁️ {formatNumber(video.views)}</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeCategory === 'live' && (
        <div className="px-4">
          <h2 className="text-white text-lg font-semibold mb-4">Live Streams</h2>
          <div className="space-y-4">
            {liveStreams.map((stream) => (
              <motion.div
                key={stream.id}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-gray-900 rounded-lg p-3"
              >
                <div className="relative">
                  <img
                    src={stream.thumbnailUrl}
                    alt={stream.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    LIVE
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={stream.user.avatar}
                      alt={stream.user.displayName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-white font-medium text-sm">{stream.user.username}</span>
                    {stream.user.verified && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-1">{stream.title}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                    <span>👥 {formatNumber(stream.viewers)} watching</span>
                    <span>🕐 {Math.floor(stream.duration / 60)}m</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeCategory === 'music' && (
        <div className="px-4">
          <h2 className="text-white text-lg font-semibold mb-4">Trending Sounds</h2>
          <div className="space-y-3">
            {['Original Audio - @username1', 'Viral Dance Beat', 'Comedy Sound Effect', 'Trending Song 2025'].map((sound, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-gray-900 rounded-lg p-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{sound}</p>
                  <p className="text-gray-400 text-sm">{Math.floor(Math.random() * 100) + 10}K videos</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  Use
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeCategory === 'hashtags' && (
        <div className="px-4">
          <h2 className="text-white text-lg font-semibold mb-4">Trending Hashtags</h2>
          <div className="space-y-3">
            {['#viral', '#trending', '#fyp', '#dance', '#comedy', '#music', '#art', '#food'].map((hashtag, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between bg-gray-900 rounded-lg p-4"
              >
                <div>
                  <p className="text-purple-400 font-medium text-lg">{hashtag}</p>
                  <p className="text-gray-400 text-sm">{Math.floor(Math.random() * 500) + 100}M views</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Hash className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
