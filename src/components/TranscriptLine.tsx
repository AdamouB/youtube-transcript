
import { useState } from 'react';
import { Play, Lightbulb, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import ActionButton from './ActionButton';

export interface TranscriptSegment {
  id: string;
  text: string;
  start: number;
  duration: number;
}

interface TranscriptLineProps {
  segment: TranscriptSegment;
  showTimestamps: boolean;
  isActive?: boolean;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const TranscriptLine = ({ segment, showTimestamps, isActive = false }: TranscriptLineProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleJumpTo = () => {
    // This would link to the YouTube video at the specific timestamp
    toast.info(`Jump to ${formatTime(segment.start)}`);
  };
  
  const handleAddNote = () => {
    toast.info('Note feature will be available in a future update');
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(segment.text);
    toast.success('Text copied to clipboard!');
  };

  return (
    <div 
      className={cn(
        "group transcript-line flex items-start gap-3 p-3 rounded-md hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-200",
        isActive && "bg-white/30 dark:bg-gray-800/30 border-l-4 border-primary"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showTimestamps && (
        <div className="timestamp min-w-[60px] font-mono bg-secondary/70 rounded px-2 py-1 text-center">
          {formatTime(segment.start)}
        </div>
      )}
      
      <div className="flex-1 text-left leading-relaxed">{segment.text}</div>
      
      {(isHovered || isActive) && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ActionButton
            icon={<Lightbulb className="h-3.5 w-3.5" />}
            label="Add Note"
            onClick={handleAddNote}
            size="sm"
            className="h-7 w-7 bg-white/80 dark:bg-gray-800/80"
            variant="outline"
          />
          <ActionButton
            icon={<Play className="h-3.5 w-3.5" />}
            label="Jump to Timestamp"
            onClick={handleJumpTo}
            size="sm"
            className="h-7 w-7 bg-white/80 dark:bg-gray-800/80"
            variant="outline"
          />
          <ActionButton
            icon={<Copy className="h-3.5 w-3.5" />}
            label="Copy Text"
            onClick={handleCopy}
            size="sm"
            className="h-7 w-7 bg-white/80 dark:bg-gray-800/80"
            variant="outline"
          />
        </div>
      )}
    </div>
  );
};

export default TranscriptLine;
