'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, UserCircle, HelpCircle, Settings } from 'lucide-react';

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-muted">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
            <User className="w-4 h-4 text-gold" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium">Enterprise User</div>
            <div className="text-xs text-muted-foreground">user@company.com</div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {/* Email Address - Static Display */}
        <div className="px-2 py-2">
          <p className="text-xs text-muted-foreground">user@company.com</p>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Menu Items */}
        <DropdownMenuItem>
          <Settings className="w-4 h-4 mr-2" />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle className="w-4 h-4 mr-2" />
          Get Help
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}