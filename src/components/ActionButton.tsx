
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'default' | 'secondary' | 'ghost' | 'link' | 'outline';
  size?: 'icon' | 'default' | 'sm' | 'lg';
  disabled?: boolean;
}

const ActionButton = ({
  icon,
  label,
  onClick,
  className,
  tooltipSide = 'top',
  variant = 'ghost',
  size = 'icon',
  disabled = false
}: ActionButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant={variant}
              size={size}
              onClick={onClick}
              className={cn(
                "relative overflow-hidden group transition-all", 
                size === 'icon' && "h-9 w-9 rounded-lg", 
                className
              )}
              disabled={disabled}
              aria-label={label}
            >
              <span className="absolute inset-0 w-full h-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              {icon}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide} sideOffset={5} className="font-medium bg-black/90 text-white border-none">
          <p className="text-xs">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionButton;
