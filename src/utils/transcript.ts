
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
    
    // Mock data for demonstration - in a real implementation, this would come from the API
    return generateMockTranscript();
  } catch (error) {
    console.error('Error fetching transcript:', error);
    toast.error('Failed to fetch transcript. Please try again.');
    throw error;
  }
};

// Helper function to generate mock transcript data with MORE segments
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
    "Until next time, focus on simplicity and clarity in your designs.",
    "Bonus content: Let's discuss how minimalism applies to different design disciplines.",
    "In web design, minimalism means removing unnecessary navigation options.",
    "In product design, it means creating objects that serve their purpose elegantly.",
    "In graphic design, it means using negative space effectively.",
    "The key is always intentionality - every element must earn its place.",
    "This approach requires discipline and a willingness to edit ruthlessly.",
    "It's often harder to remove elements than to add them.",
    "But the result is a more focused, effective design.",
    "Users appreciate designs that respect their attention and cognitive resources.",
    "That's why minimalist design continues to be relevant decade after decade.",
    "It's not about following a trend - it's about respecting fundamental principles.",
    "When designing minimalist interfaces, test with real users.",
    "Sometimes what seems unnecessary to designers is actually important to users.",
    "The goal is clarity and effectiveness, not minimalism for its own sake.",
    "Thank you for watching this extended discussion on minimalist design.",
    "I hope these principles help you create more effective, beautiful work.",
    "Let me know in the comments which principles you find most valuable.",
    "And if you have examples of great minimalist design, share those too!",
    "Remember: in design, less is often more, but only when the less is exactly right.",
    "That's the true art of minimalism."
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
  // Handle various YouTube URL formats
  const regExpList = [
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(.+)$/
  ];
  
  for (const regExp of regExpList) {
    const match = url.match(regExp);
    if (match && match[7] && match[7].length === 11) {
      return match[7];
    }
  }
  
  // Special case for youtu.be format
  const shortMatch = url.match(/youtu\.be\/([^?#&]+)/);
  if (shortMatch && shortMatch[1] && shortMatch[1].length === 11) {
    return shortMatch[1];
  }
  
  return null;
};

// Function to generate thumbnail URL from video ID
export const getYouTubeThumbnail = (videoId: string): string => {
  // Using maxresdefault for high quality, with fallback option
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Function to handle bulk transcript processing
export const processBulkTranscripts = async (urls: string[]): Promise<Record<string, TranscriptSegment[]>> => {
  const results: Record<string, TranscriptSegment[]> = {};
  
  for (const url of urls) {
    try {
      const videoId = extractVideoId(url);
      if (videoId) {
        const transcript = await fetchTranscript(url);
        results[videoId] = transcript;
      }
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
      // Continue with other URLs even if one fails
    }
  }
  
  return results;
};
