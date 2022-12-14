import { CSSProperties } from "react";

export function createIcomoonIconSet(glyphMap: any) {
  const Icon = (props: {
    size?: number;
    name?: string;
    color?: string | string[];
    style?: CSSProperties;
  }) => {
    const glyph = props.name
      ? glyphMap.icons.find(
          ({ properties }: any) => properties.name === props.name,
        )
      : null;

    return (
      <svg
        viewBox={`0 0 ${glyphMap.height} ${glyphMap.height}`}
        fill="none"
        width={props.size || 30}
        height={props.size || 30}
      >
        {(glyph.icon.paths as string[]).map((d, index) => {
          return (
            <path
              key={index}
              d={d}
              {...glyph.attrs[index]}
              fill={
                Array.isArray(props.color) ? props.color[index] : props.color
              }
            ></path>
          );
        })}
      </svg>
    );
  };

  return Icon;
}
