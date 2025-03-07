
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Youtube, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const HeroSection = ({ onSubmit, isLoading }: HeroSectionProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <section className="w-full pt-10 pb-16 px-5">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Transcript To Go
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Extract, search, and utilize YouTube video transcripts in seconds. The ultimate tool for content creators, researchers, and professionals.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto glass-panel p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-800/30"
        >
          <div className="relative mb-4">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
              <Youtube className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Paste YouTube URL (e.g., https://www.youtube.com/watch?v=example)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 h-12 focus:ring-2 focus:ring-primary bg-white/80 dark:bg-gray-800/80 shadow-inner"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              type="submit"
              disabled={isLoading || !url.trim()}
              className="transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 h-11 text-base font-medium flex-1"
            >
              {isLoading ? 'Processing...' : 'Extract Transcript'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline"
              onClick={() => window.location.href = '/bulk'}
              className="h-11"
            >
              <span>Bulk Extract</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground">
            Free, fast, and reliable transcript extraction with no artificial limitations.
          </div>
        </motion.form>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 pt-8"
        >
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">Free Service</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-sm text-muted-foreground">Export Formats</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground">No Limits</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
