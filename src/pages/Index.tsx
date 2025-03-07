
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TranscriptForm from '@/components/TranscriptForm';
import TranscriptViewer from '@/components/TranscriptViewer';
import ChatWithTranscript from '@/components/ChatWithTranscript';
import BulkTranscriptUploader from '@/components/BulkTranscriptUploader';
import { TranscriptSegment } from '@/components/TranscriptLine';
import { fetchTranscript, extractVideoId, getYouTubeThumbnail } from '@/utils/transcript';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [showTimestamps, setShowTimestamps] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('transcript');

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    try {
      const id = extractVideoId(url);
      if (!id) {
        toast.error('Invalid YouTube URL');
        setIsLoading(false);
        return;
      }
      
      setVideoId(id);
      const data = await fetchTranscript(url);
      setTranscript(data);
      toast.success('Transcript loaded successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load transcript. Please try again.');
      setTranscript([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (videoId) {
      handleSubmit(`https://youtu.be/${videoId}`);
    } else {
      toast.error('No video loaded to refresh');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white to-secondary/10 dark:from-background dark:to-secondary/20">
      <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-center font-bold tracking-tight text-4xl mb-6 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Transcript To Go
        </h1>
        
        <Header 
          showTimestamps={showTimestamps}
          setShowTimestamps={setShowTimestamps}
          isTranscriptLoaded={transcript.length > 0}
          language={language}
          setLanguage={setLanguage}
          onRefresh={handleRefresh}
        />
        
        <TranscriptForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        
        {videoId && (
          <div className="w-full aspect-video relative rounded-xl overflow-hidden shadow-lg animate-fade-in">
            <img
              src={getYouTubeThumbnail(videoId)}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-12 w-12 text-white animate-spin" />
                  <p className="text-white mt-4 font-medium">Loading transcript...</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {transcript.length > 0 && (
          <Tabs defaultValue="transcript" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="transcript" className="data-[state=active]:bg-primary data-[state=active]:text-white">Transcript</TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-white">Chat</TabsTrigger>
              <TabsTrigger value="bulk" className="data-[state=active]:bg-primary data-[state=active]:text-white">Bulk</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transcript" className="animate-fade-in">
              <TranscriptViewer 
                segments={transcript}
                showTimestamps={showTimestamps}
              />
            </TabsContent>
            
            <TabsContent value="chat" className="animate-fade-in">
              <ChatWithTranscript transcript={transcript} />
            </TabsContent>
            
            <TabsContent value="bulk" className="animate-fade-in">
              <BulkTranscriptUploader onSubmit={handleSubmit} />
            </TabsContent>
          </Tabs>
        )}
        
        {!transcript.length && !isLoading && (
          <div className="text-center p-8 glass-panel shadow-lg rounded-2xl animate-fade-in">
            <h3 className="text-xl font-medium mb-3">No Transcript Loaded</h3>
            <p className="text-muted-foreground">
              Enter a YouTube URL above to fetch and display the transcript.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
