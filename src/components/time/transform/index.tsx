import classNames from "classnames";
import { Fragment } from "react";

type TransformMarker = {
  marker: number;
  label: string;
  transform: string;
};

interface TransformProps {
  transforms: TransformMarker[];
  activeTickClassName: (marker: number) => string | undefined;
}

const Transform = ({ transforms, activeTickClassName }: TransformProps) => {
  return (
    <Fragment>
      {transforms.map(({ marker, label, transform }) => (
        <div
          key={marker}
          className={classNames("tick", activeTickClassName(marker))}
          style={{ transform }}
        >
          {label}
        </div>
      ))}
    </Fragment>
  );
};

export { Transform };
