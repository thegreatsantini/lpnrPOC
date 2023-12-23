import { Fragment, useEffect, useRef } from "react";
import "./style.css";
import { LicensePlate } from "./components";

export default function App() {
  const eye = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (eye.current) {
      const handleMouseMove = (evt: any) => {
        const x = -(window.innerWidth / 2 - evt.pageX) / 300;
        const y = -(window.innerHeight / 2 - evt.pageY) / 300;
        if (eye.current) {
          eye.current.style.transform = `translateY(${y}px) translateX(${x}px)`;
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [eye, eye.current]);

  return (
    <Fragment>
      <div className="left-eye">
        <svg viewBox="0 0 21 21">
          <circle
            ref={eye}
            className="eye eye-left"
            cx="10.5"
            cy="10.5"
            r="2.25"
          ></circle>
          <path
            className="top"
            d="M2 10.5C2 10.5 6.43686 5.5 10.5 5.5C14.5631 5.5 19 10.5 19 10.5"
          ></path>
          <path
            className="bottom"
            d="M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5"
          ></path>
        </svg>
        <h1 className="title">MYSCRV Lens</h1>
      </div>
      <LicensePlate />
    </Fragment>
  );
}
