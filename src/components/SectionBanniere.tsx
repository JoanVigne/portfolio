import React, { useEffect, useRef, useState } from "react";
import "./sectionBanniere.css";

const SectionBanniere = () => {
  const h1Ref = useRef(null);
  const initialTranslateX = useRef(0);
  const lastScrollTop = useRef(0);
  const [upOrDown, setUpOrDown] = useState(true);

  useEffect(() => {
    const h1Element = h1Ref.current;
    console.log("initialTranslateX", initialTranslateX);
    if (h1Element) {
      const matrix = new DOMMatrix(
        window.getComputedStyle(h1Element).transform
      );
      initialTranslateX.current = matrix.m41;
    }

    const updateTranslateX = () => {
      const h1Element = h1Ref.current;
      if (h1Element) {
        const newTranslateX = initialTranslateX.current - 5;
        console.log("newTranslateX:", newTranslateX);
        if (newTranslateX <= -550) {
          setUpOrDown(false);
          return;
        }

        h1Element.style.transform = `translateX(${newTranslateX}px)`;
        initialTranslateX.current = newTranslateX;
      }
    };

    const reverseUpdateTranslateX = () => {
      const h1Element = h1Ref.current;
      if (h1Element) {
        const newTranslateX = initialTranslateX.current + 5;
        if (newTranslateX >= 550) {
          setUpOrDown(true);
          console.log("Setting upOrDown to true", upOrDown);
          return;
        }
        h1Element.style.transform = `translateX(${newTranslateX}px)`;
        initialTranslateX.current = newTranslateX;
      }
    };

    const scrollHandle = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollTop.current) {
        setUpOrDown(false);
        console.log("Scroll down");
        reverseUpdateTranslateX();
        console.log(upOrDown);
      } else if (currentScroll < lastScrollTop.current) {
        console.log("Scroll up");

        setUpOrDown(true);

        updateTranslateX();
        console.log(upOrDown);
      }
      lastScrollTop.current = currentScroll;
    };

    window.addEventListener("scroll", scrollHandle);
    if (upOrDown) {
      const intervalId = setInterval(updateTranslateX, 50);
      return () => {
        clearInterval(intervalId);
        window.removeEventListener("scroll", scrollHandle);
      };
    }
    if (!upOrDown) {
      const reverseIntervalId = setInterval(reverseUpdateTranslateX, 50);
      return () => {
        clearInterval(reverseIntervalId);
        window.removeEventListener("scroll", scrollHandle);
      };
    }
    console.log(upOrDown);
    /* const intervalId = setInterval(updateTranslateX, 50);

    const reverseIntervalId = setInterval(reverseUpdateTranslateX, 50); */

    /* const intervalId = setInterval(updateTranslateX, 50); */

    // Attache l'événement de défilement

    /* return () => {
      if (upOrDown === true) {
        clearInterval(intervalId);
      }
      if (upOrDown === false) {
        clearInterval(reverseIntervalId);
      } */
    /*  clearInterval(intervalId); */
    /*  window.removeEventListener("scroll", scrollHandle); 
    };*/
  }, [upOrDown]);

  return (
    <section className="section-banniere">
      <h1 ref={h1Ref}>
        JOAN VIGNE - WEB DEVELOPER{" "}
        {/* - JOAN VIGNE - WEB DEVELOPER - JOAN VIGNE -
        WEB DEVELOPER - JOAN VIGNE - WEB DEVELOPER - JOAN VIGNE - WEB DEVELOPER
        - */}
      </h1>
    </section>
  );
};
export default SectionBanniere;
