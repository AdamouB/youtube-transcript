
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
        "w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-2 animate-fade-in",
        isLoading && "opacity-70 pointer-events-none"
      )}
    >
      <Input
        type="text"
        placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button 
        type="submit"
        disabled={isLoading}
        className="transition-all duration-300 min-w-[140px]"
      >
        {isLoading ? 'Loading...' : 'Get Transcript'}
      </Button>
    </form>
  );
};

export default TranscriptForm;
