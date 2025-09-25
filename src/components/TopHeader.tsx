import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search } from 'lucide-react';

interface TopHeaderProps {
  activeTab: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ activeTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'home': return 'For You';
      case 'discover': return 'Discover';
      case 'create': return 'Create';
      case 'inbox': return 'Inbox';
      case 'profile': return 'Profile';
      default: return 'VidShare';
    }
  };

  if (activeTab === 'home') {
    return (
      <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 text-lg"
            >
              Following
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-white text-lg font-semibold"
            >
              For You
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 text-lg"
            >
              Live
            </motion.button>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2"
            >
              <Search className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 relative"
            >
              <Bell className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 z-40 px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">{getTitle()}</h1>
        
        {activeTab === 'discover' && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2"
          >
            <Search className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
