import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Filter, Search, ArrowRight, Clock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useVideos } from '@/hooks/useVideos';

const VideoCard = ({ video }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 card-hover-pop">
      <div className="relative aspect-video bg-gray-200">
        <img  
          alt={video.title} 
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1495488170890-ee9e49ff335d" />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
          {video.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-16 w-16 text-white/80 hover:text-white transition-colors" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-poppins line-clamp-2">{video.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-2 font-inter line-clamp-3">{video.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <User size={16} className="mr-1 text-primary" /> {video.instructor}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={video.video_url} target="_blank" rel="noopener noreferrer">
            Watch Video <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const VideoTutorialsPage = () => {
  const { videos, isLoading, error } = useVideos();

  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-gradient-to-r from-green-500 to-secondary rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-white font-poppins">Video Tutorials</h1>
        <p className="text-lg text-green-100 mt-2 font-inter">Learn visually with our expert-led video tutorials.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative flex-grow w-full md:w-auto">
          <Input type="search" placeholder="Search videos..." className="pl-10 pr-4 py-3 text-base w-full" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      {isLoading && <p className="text-center text-lg">Loading videos...</p>}
      {error && <p className="text-center text-red-500 text-lg">Error loading videos: {error}</p>}
      
      {!isLoading && !error && videos.length === 0 && (
        <div className="text-center py-10">
          <PlayCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Videos Found</h2>
          <p className="text-gray-600">We are working on adding new video tutorials. Please check back soon!</p>
        </div>
      )}

      {!isLoading && !error && videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoTutorialsPage;