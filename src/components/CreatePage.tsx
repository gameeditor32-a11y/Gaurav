import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Music, Sparkles, Palette, Clock, Users, X } from 'lucide-react';

const CreatePage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [showFilters, setShowFilters] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const durations = [15, 30, 60, 120];
  const filters = [
    { name: 'Normal', color: 'transparent' },
    { name: 'Warm', color: 'sepia(1)' },
    { name: 'Cool', color: 'hue-rotate(180deg)' },
    { name: 'Vintage', color: 'contrast(1.2) sepia(0.3)' },
    { name: 'Dramatic', color: 'contrast(1.5) saturate(1.3)' },
  ];

  const effects = [
    { name: 'Beauty', icon: Sparkles },
    { name: 'Filters', icon: Palette },
    { name: 'Music', icon: Music },
    { name: 'Timer', icon: Clock },
  ];

  const startRecording = () => {
    setIsRecording(true);
    // Start recording logic here
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= selectedDuration) {
          stopRecording();
          clearInterval(interval);
          return selectedDuration;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black min-h-screen pt-20 pb-20 relative overflow-hidden">
      {/* Camera View */}
      <div className="relative h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />
        
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-black/50 rounded-full"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
          
          <div className="flex gap-2">
            {durations.map((duration) => (
              <motion.button
                key={duration}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDuration(duration)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedDuration === duration
                    ? 'bg-white text-black'
                    : 'bg-black/50 text-white'
                }`}
              >
                {duration}s
              </motion.button>
            ))}
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-black/50 rounded-full"
          >
            <Camera className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Recording Timer */}
        {isRecording && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="font-mono">{formatTime(recordingTime)}</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isRecording && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/30 z-10">
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(recordingTime / selectedDuration) * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        {/* Side Effects Panel */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex flex-col gap-4">
            {effects.map((effect) => {
              const Icon = effect.icon;
              return (
                <motion.button
                  key={effect.name}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (effect.name === 'Filters') setShowFilters(!showFilters);
                  }}
                  className="p-3 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 z-20"
          >
            <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 space-y-3">
              {filters.map((filter, index) => (
                <motion.button
                  key={filter.name}
                  whileTap={{ scale: 0.95 }}
                  className="block w-16 h-16 rounded-lg bg-gray-700 overflow-hidden"
                  style={{ filter: filter.color }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500" />
                  <span className="text-white text-xs mt-1 block">{filter.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="flex items-center justify-center gap-8">
            {/* Upload */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-gray-700 rounded-full"
            >
              <div className="w-8 h-8 bg-white rounded" />
            </motion.button>

            {/* Record Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center ${
                isRecording ? 'bg-red-500' : 'bg-transparent'
              }`}
            >
              {isRecording ? (
                <div className="w-8 h-8 bg-white rounded" />
              ) : (
                <div className="w-16 h-16 bg-red-500 rounded-full" />
              )}
            </motion.button>

            {/* Switch Camera */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-gray-700 rounded-full"
            >
              <Video className="w-8 h-8 text-white" />
            </motion.button>
          </div>

          {/* Create Options */}
          <div className="flex justify-center gap-6 mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <Users className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Duet</span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <Video className="w-4 h-4 text-white" />
              <span className="text-white text-sm">React</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
