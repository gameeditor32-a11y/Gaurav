import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from './VideoPlayer';
import { Video } from '../types';
import { generateMockVideos } from '../utils/mockData';

const VideoFeed: React.FC = () => {
  const [videos] = useState<Video[]>(generateMockVideos(10));
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentVideoIndex]);

  const handleLike = (index: number) => {
    console.log('Liked video:', videos[index].id);
  };

  const handleComment = (index: number) => {
    console.log('Comment on video:', videos[index].id);
  };

  const handleShare = (index: number) => {
    console.log('Share video:', videos[index].id);
  };

  const handleFollow = (index: number) => {
    console.log('Follow user:', videos[index].user.id);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      style={{ scrollBehavior: 'smooth' }}
    >
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          className="h-screen snap-start snap-always"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <VideoPlayer
            video={video}
            isActive={index === currentVideoIndex}
            onLike={() => handleLike(index)}
            onComment={() => handleComment(index)}
            onShare={() => handleShare(index)}
            onFollow={() => handleFollow(index)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default VideoFeed;
