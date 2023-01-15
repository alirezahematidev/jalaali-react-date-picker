import { isServer } from "../core/constants/variables";

export function isTouchInWindow() {
  if (isServer) return false;

  return "ontouchstart" in window || navigator?.maxTouchPoints > 0;
}
