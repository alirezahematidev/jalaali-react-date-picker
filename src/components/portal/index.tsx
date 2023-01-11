import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { isDOM } from "../../core/constants/variables";

interface PortalProps {
  children: ReactNode;
  getContainer?: HTMLElement | (() => HTMLElement) | string;
}

function createContainer(container?: PortalProps["getContainer"]) {
  if (!container) {
    return document.body;
  }

  if (typeof container === "function") {
    return container();
  }

  if (typeof container === "string") {
    const selector = document.querySelector(container);

    if (!selector) {
      console.warn(
        "Your selector is not valid or does not exists in DOM, we automatically replace it with root element",
      );

      return document.body;
    }

    return selector;
  }

  return container;
}

const Portal = ({ children, getContainer }: PortalProps) => {
  if (!isDOM) return null;

  return createPortal(children, createContainer(getContainer));
};

export { Portal };
