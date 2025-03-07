
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, ArrowUpRight, MessageCircle } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import ActionButton from './ActionButton';

const NavHeader = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-5 glass-panel border-b border-border/40 rounded-t-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <span className="font-bold text-xl gradient-text">Transcript To Go</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#api" className="text-sm font-medium hover:text-primary transition-colors">
            API
          </a>
          <a href="/bulk" className="text-sm font-medium hover:text-primary transition-colors">
            Bulk
          </a>
          <a 
            href="https://discord.gg/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium flex items-center gap-1 text-primary hover:underline"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Join Discord</span>
          </a>
          
          <div className="ml-4 flex items-center gap-2">
            <ActionButton
              icon={theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              variant="outline"
              size="sm"
              className="h-8 w-8"
            />
            
            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
              <span>Try Pro</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="sr-only">Toggle menu</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-gray-900 shadow-lg rounded-b-lg border-t z-50 animate-slide-down">
          <div className="p-4 flex flex-col gap-3">
            <a href="#pricing" className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-secondary">
              Pricing
            </a>
            <a href="#api" className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-secondary">
              API
            </a>
            <a href="/bulk" className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-secondary">
              Bulk
            </a>
            <a 
              href="https://discord.gg/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium flex items-center gap-1 text-primary p-2 rounded-md hover:bg-secondary"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Join Discord</span>
            </a>
            <Button className="mt-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
              <span>Try Pro</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavHeader;
