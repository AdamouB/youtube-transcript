
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Sparkle, Bug, Zap, Layout, MessageSquare, ExternalLink } from 'lucide-react';

interface ChangelogFeature {
  text: string;
  type: 'new' | 'improvement' | 'bugfix' | 'enhancement' | 'experience';
}

interface ChangelogEntry {
  date: string;
  changes: ChangelogFeature[];
}

interface ChangelogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const changelogData: ChangelogEntry[] = [
  {
    date: "December 29, 2024",
    changes: [
      { text: "Added API to fetch transcripts.", type: 'new' },
      { text: "Implemented server-side endpoints for more efficient transcript retrieval.", type: 'enhancement' }
    ]
  },
  {
    date: "December 18, 2024",
    changes: [
      { text: "Fixed an issue where timestamps were sometimes shown in the wrong order.", type: 'bugfix' },
      { text: "Improved sorting algorithm for transcript segments with overlapping timestamps.", type: 'enhancement' }
    ]
  },
  {
    date: "December 15, 2024",
    changes: [
      { text: "Added more options to summary generation.", type: 'new' },
      { text: "Language Selection Dropdown: Added UI component for users to select their preferred transcript summary language.", type: 'improvement' }
    ]
  },
  {
    date: "December 8, 2024",
    changes: [
      { text: "Added subscription model.", type: 'new' },
      { text: "Implemented a visible but non-intrusive subscription banner for pro features.", type: 'improvement' },
      { text: "Created tiered access plans with different feature sets.", type: 'new' }
    ]
  },
  {
    date: "November 23, 2024",
    changes: [
      { text: "Added pro feature to extract transcripts from a YouTube playlist.", type: 'new' },
      { text: "Implemented batch processing to handle multiple videos efficiently.", type: 'enhancement' }
    ]
  },
  {
    date: "October 11, 2024",
    changes: [
      { text: "Experimental feature: Added feature to edit transcript before copying or downloading.", type: 'new' },
      { text: "Transcript Editing UI: Designed and implemented an interface that allows users to modify transcripts before copying or downloading.", type: 'improvement' }
    ]
  },
  {
    date: "October 4, 2024",
    changes: [
      { text: "You can now add notes inside transcripts. The notes are saved in your browser only.", type: 'new' },
      { text: "Transcript Notes Feature: Added an inline note-taking feature within transcripts, storing notes locally in the browser.", type: 'improvement' },
      { text: "Implemented persistent storage using localStorage for better user experience.", type: 'enhancement' }
    ]
  },
  {
    date: "September 26, 2024",
    changes: [
      { text: "Transcripts are now stored to increase speed when revisiting earlier transcripts.", type: 'enhancement' },
      { text: "Cache Indicator: Added a visual indicator showing when a transcript has been cached for faster revisits.", type: 'improvement' },
      { text: "Implemented efficient caching mechanisms to reduce loading times.", type: 'enhancement' }
    ]
  },
  {
    date: "September 11, 2024",
    changes: [
      { text: "Improved Proxy quality to reduce bot detection rates.", type: 'enhancement' },
      { text: "Enhanced server-side request handling to mimic human browsing patterns.", type: 'enhancement' }
    ]
  },
  {
    date: "September 7, 2024",
    changes: [
      { text: "Added feedback button. Please let me know what you think!", type: 'experience' },
      { text: "Implemented a feedback submission button in an accessible yet non-intrusive location.", type: 'improvement' }
    ]
  },
  {
    date: "August 10, 2024",
    changes: [
      { text: "Fixed an issue with YouTube blocking the transcript fetching.", type: 'bugfix' },
      { text: "Implemented alternate fetching methods to avoid detection.", type: 'enhancement' }
    ]
  },
  {
    date: "July 29, 2024",
    changes: [
      { text: "Updated UI to give more space for the transcript summary.", type: 'improvement' },
      { text: "Redesigned Transcript Summary Layout: Adjusted the UI to allocate more space for transcript summaries, improving readability.", type: 'improvement' }
    ]
  },
  {
    date: "July 26, 2024",
    changes: [
      { text: "Added more error handling when fetching YouTube video transcripts.", type: 'enhancement' },
      { text: "Fixed a server side error for an edge-case.", type: 'bugfix' },
      { text: "Added an option to choose the language of the transcript summary.", type: 'new' }
    ]
  },
  {
    date: "July 23, 2024",
    changes: [
      { text: "Updated meta data.", type: 'enhancement' },
      { text: "Improved SEO and sharing capabilities with better metadata.", type: 'enhancement' }
    ]
  },
  {
    date: "July 22, 2024",
    changes: [
      { text: "Improved mobile friendly design.", type: 'improvement' },
      { text: "Mobile Optimization: Improved layout responsiveness, ensuring transcript display and controls work well on mobile devices.", type: 'improvement' },
      { text: "Added exceptions for live streams.", type: 'enhancement' },
      { text: "Added quota limitations for summarizing transcripts.", type: 'enhancement' }
    ]
  },
  {
    date: "July 20, 2024",
    changes: [
      { text: "Added more error handling.", type: 'enhancement' },
      { text: "Added Error Messages for Failed Fetches: Display better error messages when transcript fetching fails.", type: 'improvement' }
    ]
  },
  {
    date: "July 19, 2024",
    changes: [
      { text: "Added YouTube video summary functionality.", type: 'new' },
      { text: "Introduced AI-powered summarization for video content.", type: 'new' }
    ]
  },
  {
    date: "July 17, 2024",
    changes: [
      { text: "Added custom video control buttons.", type: 'improvement' },
      { text: "Playback Control UI: Added custom video control buttons for a better user experience while interacting with transcripts.", type: 'improvement' },
      { text: "Added exceptions for age-restricted videos.", type: 'enhancement' },
      { text: "Improved mobile friendly design.", type: 'improvement' }
    ]
  },
  {
    date: "July 16, 2024",
    changes: [
      { text: "Added support for downloading .vtt files.", type: 'new' },
      { text: "Implemented proper formatting and headers for standards-compliant VTT files.", type: 'enhancement' }
    ]
  },
  {
    date: "July 14, 2024",
    changes: [
      { text: "Improved YouTube video URL detection and validation.", type: 'enhancement' },
      { text: "YouTube URL Input Validation: Improved the UI validation for YouTube links, providing clearer error messages.", type: 'improvement' },
      { text: "Added Frequently Asked Questions section.", type: 'experience' },
      { text: "FAQs Section UI: Designed and integrated a collapsible FAQ section for common user questions.", type: 'improvement' }
    ]
  },
  {
    date: "July 13, 2024",
    changes: [
      { text: "Added download transcript functionality.", type: 'new' },
      { text: "Implemented multiple format options for downloaded transcripts.", type: 'enhancement' }
    ]
  },
  {
    date: "July 12, 2024",
    changes: [
      { text: "Added transcript language support.", type: 'new' },
      { text: "Added search in transcript and auto scroll when video is playing.", type: 'new' },
      { text: "Fixed styling for long transcripts: Improved the scrolling and text wrapping experience.", type: 'bugfix' }
    ]
  }
];

