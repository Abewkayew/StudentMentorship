import { useState } from 'react';

const useForceUpdate = () => {
  const [value, set] = useState(true);
  return () => set(!value);
};

export default useForceUpdate;
