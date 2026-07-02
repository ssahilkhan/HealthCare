import React from 'react';
import { Apple, Droplet, Utensils, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const dailyTips = [
  "Eat a variety of colorful fruits and vegetables every day.",
  "Choose whole grains like oatmeal, brown rice, and whole-wheat bread.",
  "Stay hydrated by drinking plenty of water throughout the day.",
  "Incorporate lean proteins such as fish, chicken, beans, and lentils.",
  "Limit processed foods, sugary drinks, and excessive salt."
];

const dietPlans = [
  {
    name: "Diabetes-Friendly",
    description: "Focuses on managing blood sugar levels with balanced meals, controlled carbohydrate intake, and high-fiber foods.",
    icon: <Droplet className="h-8 w-8 text-blue-500" />,
    keyPoints: [
      "Monitor carbohydrate portions.",
      "Include non-starchy vegetables.",
      "Choose healthy fats like avocados and nuts.",
      "Regular meal timing."
    ]
  },
  {
    name: "Heart-Healthy",
    description: "Aims to reduce heart disease risk by emphasizing fruits, vegetables, whole grains, lean protein, and low-fat dairy, while limiting saturated and trans fats, cholesterol, and sodium.",
    icon: <Apple className="h-8 w-8 text-red-500" />,
    keyPoints: [
      "Rich in omega-3 fatty acids (e.g., salmon).",
      "High in fiber.",
      "Low in sodium and unhealthy fats.",
      "Portion control."
    ]
  },
  {
    name: "Low-Sodium",
    description: "Designed to help manage blood pressure and reduce fluid retention by limiting sodium intake, often found in processed foods and table salt.",
    icon: <Utensils className="h-8 w-8 text-green-500" />,
    keyPoints: [
      "Avoid processed and packaged foods.",
      "Use herbs and spices for flavor instead of salt.",
      "Read food labels for sodium content.",
      "Cook fresh meals at home."
    ]
  }
];

const recipes = [
  {
    name: "Quick Oatmeal with Berries",
    description: "A warm and nutritious breakfast to start your day.",
    ingredients: ["1/2 cup rolled oats", "1 cup water or milk", "1/2 cup mixed berries", "1 tbsp nuts (optional)"],
    instructions: "Combine oats and water/milk. Cook on stove or microwave until creamy. Top with berries and nuts."
  },
  {
    name: "Lentil Soup",
    description: "A hearty and fiber-rich soup perfect for lunch or dinner.",
    ingredients: ["1 cup red lentils", "4 cups vegetable broth", "1 onion, chopped", "2 carrots, chopped", "2 celery stalks, chopped", "Spices (cumin, turmeric)"],
    instructions: "Sauté onion, carrots, celery. Add lentils, broth, and spices. Simmer until lentils are tender (about 20-25 mins)."
  },
  {
    name: "Baked Salmon with Roasted Vegetables",
    description: "A delicious and heart-healthy dinner option.",
    ingredients: ["1 salmon fillet", "1 lb mixed vegetables (broccoli, carrots, bell peppers)", "Olive oil", "Lemon", "Herbs (dill, parsley)"],
    instructions: "Toss vegetables with olive oil and herbs, roast at 400°F (200°C) for 15 mins. Add salmon, season with lemon and herbs, bake for another 12-15 mins until cooked through."
  }
];

const NutritionPage = () => {
  const [currentTip, setCurrentTip] = React.useState(dailyTips[0]);
  const [waterIntake, setWaterIntake] = React.useState(() => {
    const savedIntake = localStorage.getItem('waterIntake');
    return savedIntake ? parseInt(savedIntake, 10) : 0;
  });
  const [lastResetDate, setLastResetDate] = React.useState(() => {
    return localStorage.getItem('waterIntakeLastReset') || new Date().toDateString();
  });


  React.useEffect(() => {
    const today = new Date().toDateString();
    if (lastResetDate !== today) {
      setWaterIntake(0);
      setLastResetDate(today);
      localStorage.setItem('waterIntake', '0');
      localStorage.setItem('waterIntakeLastReset', today);
    }
  }, [lastResetDate]);

  React.useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip(dailyTips[Math.floor(Math.random() * dailyTips.length)]);
    }, 15000); 
    return () => clearInterval(tipInterval);
  }, []);

  const addWater = () => {
    setWaterIntake(prev => {
      const newIntake = prev + 1;
      localStorage.setItem('waterIntake', newIntake.toString());
      return newIntake;
    });
  };
  
  const resetWater = () => {
    setWaterIntake(0);
    localStorage.setItem('waterIntake', '0');
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center">
          <Apple className="mr-3 h-8 w-8 text-green-500" />
          Nutrition & Diet
        </h1>
        <p className="text-gray-600 mt-1">Guidance for healthy eating habits and dietary needs.</p>
      </header>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-700">Daily Nutrition Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.p 
            key={currentTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-green-800"
          >
            {currentTip}
          </motion.p>
        </CardContent>
      </Card>

      <Tabs defaultValue="diet-plans" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diet-plans" className="text-base">Diet Plans</TabsTrigger>
          <TabsTrigger value="recipes" className="text-base">Healthy Recipes</TabsTrigger>
          <TabsTrigger value="water-tracker" className="text-base">Water Intake</TabsTrigger>
        </TabsList>

        <TabsContent value="diet-plans" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {dietPlans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-row items-center gap-3">
                    {plan.icon}
                    <CardTitle>{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 mb-3">{plan.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {plan.keyPoints.map(point => <li key={point}>{point}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <motion.div
                key={recipe.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Utensils className="mr-2 h-5 w-5 text-orange-500" />
                      {recipe.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 mb-2 text-sm">{recipe.description}</p>
                    <details>
                      <summary className="text-primary cursor-pointer text-sm">View Ingredients & Instructions</summary>
                      <div className="mt-2 text-xs space-y-1">
                        <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="water-tracker" className="mt-6">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-xl">
                <Droplet className="mr-2 h-7 w-7 text-blue-500" />
                Daily Water Intake Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-blue-600 my-6">{waterIntake} <span className="text-2xl">glasses</span></p>
              <div className="flex justify-center gap-4">
                <Button onClick={addWater} size="lg" className="bg-blue-500 hover:bg-blue-600">
                  Add a Glass (250ml)
                </Button>
                <Button onClick={resetWater} variant="outline" size="lg">
                  Reset Today
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6">Recommended: 8 glasses (2 liters) per day. Stay hydrated!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NutritionPage;