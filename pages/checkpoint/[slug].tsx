"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

import "../../app/globals.css";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { checkpoints } from "./checkpoints";

export default function Page() {
  const router = useRouter();
  const controls = useAnimation();
  useEffect(() => {
    history.pushState(null, "", router.asPath);
    window.addEventListener("popstate", function (event) {
      history.pushState(null, "", router.asPath);
    });
  }, [router.asPath]);
  const [verified, setVerified] = useState(false);
  const [cheater, setCheater] = useState(false);
  if (typeof window === "undefined" || sessionStorage === undefined) {
    return;
  }
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");
  let slug = router.query.slug;
  if (slug === undefined) {
    return;
  }
  if (Array.isArray(slug)) {
    slug = slug[0];
  }
  const checkpoint = checkpoints[slug ?? "0"];
  if (checkpoint === undefined) {
    router.push("/");
    return;
  }
  console.log("checkpoint", checkpoint);
  // Allocate a ref for each input if the type is input
  const inputRefs: { [key: number]: React.RefObject<HTMLInputElement> } = {};
  if (checkpoint.type === "input") {
    for (let i = 0; i < checkpoint.buttons.length; i++) {
      inputRefs[i] = React.createRef<HTMLInputElement>();
    }
  }
  if (checkpoint === undefined) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
        <div className="text-4xl font-bold">Tuto část příběhu jsme nenašli</div>
        <div className="text-2xl">
          Tohle by se nemělo stát, zkus se vrátit na{" "}
          <Link href={"/"}>domovní stránku</Link>.<br />
          Pokud problém přetrvá, řekni někomu z organizátorů.
        </div>
      </div>
    );
  }

  if (!verified) {
    tryProgress("");
    setVerified(true);
  }

  function tryProgress(ncp: string) {
    fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        ncp: ncp,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.checkpoint != slug && ncp === "") {
          console.log(
            "Slug is `" +
              slug +
              "`, but checkpoint is `" +
              data.checkpoint +
              "`.",
          );
          if (!username?.startsWith("test")) {
            setCheater(true);
            router.push(`/checkpoint/${data.checkpoint}`);
          }
        } else {
          router.push(`/checkpoint/${data.checkpoint}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function validateInput() {
    // Go through all buttons on this checkpoint, and if the input matches any of them, progress to the buttons, checkpoint
    for (let i = 0; i < checkpoint.buttons.length; i++) {
      let iref = inputRefs[i];
      let button = checkpoint.buttons[i];
      // validate if the input is the same as the button text, first trim, lower case, and remove all non-alphanumeric characters
      if (
        iref.current?.value
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "") ===
        button.text
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
      ) {
        //good
        continue;
      } else {
        //bad
        return;
      }
    }

    // If we got here, all inputs were correct
    tryProgress(checkpoint.buttons[0].checkpoint);
  }

  if (cheater) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
        <div className="text-4xl font-bold">Podvodníku!</div>
        <div className="text-2xl">
          Tady nemáš co dělat! Vrať se spátky a už se o tohle znovu nepokoušej!
        </div>
      </div>
    );
  }

  let currentInput = "";
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentInput = e.target.value;
  };

  function renderInput(): JSX.Element {
    switch (checkpoint.type) {
      case "input":
        return (
          <div>
            {checkpoint.buttons.map((button, i) => {
              return (
                <div key={button.checkpoint}>
                  <div className="text-2xl">{button.beforeInput}</div>
                  <Input ref={inputRefs[i]} placeholder={button.placeholder} />
                </div>
              );
            })}
            <Button
              onClick={validateInput}
              className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Vyhodnotit
            </Button>
          </div>
        );
      case "choice":
        return (
          <div>
            {checkpoint.buttons.map((button) => (
              <Button
                key={button.checkpoint}
                onClick={() => tryProgress(button.checkpoint)}
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded mt-4"
              >
                {button.text}
              </Button>
            ))}
          </div>
        );
      case "title":
        setTimeout(() => {
          controls.start({ scale: 0.85, opacity: 0 });
        }, 50);
        setTimeout(() => {
          controls.start({ scale: 1, opacity: 1 });
        }, 250);
        setTimeout(
          () => {
            tryProgress(checkpoint.buttons[0].checkpoint);
          },
          ((checkpoint.text.split(/\s+/).length / 200) * 60 + 2) * 1000,
        );
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="text-4xl font-bold">{checkpoint.text}</div>
          </motion.div>
        );
      case "end":
        return (
          <div>
            <div className="text-4xl font-bold">{checkpoint.text}</div>

            <div className="text-4xl font-bold">Děkujeme za hru!</div>
          </div>
        );
      default:
        return <div>Unknown type: {checkpoint.type}</div>;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white p-32">
      {checkpoint.type == "choice" ? (
        <div className="text-2xl font-bold">{checkpoint.text}</div>
      ) : null}
      {renderInput()}
    </div>
  );
}
