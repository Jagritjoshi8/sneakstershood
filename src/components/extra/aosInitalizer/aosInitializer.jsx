import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInitializer = ({ children }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return <>{children}</>;
};

export default AOSInitializer;
