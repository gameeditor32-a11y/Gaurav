import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Bookmark, Heart, Share, MoreHorizontal, Settings } from 'lucide-react';
import { generateMockVideos } from '../utils/mockData';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [userVideos] = useState(generateMockVideos(9));
  
  const user = {
    id: '1',
    username: 'your_username',
    displayName: 'Your Name',
    avatar: 'https://picsum.photos/150/150?random=999',
    followers: 128500,
    following: 450,
    likes: 2500000,
    verified: true,
    bio: '✨ Content Creator ✨\n🎬 Making videos daily\n📧 contact@example.com',
  };

  const tabs = [
    { id: 'videos', label: 'Videos', icon: Grid },
    { id: 'liked', label: 'Liked', icon: Heart },
    { id: 'saved', label: 'Saved', icon: Bookmark },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-black min-h-screen pt-20 pb-20">
      {/* Header */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-xl font-bold">{user.username}</h1>
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2"
            >
              <MoreHorizontal className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2"
            >
              <Settings className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-white text-lg font-semibold">{user.displayName}</h2>
              {user.verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}
            </div>
            
            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-white font-semibold">{formatNumber(user.following)}</div>
                <div className="text-gray-400 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">{formatNumber(user.followers)}</div>
                <div className="text-gray-400 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">{formatNumber(user.likes)}</div>
                <div className="text-gray-400 text-sm">Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <p className="text-white text-sm whitespace-pre-line">{user.bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-medium"
          >
            Edit Profile
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-medium"
          >
            Share Profile
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-4 bg-gray-800 text-white py-3 rounded-lg"
          >
            <Share className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="flex border-b border-gray-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 ${
                  isActive
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-4">
        {activeTab === 'videos' && (
          <div className="grid grid-cols-3 gap-1">
            {userVideos.map((video) => (
              <motion.div
                key={video.id}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-[3/4] bg-gray-900 rounded-lg overflow-hidden"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1" />
                  </div>
                </div>

                {/* Views */}
                <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                  👁️ {formatNumber(video.views)}
                </div>

                {/* Duration */}
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-1 py-0.5 rounded">
                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {(activeTab === 'liked' || activeTab === 'saved') && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              {activeTab === 'liked' ? (
                <Heart className="w-8 h-8 text-gray-500" />
              ) : (
                <Bookmark className="w-8 h-8 text-gray-500" />
              )}
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">
              {activeTab === 'liked' ? 'No liked videos yet' : 'No saved videos yet'}
            </h3>
            <p className="text-gray-400 text-center">
              {activeTab === 'liked' 
                ? 'Videos you like will appear here.'
                : 'Videos you save will appear here.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
