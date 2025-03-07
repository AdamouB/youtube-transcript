
import { useState } from 'react';
import { TranscriptSegment } from './TranscriptLine';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner';

interface ChatWithTranscriptProps {
  transcript: TranscriptSegment[];
}

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

const ChatWithTranscript = ({ transcript }: ChatWithTranscriptProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I can help you analyze this transcript. What would you like to know about it?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI processing with transcript content
    setTimeout(() => {
      // Create a simple response that references the transcript
      let response = "I've analyzed the transcript.";
      
      if (input.toLowerCase().includes('summary')) {
        response = "Based on the transcript, this video discusses minimalist design principles, including whitespace, typography, color, contrast, alignment, consistency, and simplicity.";
      } else if (input.toLowerCase().includes('principle') || input.toLowerCase().includes('design')) {
        response = "The main design principles mentioned are: whitespace for visual hierarchy, typography that's functional and beautiful, a restrained color palette, contrast for emphasis, alignment for order, consistency for unity, and simplicity by removing unnecessary elements.";
      } else if (input.toLowerCase().includes('quote')) {
        const randomIndex = Math.floor(Math.random() * transcript.length);
        response = `Here's a quote from the transcript: "${transcript[randomIndex].text}"`;
      } else {
        response = "I can provide summaries, extract key points, answer questions, or find specific information in the transcript. What would you like to know?";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full flex flex-col glass-panel shadow-lg rounded-2xl animate-scale-in h-[560px] bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
      <div className="flex-1 p-4">
        <ScrollArea className="h-[460px]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'bot' ? (
                      <Bot className="h-4 w-4 mr-2" />
                    ) : (
                      <User className="h-4 w-4 mr-2" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.sender === 'user' ? 'You' : 'AI Assistant'} • {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 rounded-tl-none">
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ask about the transcript..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-white/90 dark:bg-gray-800/90 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-full"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithTranscript;
