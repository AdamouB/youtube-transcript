
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
        "group transcript-line flex items-start gap-2",
        isActive && "transcript-line-active"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showTimestamps && (
        <div className="timestamp min-w-[50px] pt-0.5 select-none">
          {formatTime(segment.start)}
        </div>
      )}
      
      <div className="flex-1 text-left">{segment.text}</div>
      
      {(isHovered || isActive) && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ActionButton
            icon={<Lightbulb className="h-3.5 w-3.5 opacity-70" />}
            label="Add Note"
            onClick={handleAddNote}
            size="sm"
            className="h-7 w-7"
          />
          <ActionButton
            icon={<Play className="h-3.5 w-3.5 opacity-70" />}
            label="Jump to Timestamp"
            onClick={handleJumpTo}
            size="sm"
            className="h-7 w-7"
          />
          <ActionButton
            icon={<Copy className="h-3.5 w-3.5 opacity-70" />}
            label="Copy Text"
            onClick={handleCopy}
            size="sm"
            className="h-7 w-7"
          />
        </div>
      )}
    </div>
  );
};

export default TranscriptLine;
