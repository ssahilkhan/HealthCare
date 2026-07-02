import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'; 
import { Sun, Moon, Contrast, Volume2, MessageSquare } from 'lucide-react';

const AccessibilitySettings = () => {
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('fontSize') || '16', 10);
  });
  const [colorMode, setColorMode] = useState(() => {
    return localStorage.getItem('colorMode') || 'light';
  });
  const [voiceAssistant, setVoiceAssistant] = useState(() => {
    return JSON.parse(localStorage.getItem('voiceAssistant') || 'false');
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'high-contrast');
    document.documentElement.classList.add(colorMode);
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);
  
  useEffect(() => {
    localStorage.setItem('voiceAssistant', JSON.stringify(voiceAssistant));
  }, [voiceAssistant]);

  const handleFontSizeChange = (value) => {
    setFontSize(value[0]);
  };

  const toggleColorMode = (mode) => {
    setColorMode(mode);
  };
  
  const toggleVoiceAssistant = () => {
    setVoiceAssistant(prev => !prev);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center">
          <MessageSquare className="mr-2 h-6 w-6 text-primary" />
          Accessibility
        </CardTitle>
        <CardDescription>Adjust settings for better readability and interaction.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="font-size-slider" className="text-lg">Font Size</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="font-size-slider"
              min={12}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={handleFontSizeChange}
              className="w-full"
              aria-label={`Font size ${fontSize} pixels`}
            />
            <span className="text-lg w-10 text-right">{fontSize}px</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-lg">Color Mode</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button 
              variant={colorMode === 'light' ? 'default' : 'outline'} 
              onClick={() => toggleColorMode('light')}
              className="flex items-center justify-center py-3 text-base"
              aria-pressed={colorMode === 'light'}
            >
              <Sun className="mr-2 h-5 w-5" /> Light
            </Button>
            <Button 
              variant={colorMode === 'dark' ? 'default' : 'outline'} 
              onClick={() => toggleColorMode('dark')}
              className="flex items-center justify-center py-3 text-base"
              aria-pressed={colorMode === 'dark'}
            >
              <Moon className="mr-2 h-5 w-5" /> Dark
            </Button>
            <Button 
              variant={colorMode === 'high-contrast' ? 'default' : 'outline'} 
              onClick={() => toggleColorMode('high-contrast')}
              className="flex items-center justify-center py-3 text-base"
              aria-pressed={colorMode === 'high-contrast'}
            >
              <Contrast className="mr-2 h-5 w-5" /> High Contrast
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label className="text-lg">Voice Assistant</Label>
           <div className="flex items-center justify-between p-4 border rounded-lg">
             <div className="flex items-center">
               <Volume2 className="mr-3 h-6 w-6 text-primary" />
               <span className="text-base">Enable Voice Assistant</span>
             </div>
            <Button 
                variant={voiceAssistant ? 'default' : 'outline'} 
                onClick={toggleVoiceAssistant}
                aria-pressed={voiceAssistant}
            >
                {voiceAssistant ? 'Enabled' : 'Disabled'}
            </Button>
           </div>
           <p className="text-sm text-gray-500">
             Allows interaction with the app using voice commands (feature coming soon).
           </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;