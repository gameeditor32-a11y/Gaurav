import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import BottomNavigation from './components/BottomNavigation';
import VideoFeed from './components/VideoFeed';
import DiscoverPage from './components/DiscoverPage';
import CreatePage from './components/CreatePage';
import InboxPage from './components/InboxPage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'discover':
        return <DiscoverPage />;
      case 'create':
        return <CreatePage />;
      case 'inbox':
        return <InboxPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <VideoFeed />;
    }
  };

  return (
    <Router>
      <div className="bg-black min-h-screen relative overflow-hidden">
        <TopHeader activeTab={activeTab} />
        
        <main className="relative z-10">
          {renderContent()}
        </main>
        
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>
    </Router>
  );
}

export default App;
