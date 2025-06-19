import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { ScrollButton } from './styles';

export const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton $show={showButton} onClick={scrollToTop}>
      <FaArrowUp />
    </ScrollButton>
  );
};
