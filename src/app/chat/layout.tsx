// src/app/chat/layout.tsx
'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { useAppStore } from '@/store/appStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="shrink-0"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}