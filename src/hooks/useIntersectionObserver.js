import { RefObject, useEffect, useState } from "react";

export default function useInterSectionObserver({ targetRef, options }) {
  const [entry, setEntry] = useState();

  const isIntersecting = entry?.isIntersecting;

  const updateEntry = (entries) => {
    const [entry] = entries;

    setEntry(entry);
  };

  useEffect(() => {
    const target = targetRef?.current;

    if (isIntersecting || !target) return;

    const observer = new IntersectionObserver(updateEntry, options);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, options, isIntersecting]);

  return entry;
}
