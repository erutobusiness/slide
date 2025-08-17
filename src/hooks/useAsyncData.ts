'use client';

import { useEffect, useRef, useState } from 'react';

export function useAsyncData<T>(
  asyncFn: () => Promise<T>,
  deps: React.DependencyList,
  initialValue: T,
): [T, boolean] {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const asyncFnRef = useRef(asyncFn);

  // keep the ref up-to-date when asyncFn identity changes
  useEffect(() => {
    asyncFnRef.current = asyncFn;
  }, [asyncFn]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    // call the latest asyncFn via ref to avoid effect re-running when
    // the caller recreates the function on each render
    asyncFnRef
      .current()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // only depend on user-provided deps; asyncFn is read from ref
  }, [...deps]);

  return [data, isLoading];
}