const Changelog: React.FC<ChangelogProps> = ({ open, onOpenChange }) => {
  // Function to render the appropriate icon based on feature type
  const getFeatureIcon = (type: string) => {
    switch (type) {
      case 'new':
        return <Sparkle className="h-4 w-4 text-blue-500" />;
      case 'bugfix':
        return <Bug className="h-4 w-4 text-red-500" />;
      case 'enhancement':
        return <Zap className="h-4 w-4 text-amber-500" />;
      case 'improvement':
        return <Layout className="h-4 w-4 text-emerald-500" />;
      case 'experience':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <ExternalLink className="h-4 w-4 text-gray-500" />;
    }
  };

  // Function to get badge color based on feature type
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'new':
        return <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">New</Badge>;
      case 'bugfix':
        return <Badge className="ml-2 bg-red-500 hover:bg-red-600">Bug Fix</Badge>;
      case 'enhancement':
        return <Badge className="ml-2 bg-amber-500 hover:bg-amber-600">Enhancement</Badge>;
      case 'improvement':
        return <Badge className="ml-2 bg-emerald-500 hover:bg-emerald-600">Improvement</Badge>;
      case 'experience':
        return <Badge className="ml-2 bg-purple-500 hover:bg-purple-600">Experience</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Changelog</DialogTitle>
          <DialogDescription>
            See the latest updates and improvements to our YouTube Transcript tool
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow pr-4 mt-4">
          <div className="space-y-6">
            {changelogData.map((entry, index) => (
              <div key={index} className="border-b border-border/40 pb-4 last:border-0">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-lg">{entry.date}</h3>
                  {index === 0 && (
                    <Badge className="ml-2 bg-primary" variant="default">Latest</Badge>
                  )}
                </div>
                <ul className="space-y-2">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="pl-4 border-l-2 border-primary/60 flex items-start gap-2">
                      {getFeatureIcon(change.type)}
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-1">
                          <span>{change.text}</span>
                          {changeIndex === 0 && getTypeBadge(change.type)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Changelog;
