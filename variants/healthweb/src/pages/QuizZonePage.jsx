import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Filter, Search, ArrowRight, CheckSquare, BarChart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useQuizzes } from '@/hooks/useQuizzes';

const QuizCard = ({ quiz }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 card-hover-pop">
       <div className="relative h-40 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-4">
        <HelpCircle className="h-16 w-16 text-white/80" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-poppins line-clamp-2">{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-2 font-inter">Category: {quiz.category}</p>
        <p className="text-sm text-gray-600 mb-2 font-inter line-clamp-2">{quiz.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <CheckSquare size={16} className="mr-1 text-primary" /> {quiz.questions_count} Questions
          <BarChart size={16} className="ml-3 mr-1 text-green-500" /> Difficulty: {quiz.difficulty}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
          <Link to={`/quiz-zone/${quiz.id}`}>
            Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const QuizZonePage = () => {
  const { quizzes, isLoading, error } = useQuizzes();

  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-white font-poppins">Quiz Zone</h1>
        <p className="text-lg text-yellow-100 mt-2 font-inter">Test your knowledge and track your progress with our interactive quizzes.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative flex-grow w-full md:w-auto">
          <Input type="search" placeholder="Search quizzes..." className="pl-10 pr-4 py-3 text-base w-full" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      {isLoading && <p className="text-center text-lg">Loading quizzes...</p>}
      {error && <p className="text-center text-red-500 text-lg">Error loading quizzes: {error}</p>}

      {!isLoading && !error && quizzes.length === 0 && (
        <div className="text-center py-10">
          <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Quizzes Found</h2>
          <p className="text-gray-600">More quizzes are on the way. Keep an eye out!</p>
        </div>
      )}

      {!isLoading && !error && quizzes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizZonePage;