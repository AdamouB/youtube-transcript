
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'default' | 'secondary' | 'ghost' | 'link';
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
          <Button
            variant={variant}
            size={size}
            onClick={onClick}
            className={cn("group", className)}
            disabled={disabled}
            aria-label={label}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide} sideOffset={5}>
          <p className="text-xs">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionButton;
