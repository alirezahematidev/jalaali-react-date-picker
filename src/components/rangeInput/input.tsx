import classNames from "classnames";
import React, { forwardRef, useEffect, useRef } from "react";
import { useMergeRefs } from "../../core/hooks";
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
  separator?: React.ReactNode;
  disabled?: boolean;
  onLayout?: (width: number) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onLayout,
      isRtl,
      disabled,
      className,
      firstInput,
      value,
      separator,
      ...rest
    },
    ref,
  ) => {
    const _ref = useRef<HTMLInputElement>(null);
    const mounted = useRef<boolean>(false);

    const refs = useMergeRefs(ref, _ref);

    useEffect(() => {
      if (!_ref.current || mounted.current) return;
      const bounds = _ref.current.getBoundingClientRect();
      if (bounds) {
        onLayout?.(bounds.width);
        mounted.current = true;
      }
    }, [_ref, onLayout]);

    useEffect(() => {
      if (!_ref.current) return;
      const node = _ref.current;
      const observer = new ResizeObserver(([entry]) => {
        const bounds = entry.target.getBoundingClientRect();
        if (bounds) {
          onLayout?.(bounds.width);
        }
      });
      observer.observe(node, { box: "border-box" });
      return () => observer.unobserve(node);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_ref]);

    return (
      <>
        <input
          {...rest}
          ref={refs}
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
            {separator ? separator : isRtl ? <Icon.Back /> : <Icon.Forward />}
          </div>
        )}
      </>
    );
  },
);
