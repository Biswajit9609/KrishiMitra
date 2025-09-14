"use client";;
import { Moon, SunDim } from "lucide-react";
import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

export const AnimatedThemeToggler = ({
  className
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const buttonRef = useRef(null);
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    if (document.startViewTransition) {
      await document.startViewTransition(() => {
        flushSync(() => {
          const dark = document.documentElement.classList.toggle("dark");
          setIsDarkMode(dark);
        });
      }).ready;

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const y = top + height / 2;
      const x = left + width / 2;

      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      document.documentElement.animate({
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      }, {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      });
    } else {
      // Fallback for browsers without View Transition API
      const dark = document.documentElement.classList.toggle("dark");
      setIsDarkMode(dark);
    }
  };
  return (
    <button 
      ref={buttonRef} 
      onClick={changeTheme} 
      className={cn("p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors", className)}
    >
      {isDarkMode ? <SunDim className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};
