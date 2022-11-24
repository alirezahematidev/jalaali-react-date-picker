import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  events?: string[] | null,
  nodes?: HTMLElement[],
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: any) => {
      const { target } = event ?? {};
      if (Array.isArray(nodes)) {
        const shouldTrigger = nodes.every(
          (node) => !!node && !node.contains(target),
        );
        shouldTrigger && handler();
      } else if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    (events || DEFAULT_EVENTS).forEach((fn) =>
      document.addEventListener(fn, listener),
    );

    return () => {
      (events || DEFAULT_EVENTS).forEach((fn) =>
        document.removeEventListener(fn, listener),
      );
    };
  }, [ref, handler, nodes, events]);

  return ref;
}
