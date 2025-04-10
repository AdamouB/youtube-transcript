
import { useState, useEffect, useRef } from 'react';
import { TranscriptSegment } from './TranscriptLine';
import TranscriptLine from './TranscriptLine';
import SearchBar from './SearchBar';
import { Copy, EllipsisVertical, ArrowDown, ArrowUp, PlayCircle, PauseCircle, SkipForward, SkipBack } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import ActionButton from './ActionButton';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface TranscriptViewerProps {
  segments: TranscriptSegment[];
  showTimestamps: boolean;
  isEditMode?: boolean;
}

const TranscriptViewer = ({ segments, showTimestamps, isEditMode = false }: TranscriptViewerProps) => {
  const [filteredSegments, setFilteredSegments] = useState<TranscriptSegment[]>(segments);
  const [searchTerm, setSearchTerm] = useState('');
  const [autoScroll, setAutoScroll] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState<number | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [editedSegments, setEditedSegments] = useLocalStorage<Record<string, string>>('edited-segments', {});
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const playbackTimerRef = useRef<number | null>(null);

  // Removed visibleRange state and loadingMore state since we're showing all segments now

  useEffect(() => {
    if (searchTerm) {
      const filtered = segments.map(segment => {
        // If segment has been edited, we'll use the edited version for search
        const text = editedSegments[segment.id] || segment.text;
        return {
          ...segment,
          text: editedSegments[segment.id] || segment.text
        };
      }).filter(segment => 
        segment.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSegments(filtered);
    } else {
      // Apply any edits to the segments
      setFilteredSegments(segments.map(segment => ({
        ...segment,
        text: editedSegments[segment.id] || segment.text
      })));
    }
  }, [searchTerm, segments, editedSegments]);

  // Apply auto-scrolling playback
  useEffect(() => {
    if (isPlaying && currentSegmentIndex !== null) {
      // Clear any existing timer
      if (playbackTimerRef.current) {
        window.clearTimeout(playbackTimerRef.current);
      }

      // Set up a timer to move to the next segment
      const currentSegment = filteredSegments[currentSegmentIndex];
      if (currentSegment) {
        playbackTimerRef.current = window.setTimeout(() => {
          if (currentSegmentIndex < filteredSegments.length - 1) {
            setCurrentSegmentIndex(prev => {
              const nextIndex = prev !== null ? prev + 1 : 0;
              scrollToSegment(nextIndex);
              return nextIndex;
            });
          } else {
            // Reached the end of the transcript
            setIsPlaying(false);
            setCurrentSegmentIndex(null);
          }
        }, currentSegment.duration * 1000);
      }
    }

    return () => {
      if (playbackTimerRef.current) {
        window.clearTimeout(playbackTimerRef.current);
      }
    };
  }, [isPlaying, currentSegmentIndex, filteredSegments]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCopyTranscript = () => {
    const fullText = filteredSegments.map(segment => editedSegments[segment.id] || segment.text).join(' ');
    navigator.clipboard.writeText(fullText);
    toast.success('Full transcript copied to clipboard!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'YouTube Transcript',
        text: 'Check out this transcript I found!',
        url: window.location.href,
      }).catch(() => {
        toast.info('Sharing canceled');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    const fullText = filteredSegments.map(segment => editedSegments[segment.id] || segment.text).join('\n\n');
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Transcript downloaded successfully!');
  };

  const handleScrollToTop = () => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      // Start playing from the beginning if no current segment
      setCurrentSegmentIndex(prev => prev !== null ? prev : 0);
      setIsPlaying(true);
      if (currentSegmentIndex !== null) {
        scrollToSegment(currentSegmentIndex);
      }
    } else {
      // Pause playback
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentSegmentIndex === null || currentSegmentIndex >= filteredSegments.length - 1) {
      setCurrentSegmentIndex(0);
    } else {
      setCurrentSegmentIndex(currentSegmentIndex + 1);
    }
    scrollToSegment(currentSegmentIndex !== null && currentSegmentIndex < filteredSegments.length - 1 ? 
      currentSegmentIndex + 1 : 0);
  };

  const handlePrevious = () => {
    if (currentSegmentIndex === null || currentSegmentIndex <= 0) {
      setCurrentSegmentIndex(filteredSegments.length - 1);
    } else {
      setCurrentSegmentIndex(currentSegmentIndex - 1);
    }
    scrollToSegment(currentSegmentIndex !== null && currentSegmentIndex > 0 ? 
      currentSegmentIndex - 1 : filteredSegments.length - 1);
  };

  const scrollToSegment = (index: number) => {
    setIsAutoScrolling(true);
    setTimeout(() => {
      const element = document.getElementById(`segment-${filteredSegments[index]?.id}`);
      if (element && scrollAreaRef.current) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setIsAutoScrolling(false);
    }, 100);
  };

  const handleUpdateSegment = (id: string, newText: string) => {
    const updatedSegments = { ...editedSegments, [id]: newText };
    setEditedSegments(updatedSegments);
  };

  return (
    <div className="w-full flex flex-col glass-panel shadow-lg rounded-2xl animate-scale-in p-5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="flex items-center gap-2">
          <ActionButton
            icon={<Copy className="h-4 w-4" />}
            label="Copy Transcript"
            onClick={handleCopyTranscript}
            variant="outline"
            className="bg-white/90 dark:bg-gray-800/90"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white/90 dark:bg-gray-800/90 rounded-xl">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md">
              <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
                Share Transcript
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
                Download Transcript
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyTranscript} className="cursor-pointer">
                Copy Transcript
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <div className="flex items-center justify-between w-full p-2">
                  <span>Auto-scroll</span>
                  <Switch 
                    id="auto-scroll-dropdown" 
                    checked={autoScroll} 
                    onCheckedChange={setAutoScroll}
                    className="ml-2 data-[state=checked]:bg-primary"
                  />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground font-medium">
          {filteredSegments.length} {filteredSegments.length === 1 ? 'segment' : 'segments'}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="auto-scroll" 
            checked={autoScroll} 
            onCheckedChange={setAutoScroll}
            className="data-[state=checked]:bg-primary"
          />
          <Label htmlFor="auto-scroll" className="text-sm cursor-pointer">
            Auto-scroll
          </Label>
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-3 mb-4 p-2 rounded-lg bg-white/30 dark:bg-gray-800/30">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="h-9 w-9 rounded-full"
        >
          <SkipBack className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handlePlayPause}
          className="h-11 w-11 rounded-full bg-primary/10 hover:bg-primary/20"
        >
          {isPlaying ? 
            <PauseCircle className="h-7 w-7 text-primary" /> : 
            <PlayCircle className="h-7 w-7 text-primary" />
          }
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="h-9 w-9 rounded-full"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="h-[450px] rounded-md border bg-white/30 dark:bg-gray-900/30 scroll-container">
        <div className="space-y-1 p-2 relative">
          {filteredSegments.length > 0 ? (
            <>
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-center py-2 mb-2"
                onClick={handleScrollToTop}
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Scroll to top
              </Button>
              
              {/* Display all segments without pagination */}
              {filteredSegments.map((segment, index) => (
                <div id={`segment-${segment.id}`} key={segment.id}>
                  <TranscriptLine
                    segment={segment}
                    showTimestamps={showTimestamps}
                    isActive={currentSegmentIndex === index}
                    isEditMode={isEditMode}
                    onUpdateSegment={handleUpdateSegment}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              {searchTerm ? 'No matching segments found' : 'No transcript segments available'}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TranscriptViewer;
