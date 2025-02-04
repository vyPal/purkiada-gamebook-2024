"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

import "../../app/globals.css";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { motion, useMotionValue, useAnimation } from "framer-motion";

const checkpoints: {
  [key: string]: {
    text: string;
    type: string;
    buttons: {
      text: string;
      beforeInput: string;
      placeholder: string;
      checkpoint: string;
    }[];
    name: string;
  };
} = {
  "0": {
    text: "Úspěšně přežij den ve škole!",
    type: "title",
    buttons: [
      {
        text: "Začít",
        beforeInput: "",
        placeholder: "",
        checkpoint: "1",
      },
    ],
    name: "Start",
  },
  "1": {
    text: "Vkročil jsi do školy, tvojí první výzvou je dostat se přes turniket. Doplň následující posloupnost: 2, 6, 18, 54, __, __, __",
    type: "choice",
    buttons: [
      {
        text: "162, 486, 1458",
        beforeInput: "",
        placeholder: "",
        checkpoint: "2",
      },
      {
        text: "60, 70, 80",
        beforeInput: "",
        placeholder: "",
        checkpoint: "1a",
      },
      {
        text: "55, 56, 57",
        beforeInput: "",
        placeholder: "",
        checkpoint: "1b",
      },
    ],
    name: "Turniket",
  },
  "1a": {
    text: "Neprošel jsi, paní vrátná tě vyhání koštětem!!!!",
    type: "title",
    buttons: [
      {
        text: "Konec",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Vyhazov",
  },
  "1b": {
    text: "Špatná odpověď, zkus to znovu později.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "1",
      },
    ],
    name: "Špatná odpověď",
  },
  "2": {
    text: "Úspěšně jsi prošel přes turniket, teď těžší úkol: vyjdi schody. Vyber správné použití slova v kontextu: 'Měl bys dodržovat ______ morálky.'",
    type: "choice",
    buttons: [
      {
        text: "Principle",
        beforeInput: "",
        placeholder: "",
        checkpoint: "3",
      },
      {
        text: "Principal",
        beforeInput: "",
        placeholder: "",
        checkpoint: "2a",
      },
    ],
    name: "Schody",
  },
  "2a": {
    text: "Neprošel jsi, spadl jsi ze schodů a narazil sis musculus gluteus maximus!",
    type: "title",
    buttons: [
      {
        text: "Konec",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Pád",
  },
  "3": {
    text: "Dobrá práce, vejdi do třídy a představ se paní učitelce. Kolik je 19 na druhou?",
    type: "choice",
    buttons: [
      {
        text: "361",
        beforeInput: "",
        placeholder: "",
        checkpoint: "4",
      },
      {
        text: "289",
        beforeInput: "",
        placeholder: "",
        checkpoint: "3a",
      },
      {
        text: "324",
        beforeInput: "",
        placeholder: "",
        checkpoint: "3b",
      },
    ],
    name: "Představení",
  },
  "3a": {
    text: "Neprošel jsi, celou dobu ses šťoural v nose a paní učitelka tě poslala domů!",
    type: "title",
    buttons: [
      {
        text: "Konec",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Vyhození z třídy",
  },
  "3b": {
    text: "Špatně, zkus to znovu",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "3",
      },
    ],
    name: "Špatná odpověď",
  },
  "4": {
    text: "Skvěle, vyber si s kým se budeš bavit.",
    type: "choice",
    buttons: [
      {
        text: "S klukem co hraje League of Legends",
        beforeInput: "",
        placeholder: "",
        checkpoint: "4a",
      },
      {
        text: "S holkou, co čte knížky",
        beforeInput: "",
        placeholder: "",
        checkpoint: "5",
      },
    ],
    name: "Výběr kamaráda",
  },
  "4a": {
    text: "Neprošel jsi, vybral sis spolužáka, který hraje League of Legends a celou přestávku jste se hádali o nejlepší buildy!",
    type: "title",
    buttons: [
      {
        text: "Konec",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Špatný kamarád",
  },
  "5": {
    text: "Určitě budete dobří kamarádi, připrav se do hodiny.",
    type: "choice",
    buttons: [
      {
        text: "Učit se",
        beforeInput: "",
        placeholder: "",
        checkpoint: "6",
      },
      {
        text: "Bavit se se spolužáky",
        beforeInput: "",
        placeholder: "",
        checkpoint: "5a",
      },
    ],
    name: "Příprava na hodinu",
  },
  "5a": {
    text: "Neprošel jsi, celou přestávku jsi si povídal se spolužáky a nic jsi se nenaučil",
    type: "title",
    buttons: [
      {
        text: "Konec",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Nepřipravený",
  },
  "6": {
    text: "Připravil ses akorát v čas, teď se rozhodni co budeš dělat v hodině.",
    type: "choice",
    buttons: [
      {
        text: "Dávat pozor",
        beforeInput: "",
        placeholder: "",
        checkpoint: "7",
      },
      {
        text: "Sledovat videa tancujících koček na mobilu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "6a",
      },
    ],
    name: "Hodina",
  },
  "6a": {
    text: "Neprošel jsi, celou hodinu jsi sledoval videa tancujících koček na mobilu a dostal jsi pětku!",
    type: "title",
    buttons: [
      {
        text: "Konec",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Pětka",
  },
  "7": {
    text: "Úspěšně jsi přežil všechny hodiny, teď běž do jídelny.",
    type: "choice",
    buttons: [
      {
        text: "Jít do jídelny",
        beforeInput: "",
        placeholder: "",
        checkpoint: "8",
      },
      {
        text: "Zakopnout o banán",
        beforeInput: "",
        placeholder: "",
        checkpoint: "7a",
      },
    ],
    name: "Cesta do jídelny",
  },
  "7a": {
    text: "Neprošel jsi, na cestě na oběd jsi stoupl na banán a spadl.",
    type: "title",
    buttons: [
      {
        text: "Konec",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Pád na banánu",
  },
  "8": {
    text: "Dorazil jsi na oběd, vyber si které jídlo si dáš.",
    type: "choice",
    buttons: [
      {
        text: "Rajskou omáčku",
        beforeInput: "",
        placeholder: "",
        checkpoint: "9",
      },
      {
        text: "Dělat obličeje na kuchařku",
        beforeInput: "",
        placeholder: "",
        checkpoint: "8a",
      },
    ],
    name: "Oběd",
  },
  "8a": {
    text: "Neprošel jsi, dělal jsi na paní kuchařku obličeje a ona ti plivla do jídla!",
    type: "title",
    buttons: [
      {
        text: "Konec",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Plivanec",
  },
  "9": {
    text: "Dobrá volba, teď jen vyjdi ze školy.",
    type: "choice",
    buttons: [
      {
        text: "Vyjít ze školy",
        beforeInput: "",
        placeholder: "",
        checkpoint: "10",
      },
      {
        text: "Podlézt turnikety",
        beforeInput: "",
        placeholder: "",
        checkpoint: "9a",
      },
    ],
    name: "Odchod ze školy",
  },
  "9a": {
    text: "Neprošel jsi, podlezl jsi turnikety a byl jsi zadržen policií ČR!",
    type: "title",
    buttons: [
      {
        text: "Konec",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Zadržení policií",
  },
  "10": {
    text: "Úspěšně jsi vylezl ze školy, tímto jsi zvládl celý den!",
    type: "end",
    buttons: [],
    name: "Konec Dne",
  },
};

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
