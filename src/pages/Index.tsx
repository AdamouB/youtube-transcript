
import { useState } from 'react';
import Header from '@/components/Header';
import TranscriptForm from '@/components/TranscriptForm';
import TranscriptViewer from '@/components/TranscriptViewer';
import { TranscriptSegment } from '@/components/TranscriptLine';
import { fetchTranscript, extractVideoId, getYouTubeThumbnail } from '@/utils/transcript';
import { toast } from 'sonner';

const Index = () => {
  const [showTimestamps, setShowTimestamps] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [language, setLanguage] = useState('en');

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
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <h1 className="text-center font-semibold tracking-tight text-4xl mb-6">
          <span className="text-primary">Transcript</span> To Go
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        {transcript.length > 0 && (
          <TranscriptViewer 
            segments={transcript}
            showTimestamps={showTimestamps}
          />
        )}
        
        {!transcript.length && !isLoading && (
          <div className="text-center p-8 glass-panel shadow-lg rounded-xl animate-fade-in">
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
