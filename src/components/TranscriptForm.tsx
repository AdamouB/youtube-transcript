
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Youtube } from 'lucide-react';

interface TranscriptFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const TranscriptForm = ({ onSubmit, isLoading }: TranscriptFormProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a YouTube URL');
      return;
    }
    
    // Simple validation for YouTube URLs
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(url)) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }
    
    onSubmit(url);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 animate-fade-in p-5 glass-panel shadow-md rounded-xl",
        isLoading && "opacity-70 pointer-events-none"
      )}
    >
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
          <Youtube className="h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="pl-10 h-12 focus:ring-2 focus:ring-primary bg-white/80 dark:bg-gray-800/80 shadow-inner"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit"
        disabled={isLoading}
        className="transition-all duration-300 min-w-[160px] h-12 text-base font-medium bg-primary hover:bg-primary/90"
      >
        {isLoading ? 'Loading...' : 'Get Transcript'}
      </Button>
    </form>
  );
};

export default TranscriptForm;
