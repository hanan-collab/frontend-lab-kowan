'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../design-export/components/ui/utils';

export function LoadingOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-sm text-muted-foreground">Loading page...</span>
    </div>
  );
}