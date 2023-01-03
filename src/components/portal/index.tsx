import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { isDOM } from "../../core/constants/variables";

interface PortalProps {
  children: ReactNode;
  getContainer?: HTMLElement | (() => HTMLElement) | string;
}

function createContainer(container?: PortalProps["getContainer"]) {
  if (!container) {
    if (!isDOM) {
      throw new Error(
        "document is undefined due to mounted in server side component, you must provide a absolute container.",
      );
    }
    return document.body;
  }

  if (typeof container === "function") {
    return container();
  }

  if (typeof container === "string") {
    const selector = document.querySelector(container);

    if (!selector) {
      console.warn(
        "Your selector does not exists in DOM, we automatically replace it with body",
      );

      return document.body;
    }

    return selector;
  }

  return container;
}

const Portal = ({ children, getContainer }: PortalProps) => {
  if (!isDOM) return null;

  return createPortal(children, createContainer(getContainer), "popup");
};

export { Portal };
