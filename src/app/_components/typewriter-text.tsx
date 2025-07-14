"use client";

import { useState, useEffect } from "react";

type TypewriterTextProps = {
  texts: string[];
  speed?: number;
  pauseTime?: number;
  className?: string;
  onComplete?: () => void;
  isActive?: boolean;
};

export function TypewriterText({
  texts,
  speed = 80,
  pauseTime = 2000,
  className = "",
  onComplete,
  isActive = true,
}: TypewriterTextProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isActive || texts.length === 0) return;

    let timeout: NodeJS.Timeout;

    const typeText = () => {
      const fullText = texts[currentIndex];
      if (!fullText) return;

      setIsTyping(true);

      let charIndex = 0;
      const typeChar = () => {
        if (charIndex <= fullText.length) {
          setCurrentText(fullText.slice(0, charIndex));
          charIndex++;
          timeout = setTimeout(typeChar, speed);
        } else {
          setIsTyping(false);
          onComplete?.();

          // Pause before moving to next text
          timeout = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }, pauseTime);
        }
      };

      typeChar();
    };

    // Start typing after a short delay
    timeout = setTimeout(typeText, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex, texts, speed, pauseTime, isActive, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <span
        className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
      >
        |
      </span>
    </span>
  );
}
