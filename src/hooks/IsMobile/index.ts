import { useEffect, useState } from "react";

const useDeviceDetection = () => {
  const [isMobile, setMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setMobile(window.innerWidth <= 800);
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, windowWidth };
};

export default useDeviceDetection;
