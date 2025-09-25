import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, UserPlus, Users } from 'lucide-react';
import { generateMockUsers } from '../utils/mockData';

const InboxPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications] = useState(() => {
    const users = generateMockUsers(15);
    return [
      { id: '1', type: 'like', user: users[0], content: 'liked your video', time: '2m ago', videoThumbnail: 'https://picsum.photos/100/100?random=1' },
      { id: '2', type: 'follow', user: users[1], content: 'started following you', time: '5m ago' },
      { id: '3', type: 'comment', user: users[2], content: 'commented: "Amazing content! 🔥"', time: '10m ago', videoThumbnail: 'https://picsum.photos/100/100?random=2' },
      { id: '4', type: 'like', user: users[3], content: 'liked your video', time: '15m ago', videoThumbnail: 'https://picsum.photos/100/100?random=3' },
      { id: '5', type: 'follow', user: users[4], content: 'started following you', time: '30m ago' },
      { id: '6', type: 'comment', user: users[5], content: 'commented: "Love this! 😍"', time: '1h ago', videoThumbnail: 'https://picsum.photos/100/100?random=4' },
      { id: '7', type: 'like', user: users[6], content: 'liked your video', time: '2h ago', videoThumbnail: 'https://picsum.photos/100/100?random=5' },
      { id: '8', type: 'mention', user: users[7], content: 'mentioned you in a comment', time: '3h ago', videoThumbnail: 'https://picsum.photos/100/100?random=6' },
    ];
  });

  const tabs = [
    { id: 'all', label: 'All Activity', icon: Heart },
    { id: 'likes', label: 'Likes', icon: Heart },
    { id: 'comments', label: 'Comments', icon: MessageCircle },
    { id: 'followers', label: 'Followers', icon: UserPlus },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow': return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'mention': return <MessageCircle className="w-5 h-5 text-purple-500" />;
      default: return <Heart className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => {
        if (activeTab === 'likes') return n.type === 'like';
        if (activeTab === 'comments') return n.type === 'comment' || n.type === 'mention';
        if (activeTab === 'followers') return n.type === 'follow';
        return true;
      });

  return (
    <div className="bg-black min-h-screen pt-20 pb-20">
      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4">
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg"
            >
              {/* User Avatar with Notification Icon */}
              <div className="relative">
                <img
                  src={notification.user.avatar}
                  alt={notification.user.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-1">
                  {getIcon(notification.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium text-sm">{notification.user.username}</span>
                  {notification.user.verified && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-sm">{notification.content}</p>
                <span className="text-gray-500 text-xs">{notification.time}</span>
              </div>

              {/* Video Thumbnail or Follow Button */}
              {notification.videoThumbnail ? (
                <img
                  src={notification.videoThumbnail}
                  alt="Video thumbnail"
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : notification.type === 'follow' ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  Follow Back
                </motion.button>
              ) : null}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-gray-400 text-center">
              When people interact with your videos, you'll see it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
