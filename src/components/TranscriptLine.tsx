
import { useState } from 'react';
import { Play, Lightbulb, Copy, Edit, Save, Check, Trash2, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import ActionButton from './ActionButton';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';

export interface TranscriptSegment {
  id: string;
  text: string;
  start: number;
  duration: number;
}

interface TranscriptLineProps {
  segment: TranscriptSegment;
  showTimestamps: boolean;
  isActive?: boolean;
  isEditMode?: boolean;
  onUpdateSegment?: (id: string, newText: string) => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const TranscriptLine = ({ 
  segment, 
  showTimestamps, 
  isActive = false,
  isEditMode = false,
  onUpdateSegment
}: TranscriptLineProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(segment.text);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useLocalStorage<Record<string, string>>('transcript-notes', {});
  
  const handleJumpTo = () => {
    // This would link to the YouTube video at the specific timestamp
    toast.info(`Jump to ${formatTime(segment.start)}`);
  };
  
  const handleAddNote = () => {
    setShowNoteInput(!showNoteInput);
    if (!showNoteInput) {
      setNote(notes[segment.id] || '');
    }
  };
  
  const handleSaveNote = () => {
    const updatedNotes = { ...notes, [segment.id]: note };
    setNotes(updatedNotes);
    setShowNoteInput(false);
    toast.success('Note saved!');
  };
  
  const handleDeleteNote = () => {
    const updatedNotes = { ...notes };
    delete updatedNotes[segment.id];
    setNotes(updatedNotes);
    setShowNoteInput(false);
    toast.success('Note deleted!');
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(segment.text);
    toast.success('Text copied to clipboard!');
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedText(segment.text);
  };

  const handleSaveEdit = () => {
    if (onUpdateSegment) {
      onUpdateSegment(segment.id, editedText);
    }
    setIsEditing(false);
    toast.success('Text updated!');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(segment.text);
  };

  const hasNote = notes[segment.id] && notes[segment.id].length > 0;

  return (
    <div 
      className={cn(
        "group transcript-line flex flex-col gap-2 p-3 rounded-md hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-200",
        isActive && "bg-white/30 dark:bg-gray-800/30 border-l-4 border-primary",
        isEditMode && "border border-dashed border-gray-300 dark:border-gray-600"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {showTimestamps && (
          <div className="timestamp min-w-[60px] font-mono bg-secondary/70 rounded px-2 py-1 text-center">
            {formatTime(segment.start)}
          </div>
        )}
        
        {isEditing ? (
          <div className="flex-1">
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="min-h-[80px] bg-white/90 dark:bg-gray-800/90"
              placeholder="Edit transcript segment..."
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleCancelEdit}
                className="flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleSaveEdit}
                className="flex items-center gap-1"
              >
                <Check className="h-3.5 w-3.5" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 text-left leading-relaxed">
            {segment.text}
            {hasNote && (
              <div 
                className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded border-l-4 border-yellow-300 dark:border-yellow-600 flex items-start gap-2"
                onClick={handleAddNote}
              >
                <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm">{notes[segment.id]}</div>
              </div>
            )}
          </div>
        )}
        
        {!isEditing && (isHovered || isActive || isEditMode) && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ActionButton
              icon={<MessageSquare className={cn("h-3.5 w-3.5", hasNote && "text-yellow-500")} />}
              label={hasNote ? "Edit Note" : "Add Note"}
              onClick={handleAddNote}
              size="sm"
              className={cn("h-7 w-7 bg-white/80 dark:bg-gray-800/80", hasNote && "border-yellow-300 dark:border-yellow-600")}
              variant="outline"
            />
            <ActionButton
              icon={<Play className="h-3.5 w-3.5" />}
              label="Jump to Timestamp"
              onClick={handleJumpTo}
              size="sm"
              className="h-7 w-7 bg-white/80 dark:bg-gray-800/80"
              variant="outline"
            />
            {isEditMode ? (
              <ActionButton
                icon={<Edit className="h-3.5 w-3.5" />}
                label="Edit Text"
                onClick={handleEditClick}
                size="sm"
                className="h-7 w-7 bg-white/80 dark:bg-gray-800/80"
                variant="outline"
              />
            ) : (
              <ActionButton
                icon={<Copy className="h-3.5 w-3.5" />}
                label="Copy Text"
                onClick={handleCopy}
                size="sm"
                className="h-7 w-7 bg-white/80 dark:bg-gray-800/80"
                variant="outline"
              />
            )}
          </div>
        )}
      </div>
      
      {showNoteInput && (
        <div className="mt-1">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add your note here..."
            className="min-h-[80px] bg-white/80 dark:bg-gray-800/80 text-sm mb-2"
          />
          <div className="flex justify-end gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowNoteInput(false)}
            >
              Cancel
            </Button>
            {note.trim().length > 0 && (
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleDeleteNote}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Delete
              </Button>
            )}
            <Button 
              size="sm" 
              onClick={handleSaveNote}
              disabled={note.trim().length === 0}
            >
              <Save className="h-3.5 w-3.5 mr-1" />
              Save Note
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptLine;
