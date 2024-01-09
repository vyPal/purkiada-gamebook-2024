import React from "react";
import "../app/globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion';
import { LoginForm } from "@/components/custom/login";

export default class HomePage extends React.Component {
  state = {
    loginPage: false,
    accessGranted: false
  };

  constructor(props: React.PropsWithChildren) {
    super(props);
  
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    const targetDate = new Date("2023-21-01"); // TODO změnit datum
    const currentDate = new Date();

    if (currentDate >= targetDate) {
      this.setState({ accessGranted: true });
    } else {
      sessionStorage.removeItem("imanok");
    }

    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
    let konamiCodePosition = 0;

    document.addEventListener('keydown', (e) => {
      const key = e.key;

      if (key === konamiCode[konamiCodePosition]) {
        konamiCodePosition++;

        if (konamiCodePosition === konamiCode.length) {
          this.setState({ accessGranted: true });
          sessionStorage.setItem("imanok", "true");
          konamiCodePosition = 0;
        }
      } else {
        konamiCodePosition = 0;
      }
    });
  }

  login() {
    this.setState({ loginPage: true });
  }

  render(): React.ReactNode {
    if (!this.state.accessGranted) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="p-6 max-w-sm mx-auto bg-gray-800 rounded-xl shadow-md flex items-center space-x-4">
              <div>
                <div className="text-xl font-medium text-white">Soutěž ještě nebyla zahájena</div>
                <p className="text-gray-400">Prosíme počkejte na zahájení. Pokud se snažíte aplikaci testovat, tak víte co dělat ; )</p>
              </div>
            </div>
          </motion.div>
        </div>
      )
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
  }
}