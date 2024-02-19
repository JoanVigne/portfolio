import React, { useEffect, useRef, useState } from "react";
import "./sectionBanniere.css";

const SectionBanniere = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const initialTranslateX = useRef<number>(0);
  const lastScrollTop = useRef<number>(0);
  const [upOrDown, setUpOrDown] = useState<boolean>(true);

  useEffect(() => {
    const h1Element = h1Ref.current;
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

        if (newTranslateX <= -250) {
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
        if (newTranslateX >= 250) {
          setUpOrDown(true);
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

        reverseUpdateTranslateX();
      } else if (currentScroll < lastScrollTop.current) {
        setUpOrDown(true);

        updateTranslateX();
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
  }, [upOrDown]);

  function handleClick() {
    initialTranslateX.current = 250;
  }
  return (
    <section className="section-banniere">
      <h1 ref={h1Ref} onClick={handleClick}>
        JOAN VIGNE - WEB DEVELOPER{" "}
      </h1>

      <img
        className="piracy-pic"
        src="/piracy-is-a-crime.png"
        alt=""
        loading="lazy"
      />
    </section>
  );
};
export default SectionBanniere;
