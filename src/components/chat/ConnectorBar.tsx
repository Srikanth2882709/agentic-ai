'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Lightbulb, Palette, Brain, Check } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { mockModels } from '@/lib/mock-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

export function ConnectorBar() {
  const { activeConnectors, toggleConnector, selectedModel, setModel } = useAppStore();
  const [styleDialogOpen, setStyleDialogOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Normal');

  const connectorConfig = [
    {
      type: 'web_search',
      icon: Search,
      label: 'Web Search',
      description: 'Search the internet for current information',
    },
    {
      type: 'research',
      icon: Lightbulb,
      label: 'Deep Research',
      description: 'Multi-step research with citations',
    },
  ];

  const styleOptions = ['Normal', 'Concise', 'Explanatory', 'Formal'];

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
    setStyleDialogOpen(false);
    // Trigger appropriate action based on style
    toast.success(`Response style set to: ${style}`);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <TooltipProvider>
        {connectorConfig.map((config) => {
          const connector = activeConnectors.find((c) => c.type === config.type);
          const Icon = config.icon;

          return (
            <Tooltip key={config.type}>
              <TooltipTrigger asChild>
                <Button
                  variant={connector?.enabled ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleConnector(config.type)}
                  className={
                    connector?.enabled
                      ? 'bg-gold hover:bg-gold/90 text-black'
                      : 'hover:border-gold hover:text-gold'
                  }
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {config.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{config.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* Style Selector with Dropdown */}
        <DropdownMenu open={styleDialogOpen} onOpenChange={setStyleDialogOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hover:border-gold hover:text-gold">
              <Palette className="w-4 h-4 mr-1" />
              Style
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {styleOptions.map((style) => (
              <DropdownMenuItem
                key={style}
                onClick={() => handleStyleSelect(style)}
                className={selectedStyle === style ? 'bg-gold/10 text-gold' : ''}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{style}</span>
                  {selectedStyle === style && (
                    <Check className="w-4 h-4 text-gold" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Model Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hover:border-gold hover:text-gold">
              <Brain className="w-4 h-4 mr-1" />
              {selectedModel.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {mockModels.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() => setModel(model)}
                className={selectedModel.id === model.id ? 'bg-gold/10' : ''}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{model.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {model.provider}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>
    </div>
  );
}