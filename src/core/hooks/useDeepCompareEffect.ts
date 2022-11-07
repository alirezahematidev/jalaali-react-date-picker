// import { isEqual } from "lodash-es";
import { useEffect, useRef, EffectCallback, DependencyList } from "react";

function deepCompare<T>(value1: T, value2: T) {
  return true;
}

function useDeepCompareMemoize<T>(value?: T) {
  const ref = useRef<T>();

  if (!deepCompare(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: DependencyList = [],
) {
  useEffect(callback, [callback, dependencies?.map(useDeepCompareMemoize)]);
}
