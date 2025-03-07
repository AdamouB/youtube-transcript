
import ActionButton from './ActionButton';
import { Button } from './ui/button';
import {
  RefreshCcw,
  ArrowLeft,
  Languages,
  Clock,
  Download,
  Share2,
  Copy,
  Edit,
  MessageSquareQuote
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface HeaderControlsProps {
  showTimestamps: boolean;
  setShowTimestamps: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  onRefresh: () => void;
  onBack: () => void;
}

const HeaderControls = ({
  showTimestamps,
  setShowTimestamps,
  language,
  setLanguage,
  onRefresh,
  onBack
}: HeaderControlsProps) => {
  
  const handleCopyTranscript = () => {
    // Logic to copy the transcript
    toast.success('Transcript copied to clipboard');
  };
  
  const handleDownloadTranscript = () => {
    // Logic to download the transcript
    toast.success('Transcript download started');
  };
  
  const handleShareTranscript = () => {
    // Logic to share the transcript
    toast.success('Share link generated and copied to clipboard');
  };
  
  const handleEditTranscript = () => {
    // Logic to edit the transcript
    toast.info('Edit mode enabled');
  };
  
  const handleQuoteTranscript = () => {
    // Logic to quote the transcript
    toast.info('Select text to quote it');
  };

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3 p-4 glass-panel rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <ActionButton
          icon={<ArrowLeft />}
          label="Back to Home"
          onClick={onBack}
          className="mr-1"
        />
        
        <div className="h-10 border-l border-border/50 mx-1"></div>
        
        <ActionButton
          icon={<RefreshCcw />}
          label="Refresh Transcript"
          onClick={onRefresh}
        />
        
        <div className="hidden sm:flex items-center gap-4 ml-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Timestamps</span>
            <Switch
              checked={showTimestamps}
              onCheckedChange={setShowTimestamps}
              aria-label="Toggle timestamps"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Languages className="mr-2 h-4 w-4" />
                <span>{language === 'en' ? 'English' : language === 'es' ? 'Spanish' : 'Auto'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage('auto')}>Auto-detect</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')}>Spanish</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('fr')}>French</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('de')}>German</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ja')}>Japanese</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-1">
          <ActionButton
            icon={<Copy />}
            label="Copy Transcript"
            onClick={handleCopyTranscript}
          />
          
          <ActionButton
            icon={<Download />}
            label="Download Transcript"
            onClick={handleDownloadTranscript}
          />
          
          <ActionButton
            icon={<Share2 />}
            label="Share Transcript"
            onClick={handleShareTranscript}
          />
          
          <ActionButton
            icon={<Edit />}
            label="Edit Transcript"
            onClick={handleEditTranscript}
          />
          
          <ActionButton
            icon={<MessageSquareQuote />}
            label="Quote Transcript"
            onClick={handleQuoteTranscript}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderControls;
