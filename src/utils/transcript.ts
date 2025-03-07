
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { TranscriptSegment } from '@/components/TranscriptLine';

export const fetchTranscript = async (videoUrl: string): Promise<TranscriptSegment[]> => {
  try {
    // This is a simulated API call - in a real app, you would call your backend API
    // const response = await fetch(`/api/transcript?url=${encodeURIComponent(videoUrl)}`);
    
    // Simulating API response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if URL contains 'error' to simulate an error
    if (videoUrl.includes('error')) {
      throw new Error('Failed to fetch transcript');
    }
    
    // Mock data for demonstration
    return generateMockTranscript();
  } catch (error) {
    console.error('Error fetching transcript:', error);
    toast.error('Failed to fetch transcript. Please try again.');
    throw error;
  }
};

// Helper function to generate mock transcript data
const generateMockTranscript = (): TranscriptSegment[] => {
  const mockTexts = [
    "Welcome to this video about minimalist design.",
    "Today, we're going to explore the principles that make minimalist interfaces effective.",
    "First, let's talk about whitespace and how it creates visual hierarchy.",
    "Whitespace isn't just empty space – it's an active design element.",
    "It guides the eye and creates focus on what matters most.",
    "Second, we have typography. Clean, readable fonts are essential.",
    "Typography in minimalist design should be functional and beautiful.",
    "The third principle is color. A restrained palette creates harmony.",
    "Usually, minimalist designs use no more than three primary colors.",
    "Next, we have contrast. Even in minimal designs, contrast creates emphasis.",
    "Without proper contrast, minimalist designs can feel flat and unclear.",
    "Let's not forget about alignment. Every element should be purposefully placed.",
    "Alignment creates order and makes information easier to process.",
    "Consistency is another crucial principle. Elements should feel unified.",
    "And finally, simplicity – removing everything that isn't absolutely necessary.",
    "As Dieter Rams said, 'Less, but better.'",
    "These principles aren't just about aesthetics – they improve usability.",
    "A well-designed minimalist interface reduces cognitive load for users.",
    "It helps them accomplish tasks with less effort and confusion.",
    "That's why companies like Apple have embraced minimalism in their design language.",
    "Their products feel intuitive because they remove unnecessary complexity.",
    "To practice minimalism, start by asking: 'Can this element be removed?'",
    "If removing it doesn't harm functionality, it probably should go.",
    "Remember that minimalism isn't about removing features users need.",
    "It's about presenting those features in the clearest possible way.",
    "Thanks for watching this introduction to minimalist design principles.",
    "In the next video, we'll look at practical examples of these principles in action.",
    "Don't forget to subscribe for more design content.",
    "Until next time, focus on simplicity and clarity in your designs."
  ];

  return mockTexts.map((text, index) => {
    const start = index * 10; // Each segment starts 10 seconds after the previous
    return {
      id: uuidv4(),
      text,
      start,
      duration: 10 // Each segment is 10 seconds long
    };
  });
};

// Helper function to extract video ID from YouTube URL
export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

// Function to generate thumbnail URL from video ID
export const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
