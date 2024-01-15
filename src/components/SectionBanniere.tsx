import React, { useEffect, useRef } from "react";
import "./sectionBanniere.css";

const SectionBanniere = () => {
  /*  const scrollingTextRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollingText = scrollingTextRef.current;

      if (scrollingText) {
        const scrollPosition = window.scrollY;
        const translateValue = scrollPosition % (scrollingText.offsetWidth * 2);

        const additionalTranslate = scrollPosition * 4;

        scrollingText.style.transform = `translate( ${
          translateValue + additionalTranslate
        }px,-50%)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); */
  return (
    <section className="section-banniere">
      <h1 /* ref={scrollingTextRef} */>
        JOAN VIGNE - WEB DEVELOPER - JOAN VIGNE - WEB DEVELOPER - JOAN VIGNE -
        WEB DEVELOPER - JOAN VIGNE - WEB DEVELOPER - JOAN VIGNE - WEB DEVELOPER
        -
      </h1>
    </section>
  );
};

export default SectionBanniere;
