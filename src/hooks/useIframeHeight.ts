import { useEffect } from 'react';

export const useIframeHeight = () => {
  useEffect(() => {
    if (window.parent === window) {
      return;
    }

    const root = document.getElementById('root');

    if (!root) {
      return;
    }

    const parentOrigin = document.referrer
      ? new URL(document.referrer).origin
      : 'https://frezivna.com';
    let previousHeight = 0;

    const sendHeight = () => {
      const height = Math.ceil(root.getBoundingClientRect().height);

      if (height > 0 && height !== previousHeight) {
        window.parent.postMessage(
          { type: 'frezivna:resize', height },
          parentOrigin,
        );
        previousHeight = height;
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (
        event.source === window.parent &&
        event.origin === parentOrigin &&
        event.data?.type === 'frezivna:resize-request'
      ) {
        previousHeight = 0;
        sendHeight();
      }
    };

    const observer = new ResizeObserver(sendHeight);

    observer.observe(root);
    window.addEventListener('message', handleMessage);
    sendHeight();

    return () => {
      observer.disconnect();
      window.removeEventListener('message', handleMessage);
    };
  }, []);
};
