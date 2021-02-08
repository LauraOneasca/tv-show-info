import React from 'react';
import throttle from 'lodash.throttle';

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    updateSize();
    const throttledUpdateSize = throttle(updateSize, 500);
    window.addEventListener('resize', throttledUpdateSize);

    return () => window.removeEventListener('resize', throttledUpdateSize);
  }, []);

  return size;
}

// eslint-disable-next-line import/prefer-default-export
export { useWindowSize };
