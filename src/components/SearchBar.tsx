
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative w-full animate-fade-in">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      <Input
        type="text"
        placeholder="Search transcript"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-9 pr-9 h-10 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-primary transition-all"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1.5 top-1/2 transform -translate-y-1/2 h-7 w-7 hover:bg-secondary/80"
          onClick={handleClear}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
