import React, { useEffect, useState } from 'react';
import useWindowScroll from '../hooks/useWindowScroll';
import Arrow from './Arrow';
import Button from './Button';

function BackToTop(): JSX.Element {

    const isBrowser = typeof window !== `undefined`;
    const [isPastOffset, setIsPastOffset] = useState(false);
    const { y } = useWindowScroll();

    useEffect(function updateScrollOffset() {
      if (isBrowser) {
        const innerHeight = window.innerHeight;
        setIsPastOffset(y > innerHeight);
      }
    })

    function scrollToTop() {
      const speed = 2000;
      const easing = pos => Math.sin(pos * (Math.PI / 2));
      let currentTime = 0;

      const time = Math.max(
        0.1,
        Math.min(y / speed, 0.8)
      )

      function tick() {
        currentTime += 1 / 60;

        const timeFrame = currentTime / time;

        const getEasing = easing(timeFrame);

        if (timeFrame < 1) {
          window.requestAnimationFrame(tick);

          window.scrollTo(0, y + (0 - y) * getEasing);
        } else {
          window.scrollTo(0, 0);
        }
      }

      tick();
    }

    return (
      <Button
          onClick={() => scrollToTop()}
          variant="secondary"
          className={`back-to-top ${isPastOffset ? 'back-to-top-show' : ''}`}>
           <Arrow direction="top" />
      </Button>
    )
}

export default BackToTop
