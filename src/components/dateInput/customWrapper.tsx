import { ReactNode } from "react";

interface CustomWrapperProps {
  children: ReactNode;
  onOpen?: () => void;
  inputRef: React.RefObject<HTMLDivElement>;
}

const CustomWrapper = ({ children, onOpen, inputRef }: CustomWrapperProps) => {
  return (
    <div ref={inputRef} onClick={onOpen} className="custom-input-wrapper">
      {children}
    </div>
  );
};

export { CustomWrapper };
