
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Share2, Pencil, Download, Quote, RefreshCw, ArrowLeft, Info,
  Languages, Save, Clock, Lightbulb, Globe
} from 'lucide-react';
import ActionButton from './ActionButton';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import Changelog from './Changelog';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  showTimestamps: boolean;
  setShowTimestamps: (value: boolean) => void;
  isTranscriptLoaded: boolean;
  language: string;
  setLanguage: (language: string) => void;
  onRefresh: () => void;
  onBackClick?: () => void;
  isEditMode?: boolean;
  setIsEditMode?: (value: boolean) => void;
  isCached?: boolean;
}

const Header = ({ 
  showTimestamps, 
  setShowTimestamps, 
  isTranscriptLoaded,
  language,
  setLanguage,
  onRefresh,
  onBackClick,
  isEditMode = false,
  setIsEditMode,
  isCached = false
}: HeaderProps) => {
  const [showChangelog, setShowChangelog] = useState(false);

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
    if (setIsEditMode) {
      setIsEditMode(!isEditMode);
      toast.success(isEditMode ? 'Exited edit mode' : 'Entered edit mode');
    } else {
      toast.info('Edit mode will be available in a future update');
    }
  };

  const handleDownload = () => {
    toast.info('Download feature will be available in a future update');
  };

  const handleQuote = () => {
    toast.info('Please select text in the transcript to quote it');
  };

  return (
    <div className="flex flex-col space-y-3 w-full animate-fade-in">
      <Changelog open={showChangelog} onOpenChange={setShowChangelog} />
      
      <div className="flex items-center justify-between w-full bg-white/50 dark:bg-gray-900/50 rounded-lg p-3 shadow-sm">
        <div className="flex items-center gap-3">
          {onBackClick && (
            <ActionButton 
              icon={<ArrowLeft className="h-4 w-4" />} 
              label="Back" 
              onClick={onBackClick}
              variant="outline"
              className="bg-white/80 dark:bg-gray-800/80 mr-2"
            />
          )}
          <span className="text-lg font-medium text-primary">Transcript</span>
          {isCached && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
              <Clock className="h-3 w-3" />
              <span>Cached</span>
            </Badge>
          )}
          {isTranscriptLoaded && (
            <div className="hidden sm:flex items-center gap-3 ml-2">
              <Separator orientation="vertical" className="h-6" />
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px] h-9 bg-white/80 dark:bg-gray-800/80 gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (auto-generated)</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <ActionButton 
            icon={<Info className="h-4 w-4" />} 
            label="What's New" 
            onClick={() => setShowChangelog(true)}
            variant="outline"
            className="bg-white/80 dark:bg-gray-800/80 mr-1"
          />
          
          {isTranscriptLoaded && (
            <>
              <ActionButton 
                icon={<RefreshCw className="h-4 w-4" />} 
                label="Refresh Transcript" 
                onClick={onRefresh}
                variant="outline"
                className="bg-white/80 dark:bg-gray-800/80"
              />
              
              <div className="hidden sm:flex items-center space-x-2 mx-2">
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
                icon={<Share2 className="h-4 w-4" />} 
                label="Share" 
                onClick={handleShare}
                variant="outline"
                className="bg-white/80 dark:bg-gray-800/80"
              />
              
              <ActionButton 
                icon={<Pencil className="h-4 w-4" />} 
                label={isEditMode ? "Exit Edit Mode" : "Edit"}
                onClick={handleEdit}
                variant={isEditMode ? "default" : "outline"}
                className={isEditMode ? "bg-primary text-white" : "bg-white/80 dark:bg-gray-800/80"}
              />
              
              <ActionButton 
                icon={<Download className="h-4 w-4" />} 
                label="Download" 
                onClick={handleDownload}
                variant="outline"
                className="bg-white/80 dark:bg-gray-800/80"
              />
              
              <ActionButton 
                icon={<Quote className="h-4 w-4" />} 
                label="Quote" 
                onClick={handleQuote}
                variant="outline"
                className="bg-white/80 dark:bg-gray-800/80"
              />
            </>
          )}
        </div>
      </div>
      
      {isTranscriptLoaded && (
        <div className="sm:hidden flex items-center gap-3 w-full bg-white/50 dark:bg-gray-900/50 rounded-lg p-3 shadow-sm">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full h-9 bg-white/80 dark:bg-gray-800/80 gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English (auto-generated)</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="it">Italian</SelectItem>
              <SelectItem value="pt">Portuguese</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
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
