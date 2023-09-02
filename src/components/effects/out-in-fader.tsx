import React, { ReactNode, useEffect, useRef, useState } from "react";

type OutInFaderProps = {
  children: ReactNode;
  show: boolean;
  preserveHeight: boolean;
};

const OutInFader = ({
  children,
  show = true,
  preserveHeight = true,
}: OutInFaderProps) => {
  const [fadeClasses, setFadeClasses] = useState(show ? '!opacity-0' : '!opacity-100');
  const [renderChild, setRenderChild] = useState(show);
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(ref.current?.clientHeight);

  useEffect(() => {
    setFadeClasses(show ? "!opacity-100" : "!opacity-0");
    if (show) {
      setTimeout(() => setRenderChild(true), 1000);
    } else {
      setTimeout(() => setRenderChild(false), 1000);
    }
  }, [show]);

  useEffect(() => {
    setHeight(ref.current?.clientHeight);
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full transition-opacity duration-1000 ${fadeClasses}`}
      style={{ height: !renderChild && preserveHeight ? height : "unset" }}
    >
      {renderChild && children}
    </div>
  );
};

export default OutInFader;
