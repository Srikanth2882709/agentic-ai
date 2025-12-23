// src/app/chat/[id]/page.tsx
'use client';

import { use } from 'react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ArtifactsPanel } from '@/components/artifacts/ArtifactsPanel';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Unwrap the params Promise (Next.js 15+ requirement)
  const { id } = use(params);
  
  const { sidebarCollapsed, toggleSidebar, artifactsPanelOpen } = useAppStore();

  return (
    <div className="flex h-full">
      {/* Sidebar Toggle (when collapsed) */}
      {sidebarCollapsed && (
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-muted"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatContainer conversationId={id} />
      </div>

      {/* Artifacts Panel */}
      <AnimatePresence>
        {artifactsPanelOpen && (
          <motion.div
            initial={{ x: 600 }}
            animate={{ x: 0 }}
            exit={{ x: 600 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-125 border-l border-border"
          >
            <ArtifactsPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}