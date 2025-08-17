'use client';

import { useMemo, useState } from 'react';

export function useAsyncData<T>(
  asyncFn: () => Promise<T>,
  deps: React.DependencyList,
  initialValue: T
): [T, boolean] {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useMemo(() => {
    setIsLoading(true);
    asyncFn()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, deps);

  return [data, isLoading];
}