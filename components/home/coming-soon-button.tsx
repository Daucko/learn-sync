import React from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComingSoonButton() {
  return (
    <motion.button
      className="relative h-16 w-[340px] overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-amber-500 p-px"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-amber-500"
        animate={{
          background: [
            'linear-gradient(45deg, #10b981, #f59e0b)',
            'linear-gradient(135deg, #10b981, #f59e0b)',
            'linear-gradient(225deg, #10b981, #f59e0b)',
            'linear-gradient(315deg, #10b981, #f59e0b)',
            'linear-gradient(45deg, #10b981, #f59e0b)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ borderRadius: 'calc(0.5rem * 0.96)' }}
      />

      <div
        className="relative flex h-full w-full items-center justify-center bg-slate-900/90 text-white antialiased backdrop-blur-xl divide-x divide-gray-600"
        style={{
          borderRadius: 'calc(0.5rem * 0.96)',
        }}
      >
        <span className="flex items-center space-x-3 pr-6 pl-6">
          <Clock className="w-5 h-5 text-emerald-400" />
          <span className="text-gray-100 font-semibold">Coming Soon</span>
        </span>
        <span className="pl-6 pr-6 text-amber-400 font-bold flex items-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Stay Tuned</span>
        </span>
      </div>
    </motion.button>
  );
}
