
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Loader2, Upload, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { processBulkTranscripts, extractVideoId } from '@/utils/transcript';

interface BulkTranscriptUploaderProps {
  onSubmit: (url: string) => void;
}

type ProcessingStatus = 'idle' | 'processing' | 'success' | 'error';

interface UrlStatus {
  url: string;
  status: ProcessingStatus;
  videoId: string | null;
}

const BulkTranscriptUploader = ({ onSubmit }: BulkTranscriptUploaderProps) => {
  const [bulkUrls, setBulkUrls] = useState('');
  const [urlStatuses, setUrlStatuses] = useState<UrlStatus[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessBulk = async () => {
    const urls = bulkUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    if (urls.length === 0) {
      toast.error('Please enter at least one URL');
      return;
    }

    // Create initial status objects
    const initialStatuses: UrlStatus[] = urls.map(url => ({
      url,
      status: 'idle',
      videoId: extractVideoId(url)
    }));
    
    setUrlStatuses(initialStatuses);
    setIsProcessing(true);
    
    try {
      // Process URLs one by one to show progress
      for (let i = 0; i < initialStatuses.length; i++) {
        setUrlStatuses(prev => prev.map((status, index) => 
          index === i ? { ...status, status: 'processing' } : status
        ));
        
        try {
          // Wait a bit to show the processing state
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Try to process this URL
          if (initialStatuses[i].videoId) {
            await processBulkTranscripts([initialStatuses[i].url]);
            setUrlStatuses(prev => prev.map((status, index) => 
              index === i ? { ...status, status: 'success' } : status
            ));
          } else {
            throw new Error('Invalid video ID');
          }
        } catch (error) {
          setUrlStatuses(prev => prev.map((status, index) => 
            index === i ? { ...status, status: 'error' } : status
          ));
        }
      }
      
      toast.success(`Processed ${urls.length} URLs`);
    } catch (error) {
      toast.error('Error processing bulk URLs');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setBulkUrls('');
    setUrlStatuses([]);
  };

  const handleViewTranscript = (url: string) => {
    onSubmit(url);
    toast.info('Loading selected transcript...');
  };

  const getStatusIcon = (status: ProcessingStatus) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col glass-panel shadow-lg rounded-2xl animate-scale-in p-5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
      <h3 className="text-lg font-medium mb-3">Bulk Transcript Processing</h3>
      
      <div className="mb-4">
        <div className="mb-2 text-sm text-muted-foreground">
          Enter one YouTube URL per line to process multiple transcripts at once.
        </div>
        <textarea
          className="w-full h-24 p-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="https://www.youtube.com/watch?v=example1&#10;https://www.youtube.com/watch?v=example2&#10;https://youtu.be/example3"
          value={bulkUrls}
          onChange={(e) => setBulkUrls(e.target.value)}
          disabled={isProcessing}
        />
      </div>
      
      <div className="flex gap-2 mb-4">
        <Button
          onClick={handleProcessBulk}
          disabled={isProcessing || !bulkUrls.trim()}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Process URLs
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isProcessing || (!bulkUrls.trim() && urlStatuses.length === 0)}
        >
          Clear
        </Button>
      </div>
      
      {urlStatuses.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Processing Results</h4>
          <ScrollArea className="h-[300px] rounded-md border p-2 bg-white/30 dark:bg-gray-900/30">
            <div className="space-y-2">
              {urlStatuses.map((status, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg border bg-white dark:bg-gray-800"
                >
                  <div className="flex items-center gap-2 truncate max-w-[70%]">
                    {getStatusIcon(status.status)}
                    <span className="text-sm truncate">{status.url}</span>
                  </div>
                  
                  {status.status === 'success' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewTranscript(status.url)}
                      className="text-xs"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default BulkTranscriptUploader;
