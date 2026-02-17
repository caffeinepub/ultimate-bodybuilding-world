import { useState, useCallback } from 'react';

export function useCopyPageLink() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const copyLink = useCallback(async () => {
    try {
      const url = window.location.href;
      
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus('success');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      }
      
      // Reset status after 2 seconds
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }, []);

  return { copyLink, status };
}
