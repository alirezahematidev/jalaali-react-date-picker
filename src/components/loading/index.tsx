import { ReactNode } from "react";

interface LoadingProps {
  children: ReactNode;
  loading?: boolean;
  indicator?: ReactNode;
}

const Loading = ({ children, loading, indicator }: LoadingProps) => {
  if (loading) {
    return (
      <div className="loading-wrapper">
        {indicator ? indicator : <div className="loading"></div>}
      </div>
    );
  }

  return <>{children}</>;
};

export { Loading };
