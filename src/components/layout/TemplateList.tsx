'use client';

import { mockTemplates } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'; // FIXED: Changed from 'next/router'
import { generateId } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

export function TemplateList() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const addConversation = useAppStore((state) => state.addConversation);

  const handleUseTemplate = (template: typeof mockTemplates[0]) => {
    const newConv = {
      id: generateId(),
      title: `${template.name} Session`,
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0,
    };
    addConversation(newConv);
    router.push(`/chat/${newConv.id}?template=${template.id}`);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-2 py-1 hover:bg-muted rounded-lg transition-colors"
      >
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Templates
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-1 overflow-hidden"
          >
            {mockTemplates.map((template) => (
              <Button
                key={template.id}
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-muted hover:text-gold"
                onClick={() => handleUseTemplate(template)}
              >
                <span className="text-lg">{template.icon}</span>
                <span className="text-sm">{template.name}</span>
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}