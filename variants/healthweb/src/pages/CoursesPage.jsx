import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Filter, Search, ArrowRight, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCourses } from '@/hooks/useCourses'; 

const CourseCard = ({ course }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 card-hover-pop">
      <div className="relative h-48 bg-gray-200">
        <img  
          alt={course.title} 
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1581726690015-c9861fa5057f" />
        <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 text-xs rounded font-semibold">
          {course.category}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-poppins">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-2 font-inter line-clamp-3">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <BookOpen size={16} className="mr-1 text-primary" /> {course.lessons_count} Lessons
          <Star size={16} className="ml-3 mr-1 text-yellow-400 fill-yellow-400" /> {course.rating?.toFixed(1) || 'N/A'}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/courses/${course.id}`}>
            View Course <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);


const CoursesPage = () => {
  const { courses, isLoading, error } = useCourses();

  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-white font-poppins">Our Courses</h1>
        <p className="text-lg text-blue-100 mt-2 font-inter">Expand your knowledge with our diverse range of courses.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative flex-grow w-full md:w-auto">
          <Input type="search" placeholder="Search courses..." className="pl-10 pr-4 py-3 text-base w-full" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>
      
      {isLoading && <p className="text-center text-lg">Loading courses...</p>}
      {error && <p className="text-center text-red-500 text-lg">Error loading courses: {error}</p>}
      
      {!isLoading && !error && courses.length === 0 && (
        <div className="text-center py-10">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Courses Found</h2>
          <p className="text-gray-600">We are constantly adding new courses. Please check back soon!</p>
        </div>
      )}

      {!isLoading && !error && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;