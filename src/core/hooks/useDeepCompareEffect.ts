import { DependencyList, EffectCallback, useEffect, useRef } from "react";
import { isEqual } from "../../utils";

function deepCompare<T>(value1: T, value2: T) {
  return isEqual(value1, value2);
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
