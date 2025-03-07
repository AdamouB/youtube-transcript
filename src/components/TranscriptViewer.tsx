
import { useState, useEffect } from 'react';
import { TranscriptSegment } from './TranscriptLine';
import TranscriptLine from './TranscriptLine';
import SearchBar from './SearchBar';
import { Copy, EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import ActionButton from './ActionButton';

interface TranscriptViewerProps {
  segments: TranscriptSegment[];
  showTimestamps: boolean;
}

const TranscriptViewer = ({ segments, showTimestamps }: TranscriptViewerProps) => {
  const [filteredSegments, setFilteredSegments] = useState<TranscriptSegment[]>(segments);
  const [searchTerm, setSearchTerm] = useState('');
  const [autoScroll, setAutoScroll] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = segments.filter(segment => 
        segment.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSegments(filtered);
    } else {
      setFilteredSegments(segments);
    }
  }, [searchTerm, segments]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCopyTranscript = () => {
    const fullText = segments.map(segment => segment.text).join(' ');
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
    toast.info('Download feature will be available in a future update');
  };

  return (
    <div className="w-full flex flex-col glass-panel animate-scale-in p-4">
      <div className="flex items-center justify-between mb-3">
        <SearchBar onSearch={handleSearch} />
        
        <div className="flex items-center gap-1">
          <ActionButton
            icon={<Copy className="action-icon" />}
            label="Copy Transcript"
            onClick={handleCopyTranscript}
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleShare}>
                Share Transcript
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                Download Transcript
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyTranscript}>
                Copy Transcript
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
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
      
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-muted-foreground">
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
      
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="space-y-1 p-1">
          {filteredSegments.length > 0 ? (
            filteredSegments.map((segment) => (
              <TranscriptLine
                key={segment.id}
                segment={segment}
                showTimestamps={showTimestamps}
              />
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              {searchTerm ? 'No matching segments found' : 'No transcript segments available'}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TranscriptViewer;
