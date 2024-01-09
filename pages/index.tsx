import React from "react";
import "../app/globals.css";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { motion } from 'framer-motion';

export default class HomePage extends React.Component {
  state = {
    accessGranted: false,
  };

  componentDidMount() {
    const targetDate = new Date("2023-21-01"); // Set your target date here
    const currentDate = new Date();

    if (currentDate >= targetDate) {
      this.setState({ accessGranted: true });
    }

    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
    let konamiCodePosition = 0;

    document.addEventListener('keydown', (e) => {
      const key = e.key;

      if (key === konamiCode[konamiCodePosition]) {
        console.log("Found key: " + key + " at position " + konamiCodePosition + " of " + konamiCode.length)
        konamiCodePosition++;

        if (konamiCodePosition === konamiCode.length) {
          this.setState({ accessGranted: true });
          setTimeout(() => {
            this.setState({ showContinueButton: true });
          }, 5000);
          konamiCodePosition = 0;
        }
      } else {
        console.log("Resetting konami code position, because " + key + " is not " + konamiCode[konamiCodePosition] + " at position " + konamiCodePosition + " of " + konamiCode.length)
        konamiCodePosition = 0;
      }
    });
  }

  render(): React.ReactNode {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {!this.state.accessGranted ? (
              <div className="p-6 max-w-sm mx-auto bg-gray-800 rounded-xl shadow-md flex items-center space-x-4">
                <div>
                  <div className="text-xl font-medium text-white">Soutěž ještě nebyla zahájena</div>
                  <p className="text-gray-400">Prosíme počkejte na zahájení. Pokud se snažíte aplikaci testovat, tak víte co dělat ; )</p>
                </div>
              </div>
          ) : (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-white text-2xl font-medium mb-4">
                  Existuje mnoho cest, které můžete vybrat.
                  Některé jsou špatné, některé jsou dobré.
                  Ale jedna je ta pravá.
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="flex justify-center"
              >
                <Link href="/login" className={buttonVariants({ variant: "outline" })}>Pokračovat</Link>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }
}