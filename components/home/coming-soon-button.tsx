import React, { useRef } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';

export default function ComingSoonButton() {
  return (
    <button className="relative h-16 w-[340px] overflow-hidden bg-emerald-400/ p-px rounded-lg">
      <div
        className="absolute inset-0"
        style={{ borderRadius: 'calc(0.5rem * 0.96)' }}
      >
        <MovingBorder duration={3000} rx="30%" ry="30%">
          <div className="h-20 w-20 bg-[radial-gradient(#fbbf24_40%,transparent_60%)] opacity-[0.8]" />
        </MovingBorder>
      </div>

      <div
        className="relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/80 text-white antialiased backdrop-blur-xl divide-x divide-gray-600"
        style={{
          borderRadius: 'calc(0.5rem * 0.96)',
        }}
      >
        <span className="flex items-center space-x-3 pr-6 pl-6">
          <Clock className="w-5 h-5 text-emerald-700" />
          <span className="text-gray-100 font-semibold">Coming Soon</span>
        </span>
        <span className="pl-6 pr-6 text-emerald-700 font-bold flex items-center space-x-2">
          <Sparkles className="w-4 h-4" style={{ color: '#fbbf24' }} />
          <span className="text-sm">Stay Tuned</span>
        </span>
      </div>
    </button>
  );
}

const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
