import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { Icon } from "../icon";

const GAP = 36;

type InputBuiltInProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value"
>;

interface InputProps extends InputBuiltInProps {
  isRtl: boolean;
  value?: string;
  firstInput?: boolean;
  seperator?: React.ReactNode;
  disabled?: boolean;
  onLayout?: (width: number) => void;
}

export const Input = ({
  value,
  isRtl,
  className,
  firstInput,
  seperator,
  onLayout,
  disabled,
  ...rest
}: InputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!ref.current || mounted.current) return;
    const bounds = ref.current.getBoundingClientRect();
    if (bounds) {
      onLayout?.(bounds.width);
      mounted.current = true;
    }
  }, [ref, onLayout]);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const observer = new ResizeObserver(([entry]) => {
      const bounds = entry.target.getBoundingClientRect();
      if (bounds) {
        onLayout?.(bounds.width);
      }
    });
    observer.observe(node, { box: "border-box" });
    return () => observer.unobserve(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <>
      <input
        {...rest}
        ref={ref}
        value={value}
        disabled={disabled}
        className={classNames(
          isRtl ? "range-input-fa" : "range-input-en",
          disabled && "picker-input-disabled",
          className,
        )}
      />
      {firstInput && (
        <div
          style={{
            minWidth: GAP,
            maxWidth: GAP,
          }}
          className="separator-icon"
        >
          {seperator ? seperator : isRtl ? <Icon.Back /> : <Icon.Forward />}
        </div>
      )}
    </>
  );
};
