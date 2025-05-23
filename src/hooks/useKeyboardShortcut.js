import { useEffect } from 'react';

const useKeyboardShortcut = (key, callback, deps = []) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Kiểm tra nếu đang focus vào input/textarea
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable
      ) {
        return;
      }

      // Kiểm tra phím tắt
      if (event.key === key) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [key, callback, ...deps]);
};

export default useKeyboardShortcut; 