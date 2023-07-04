import { useEffect, useRef } from 'react';

const platformModifier = navigator.platform.startsWith('Mac')
  ? 'metaKey'
  : 'ctrlKey';

const useKeyboardShorcut = (key: string, callback: () => void) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key && event[platformModifier]) {
        event.preventDefault();
        callbackRef.current();
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [key]);
};

export default useKeyboardShorcut;
