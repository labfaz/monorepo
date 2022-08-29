import React, { FC, useState, useEffect, Dispatch, SetStateAction } from "react";

import { SkipContent } from "./style";

type TSkipNavProps = {
  updateParentContrasted?: Dispatch<SetStateAction<boolean>>;
}
export const Web: FC<TSkipNavProps> = (props) => {
  const [isContrasted, setIsContrasted] = useState(false);

  const toggleHighContrast = () => {
    let contrastedState = !isContrasted;
    setIsContrasted(contrastedState);
    if (props && props.updateParentContrasted) {
      props.updateParentContrasted(contrastedState)
    }
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (
      event.target === null ||
      (event.target && (event.target as HTMLElement).tagName === "BODY")
    ) {
      if (event.code === "Digit1") {
        const button = document.getElementById("content-anchor");
        if (button) button.click();
      } else if (event.code === "Digit2") {
        const button = document.getElementById("footer-anchor");
        if (button) button.click();
      } else if (event.code === "Digit3") {
        const button = document.getElementById("high-contrast-btn");
        if (button) button.click();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) => handleKeyPress(event));

    return () => {
      window.removeEventListener("keydown", (event) => handleKeyPress(event));
    };
  });

  return (
    <SkipContent>
      <a id="content-anchor" href="#content">
        Conteúdo <span className="keysNum">1</span>
      </a>
      <span>|</span>
      <a id="footer-anchor" href="#footer">
        Rodapé <span className="keysNum">2</span>
      </a>
      <span>|</span>
      <button id="high-contrast-btn" onClick={() => toggleHighContrast()}>
        Alto Contraste <span className="keysNum">3</span>
      </button>
    </SkipContent>
  );
};

export default Web;
