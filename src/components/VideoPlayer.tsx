import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onFollow: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isActive,
  onLike,
  onComment,
  onShare,
  onFollow,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        poster={video.thumbnailUrl}
        onClick={togglePlay}
      >
        <source src={video.videoUrl} type="video/mp4" />
      </video>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <button
            onClick={togglePlay}
            className="bg-black/30 rounded-full p-6 text-white"
          >
            <Play className="w-12 h-12 ml-1" />
          </button>
        </motion.div>
      )}

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Video Info */}
      <div className="absolute bottom-0 left-0 right-20 p-4 text-white">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={video.user.avatar}
            alt={video.user.displayName}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{video.user.username}</span>
              {video.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}
            </div>
            <button
              onClick={onFollow}
              className={`text-sm px-4 py-1 rounded-full border-2 mt-1 ${
                video.isFollowing
                  ? 'border-gray-400 text-gray-400'
                  : 'border-white text-white'
              }`}
            >
              {video.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        <p className="text-sm mb-2">{video.description}</p>
        
        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {video.hashtags.map((tag, index) => (
            <span key={index} className="text-sm text-blue-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Music */}
        <div className="flex items-center gap-2 text-sm opacity-80">
          <Music className="w-4 h-4" />
          <span>Original Audio - {video.user.username}</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-6">
        {/* Like */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onLike}
          className="flex flex-col items-center gap-1 text-white"
        >
          <div className={`p-3 rounded-full ${video.isLiked ? 'bg-red-500' : 'bg-black/30'}`}>
            <Heart
              className={`w-6 h-6 ${video.isLiked ? 'fill-white' : ''}`}
            />
          </div>
          <span className="text-xs">{formatNumber(video.likes)}</span>
        </motion.button>

        {/* Comment */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onComment}
          className="flex flex-col items-center gap-1 text-white"
        >
          <div className="p-3 rounded-full bg-black/30">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-xs">{formatNumber(video.comments)}</span>
        </motion.button>

        {/* Share */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onShare}
          className="flex flex-col items-center gap-1 text-white"
        >
          <div className="p-3 rounded-full bg-black/30">
            <Share className="w-6 h-6" />
          </div>
          <span className="text-xs">{formatNumber(video.shares)}</span>
        </motion.button>

        {/* Mute/Unmute */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="flex flex-col items-center gap-1 text-white"
        >
          <div className="p-3 rounded-full bg-black/30">
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default VideoPlayer;
