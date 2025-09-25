import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, Plus, Heart, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'create', icon: Plus, label: 'Create' },
    { id: 'inbox', icon: Heart, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-2 py-2 z-50">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCreate = tab.id === 'create';

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 ${
                isCreate ? 'relative' : ''
              }`}
            >
              {isCreate ? (
                <div className="w-12 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              ) : (
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}
                />
              )}
              {!isCreate && (
                <span
                  className={`text-xs ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
