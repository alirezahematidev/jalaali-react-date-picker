import classNames from "classnames";
import { Fragment } from "react";

type TransformMarker = {
  marker: number;
  label: string;
  transform: string;
  disableClassName: string;
};

interface TransformProps {
  transforms: TransformMarker[];
  activeTickClassName: (marker: number) => string | undefined;
}

const Transform = ({ transforms, activeTickClassName }: TransformProps) => {
  return (
    <Fragment>
      {transforms.map(({ marker, label, transform, disableClassName }) => (
        <div
          key={marker}
          className={classNames(
            "tick",
            disableClassName,
            activeTickClassName(marker),
          )}
          style={{ transform }}
        >
          {label}
        </div>
      ))}
    </Fragment>
  );
};

export { Transform };
