
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

interface ChangelogEntry {
  date: string;
  changes: string[];
}

interface ChangelogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const changelogData: ChangelogEntry[] = [
  {
    date: "December 29, 2024",
    changes: ["Added API to fetch transcripts."]
  },
  {
    date: "December 18, 2024",
    changes: ["Fixed an issue where timestamps were sometimes shown in the wrong order."]
  },
  {
    date: "December 15, 2024",
    changes: ["Added more options to summary generation."]
  },
  {
    date: "December 8, 2024",
    changes: ["Added subscription model."]
  },
  {
    date: "November 23, 2024",
    changes: ["Added pro feature to extract transcripts from a YouTube playlist."]
  },
  {
    date: "October 11, 2024",
    changes: ["Experimental feature: Added feature to edit transcript before copying or downloading."]
  },
  {
    date: "October 4, 2024",
    changes: ["You can now add notes inside transcripts. The notes are saved in your browser only."]
  },
  {
    date: "September 26, 2024",
    changes: ["Transcripts are now stored to increase speed when revisiting earlier transcripts."]
  },
  {
    date: "September 11, 2024",
    changes: ["Improved Proxy quality to reduce bot detection rates."]
  },
  {
    date: "September 7, 2024",
    changes: ["Added feedback button. Please let me know what you think!"]
  },
  {
    date: "August 10, 2024",
    changes: ["Fixed an issue with YouTube blocking the transcript fetching."]
  },
  {
    date: "July 29, 2024",
    changes: ["Updated UI to give more space for the transcript summary."]
  },
  {
    date: "July 26, 2024",
    changes: [
      "Added more error handling when fetching YouTube video transcripts.",
      "Fixed a server side error for an edge-case.",
      "Added an option to choose the language of the transcript summary."
    ]
  },
  {
    date: "July 23, 2024",
    changes: ["Updated meta data."]
  },
  {
    date: "July 22, 2024",
    changes: [
      "Improved mobile friendly design.",
      "Added exceptions for live streams.",
      "Added quota limitations for summarizing transcripts."
    ]
  },
  {
    date: "July 20, 2024",
    changes: ["Added more error handling."]
  },
  {
    date: "July 19, 2024",
    changes: ["Added YouTube video summary functionality."]
  },
  {
    date: "July 17, 2024",
    changes: [
      "Added custom video control buttons.",
      "Added exceptions for age-restricted videos.",
      "Improved mobile friendly design."
    ]
  },
  {
    date: "July 16, 2024",
    changes: ["Added support for downloading .vtt files."]
  },
  {
    date: "July 14, 2024",
    changes: [
      "Improved YouTube video URL detection and validation.",
      "Added Frequently Asked Questions section."
    ]
  },
  {
    date: "July 13, 2024",
    changes: ["Added download transcript functionality."]
  },
  {
    date: "July 12, 2024",
    changes: [
      "Added transcript language support.",
      "Added search in transcript and auto scroll when video is playing."
    ]
  }
];

const Changelog: React.FC<ChangelogProps> = ({ open, onOpenChange }) => {
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
                    <li key={changeIndex} className="pl-4 border-l-2 border-primary/60">
                      {change}
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
