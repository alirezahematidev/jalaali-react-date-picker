import classNames from "classnames";
import { forwardRef, useEffect, useRef } from "react";
import { GAP } from ".";
import { Icon } from "../icon";

type InputBuiltInProps = Omit<
  React.HtmlHTMLAttributes<HTMLInputElement>,
  "value"
>;

interface InputProps extends InputBuiltInProps {
  isRtl: boolean;
  value?: string;
  index: number;
  onLayout?: (width: number) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, isRtl, className, index, onLayout, ...rest }) => {
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
          className={classNames(
            isRtl && "rtl",
            isRtl ? "range-input-fa" : "range-input-en",
            className,
          )}
        />
        {index === 0 && (
          <div
            style={{
              height: "100%",
              minWidth: GAP,
              maxWidth: GAP,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isRtl ? <Icon.Back /> : <Icon.Forward />}
          </div>
        )}
      </>
    );
  },
);
