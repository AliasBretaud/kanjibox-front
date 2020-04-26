import React, { useEffect, useState } from "react";

const Fade = ({
  show,
  timeout,
  children,
}: {
  show: boolean;
  timeout: number;
  children: any;
}) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  const display = () => {
    return (
      render && (
        <div
          style={{ animation: `${show ? "fadeIn" : "fadeOut"} ${timeout}ms` }}
          onAnimationEnd={onAnimationEnd}
        >
          {children}
        </div>
      )
    );
  };

  return <>{display()}</>;
};

export default Fade;
