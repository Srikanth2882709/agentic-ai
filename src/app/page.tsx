'use client';

import { WelcomeHero } from '@/components/welcome/WelcomeHero';
import { TemplateGallery } from '@/components/welcome/TemplateGallery';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <WelcomeHero />
        <TemplateGallery />
      </motion.div>
    </div>
  );
}