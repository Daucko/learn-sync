// components/clerk-captcha-wrapper.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useSignUp } from '@clerk/nextjs';

declare global {
  interface Window {
    clerk: any;
  }
}

export function ClerkCaptchaWrapper() {
  const { signUp } = useSignUp();
  const captchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!signUp || !captchaRef.current) return;

    const initializeCaptcha = async () => {
      try {
        // Clerk should automatically detect the element, but you can manually initialize if needed
        console.log('CAPTCHA container ready');
      } catch (error) {
        console.warn('CAPTCHA initialization warning:', error);
      }
    };

    initializeCaptcha();
  }, [signUp]);

  return <div id="clerk-captcha" ref={captchaRef} />;
}
