
import { useState, useEffect } from 'react';
import { TranscriptSegment } from '@/components/TranscriptLine';
import { fetchTranscript, extractVideoId, getYouTubeThumbnail, validateYouTubeUrl } from '@/utils/transcript';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/use-local-storage';

import NavHeader from '@/components/NavHeader';
import HeroSection from '@/components/HeroSection';
import TranscriptViewer from '@/components/TranscriptViewer';
import ChatWithTranscript from '@/components/ChatWithTranscript';
import BulkTranscriptUploader from '@/components/BulkTranscriptUploader';
import FeaturesSection from '@/components/FeaturesSection';
import UseCasesSection from '@/components/UseCasesSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface CachedTranscript {
  segments: TranscriptSegment[];
  timestamp: number;
}

const Index = () => {
  const [showTimestamps, setShowTimestamps] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('transcript');
  const [showLandingContent, setShowLandingContent] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [cachedTranscripts, setCachedTranscripts] = useLocalStorage<Record<string, CachedTranscript>>('cached-transcripts', {});
  const [isCached, setIsCached] = useState(false);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    try {
      // Validate URL first
      const validationResult = validateYouTubeUrl(url);
      if (!validationResult.isValid) {
        toast.error(validationResult.error || 'Invalid YouTube URL');
        setIsLoading(false);
        return;
      }
      
      const id = extractVideoId(url);
      if (!id) {
        toast.error('Invalid YouTube URL');
        setIsLoading(false);
        return;
      }
      
      setVideoId(id);
      
      // Check if we have a cached version (not older than 24 hours)
      const now = Date.now();
      const cachedEntry = cachedTranscripts[id];
      const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (cachedEntry && (now - cachedEntry.timestamp) < CACHE_DURATION) {
        setTranscript(cachedEntry.segments);
        setIsCached(true);
        toast.success('Loaded cached transcript!');
      } else {
        const data = await fetchTranscript(url);
        
        // Cache the new transcript
        const updatedCache = {
          ...cachedTranscripts,
          [id]: {
            segments: data,
            timestamp: now
          }
        };
        setCachedTranscripts(updatedCache);
        
        setTranscript(data);
        setIsCached(false);
        toast.success('Transcript loaded successfully!');
      }
      
      setShowLandingContent(false); // Hide landing content when transcript is loaded
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
      // Force a fresh fetch by clearing the cached status
      setIsCached(false);
      handleSubmit(`https://youtu.be/${videoId}`);
    } else {
      toast.error('No video loaded to refresh');
    }
  };

  const resetToLanding = () => {
    setTranscript([]);
    setVideoId(null);
    setShowLandingContent(true);
    setIsEditMode(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-secondary/10 dark:from-background dark:to-secondary/20">
      <NavHeader />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <AnimatePresence mode="wait">
          {showLandingContent ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <HeroSection onSubmit={handleSubmit} isLoading={isLoading} />
              <FeaturesSection />
              <UseCasesSection />
              <FAQSection />
            </motion.div>
          ) : (
            <motion.div
              key="transcript"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-6 space-y-6 animate-fade-in"
            >
              <Header 
                showTimestamps={showTimestamps}
                setShowTimestamps={setShowTimestamps}
                isTranscriptLoaded={transcript.length > 0}
                language={language}
                setLanguage={setLanguage}
                onRefresh={handleRefresh}
                onBackClick={resetToLanding}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                isCached={isCached}
              />
              
              {videoId && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full aspect-video relative rounded-xl overflow-hidden shadow-lg"
                >
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
                </motion.div>
              )}
              
              {transcript.length > 0 && (
                <Tabs defaultValue="transcript" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="transcript" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      Transcript
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="bulk" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      Bulk
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="transcript" className="animate-fade-in">
                    <TranscriptViewer 
                      segments={transcript}
                      showTimestamps={showTimestamps}
                      isEditMode={isEditMode}
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
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
