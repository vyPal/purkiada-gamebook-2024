import React, { useEffect, useState } from "react";
import "../app/globals.css";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { LoginForm } from "@/components/custom/login";

const HomePage = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [cheating, setCheating] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1 });
    const targetDate = new Date("2025-02-05T09:00:00+01:00"); // TODO nastavit správný čas
    const currentDate = new Date();

    if (currentDate >= targetDate) {
      setAccessGranted(true);
    } else {
      sessionStorage.removeItem("imanok");
    }

    let konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
      "Enter",
    ];
    let konamiCodePosition = 0;

    const keydownHandler = (e: any) => {
      const key = e.key;

      if (key === konamiCode[konamiCodePosition]) {
        konamiCodePosition++;

        switch (key) {
          case "ArrowUp":
            controls.start({ translateY: -50 });
            break;
          case "ArrowDown":
            controls.start({ translateY: 50 });
            break;
          case "ArrowLeft":
            controls.start({ translateX: -50 });
            break;
          case "ArrowRight":
            controls.start({ translateX: 50 });
            break;
          case "b":
          case "a":
            controls.start({ scale: 1.15 });
            break;
          case "Enter":
            controls.start({ scale: 0.85, opacity: 0 });
            break;
        }

        setTimeout(() => {
          controls.start({
            translateY: 0,
            translateX: 0,
            scale: 1,
            opacity: 1,
          });
        }, 50);

        if (konamiCodePosition === konamiCode.length) {
          setAccessGranted(true);
          setCheating(true);
          sessionStorage.setItem("imanok", "true");
          konamiCodePosition = 0;
        }
      } else {
        konamiCodePosition = 0;
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [controls]);

  if (!accessGranted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="p-6 max-w-sm mx-auto bg-gray-800 rounded-xl shadow-md flex items-center space-x-4">
            <div>
              <div className="text-xl font-medium text-white">
                Soutěž ještě nebyla zahájena
              </div>
              <p className="text-gray-400">
                Prosíme počkejte na zahájení. Pokud se snažíte aplikaci
                testovat, tak víte co dělat ; )
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default HomePage;
