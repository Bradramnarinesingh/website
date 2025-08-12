"use client";
import { useEffect } from 'react';

export default function GlobalBackground(): JSX.Element {
  useEffect(() => {
    document.body.classList.add("has-global-bg");
    return () => { document.body.classList.remove("has-global-bg"); };
  }, []);

  return (
    <div aria-hidden className="ethereal-background">
      <div className="ethereal-particles layer-1"></div>
      <div className="ethereal-particles layer-2"></div>
      <div className="ethereal-particles layer-3"></div>
      <div className="ethereal-vignette"></div>
    </div>
  );
}


