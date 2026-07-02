import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Filter, Search, Download, Book, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEbooks } from '@/hooks/useEbooks';

const EbookCard = ({ ebook }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 card-hover-pop">
      <div className="relative h-64 bg-gray-200 flex items-center justify-center p-4">
        <img  
          alt={ebook.title} 
          className="max-h-full max-w-full object-contain"
         src="https://images.unsplash.com/photo-1652717492938-82920653e04b" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-poppins line-clamp-2">{ebook.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-1 font-inter">By {ebook.author}</p>
        <p className="text-sm text-gray-500 mb-2 font-inter">Category: {ebook.category}</p>
        <p className="text-sm text-gray-600 font-inter line-clamp-3">{ebook.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
          <a href={ebook.download_url} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" /> Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const EbooksPage = () => {
  const { ebooks, isLoading, error } = useEbooks();

  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-white font-poppins">E-books Library</h1>
        <p className="text-lg text-purple-100 mt-2 font-inter">Read and download from our collection of educational e-books.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative flex-grow w-full md:w-auto">
          <Input type="search" placeholder="Search e-books..." className="pl-10 pr-4 py-3 text-base w-full" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      {isLoading && <p className="text-center text-lg">Loading e-books...</p>}
      {error && <p className="text-center text-red-500 text-lg">Error loading e-books: {error}</p>}

      {!isLoading && !error && ebooks.length === 0 && (
        <div className="text-center py-10">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No E-books Found</h2>
          <p className="text-gray-600">Our library is growing. Please check back soon for new e-books!</p>
        </div>
      )}

      {!isLoading && !error && ebooks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ebooks.map(ebook => (
            <EbookCard key={ebook.id} ebook={ebook} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EbooksPage;