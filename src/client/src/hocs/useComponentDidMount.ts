import { EffectCallback, useEffect, useState } from 'react';

export const useComponentDidMount = (func: EffectCallback) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (func && !mounted) {
      setMounted(true);
      func();
    }
  }, [func, mounted]);
};
