import { useEffect } from "react";

// this hooks will close the modal when a use clicked somewhere
export const useClickOutside = (ref: any, callback: () => void) => {
  const handleClick = (e: any) => {
    if (!ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};
