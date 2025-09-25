import { faker } from '@faker-js/faker';
import { User, Video, Comment, LiveStream } from '../types';

// Generate mock users
export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    displayName: faker.person.fullName(),
    avatar: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`,
    followers: faker.number.int({ min: 100, max: 1000000 }),
    following: faker.number.int({ min: 50, max: 5000 }),
    verified: faker.datatype.boolean({ probability: 0.1 }),
    bio: faker.lorem.sentence(),
  }));
};

// Generate mock videos
export const generateMockVideos = (count: number): Video[] => {
  const users = generateMockUsers(count);
  const hashtags = ['#viral', '#trending', '#funny', '#dance', '#music', '#comedy', '#art', '#food', '#travel', '#lifestyle'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: faker.string.uuid(),
    user: users[index],
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    videoUrl: `https://sample-videos.com/zip/10/mp4/SampleVideo_${Math.floor(Math.random() * 5) + 1}280x720_1mb.mp4`,
    thumbnailUrl: `https://picsum.photos/400/600?random=${Math.floor(Math.random() * 1000)}`,
    likes: faker.number.int({ min: 10, max: 100000 }),
    comments: faker.number.int({ min: 5, max: 5000 }),
    shares: faker.number.int({ min: 1, max: 10000 }),
    views: faker.number.int({ min: 100, max: 1000000 }),
    duration: faker.number.int({ min: 15, max: 180 }),
    createdAt: faker.date.recent().toISOString(),
    hashtags: faker.helpers.arrayElements(hashtags, { min: 1, max: 4 }),
    isLiked: faker.datatype.boolean({ probability: 0.3 }),
    isFollowing: faker.datatype.boolean({ probability: 0.2 }),
  }));
};

// Generate mock comments
export const generateMockComments = (count: number): Comment[] => {
  const users = generateMockUsers(count);
  
  return Array.from({ length: count }, (_, index) => ({
    id: faker.string.uuid(),
    user: users[index],
    text: faker.lorem.sentence(),
    likes: faker.number.int({ min: 0, max: 1000 }),
    createdAt: faker.date.recent().toISOString(),
  }));
};

// Generate mock live streams
export const generateMockLiveStreams = (count: number): LiveStream[] => {
  const users = generateMockUsers(count);
  
  return Array.from({ length: count }, (_, index) => ({
    id: faker.string.uuid(),
    user: users[index],
    title: faker.lorem.words(4),
    viewers: faker.number.int({ min: 10, max: 50000 }),
    duration: faker.number.int({ min: 300, max: 7200 }),
    thumbnailUrl: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`,
    isLive: true,
  }));
};
