
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Share2, Pencil, Download, Quote, RefreshCw
} from 'lucide-react';
import ActionButton from './ActionButton';
import { toast } from 'sonner';

interface HeaderProps {
  showTimestamps: boolean;
  setShowTimestamps: (value: boolean) => void;
  isTranscriptLoaded: boolean;
  language: string;
  setLanguage: (language: string) => void;
  onRefresh: () => void;
}

const Header = ({ 
  showTimestamps, 
  setShowTimestamps, 
  isTranscriptLoaded,
  language,
  setLanguage,
  onRefresh
}: HeaderProps) => {
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

  const handleEdit = () => {
    toast.info('Edit mode will be available in a future update');
  };

  const handleDownload = () => {
    toast.info('Download feature will be available in a future update');
  };

  const handleQuote = () => {
    toast.info('Please select text in the transcript to quote it');
  };

  return (
    <div className="flex flex-col space-y-2 w-full animate-fade-in">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">Transcript</span>
          {isTranscriptLoaded && (
            <div className="hidden sm:flex items-center gap-3 ml-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (auto-generated)</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          {isTranscriptLoaded && (
            <>
              <ActionButton 
                icon={<RefreshCw className="action-icon" />} 
                label="Refresh Transcript" 
                onClick={onRefresh}
              />
              
              <div className="hidden sm:flex items-center space-x-2 mr-2">
                <Switch 
                  id="timestamps" 
                  checked={showTimestamps} 
                  onCheckedChange={setShowTimestamps}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="timestamps" className="text-sm cursor-pointer">
                  Timestamps
                </Label>
              </div>
              
              <ActionButton 
                icon={<Share2 className="action-icon" />} 
                label="Share" 
                onClick={handleShare}
              />
              
              <ActionButton 
                icon={<Pencil className="action-icon" />} 
                label="Edit" 
                onClick={handleEdit}
              />
              
              <ActionButton 
                icon={<Download className="action-icon" />} 
                label="Download" 
                onClick={handleDownload}
              />
              
              <ActionButton 
                icon={<Quote className="action-icon" />} 
                label="Quote" 
                onClick={handleQuote}
              />
            </>
          )}
        </div>
      </div>
      
      {isTranscriptLoaded && (
        <div className="sm:hidden flex items-center gap-3 w-full">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full h-8">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English (auto-generated)</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch 
              id="mobile-timestamps" 
              checked={showTimestamps} 
              onCheckedChange={setShowTimestamps}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label htmlFor="mobile-timestamps" className="text-sm cursor-pointer whitespace-nowrap">
              Timestamps
            </Label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
