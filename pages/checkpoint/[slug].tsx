"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

import "../../app/globals.css";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { motion, useMotionValue, useAnimation } from "framer-motion";

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
    text: "Úspěšně přežij den ve škole",
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
    text: "Vkročil jsi do školy, tvojí první výzvou je dostat se přes turniket. Podle toho jak vyřešíš tento úkol rozhodneme, zda můžeš přes turniket projít.",
    type: "choice",
    buttons: [
      {
        text: "2, 6, 18, 54, 162, 486, 1458",
        beforeInput: "",
        placeholder: "",
        checkpoint: "2",
      },
      {
        text: "2, 6, 18, 54, 160, 480, 1440",
        beforeInput: "",
        placeholder: "",
        checkpoint: "1a",
      },
      {
        text: "2, 6, 12, 36, 108, 324, 972",
        beforeInput: "",
        placeholder: "",
        checkpoint: "1a",
      },
    ],
    name: "Turniket",
  },
  "1a": {
    text: "Neprošel jsi, paní vrátné tě vyhání koštětem!!!!",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Vyhazov",
  },
  "2": {
    text: "Úspěšně jsi prošel přes turniket, teď nachází těžší úkol, vyjít schody. Doplň: The ________ believes in strong ________.",
    type: "choice",
    buttons: [
      {
        text: "principal, principles",
        beforeInput: "",
        placeholder: "",
        checkpoint: "3",
      },
      {
        text: "principle, principals",
        beforeInput: "",
        placeholder: "",
        checkpoint: "2a",
      },
    ],
    name: "Schody",
  },
  "2a": {
    text: "Neprošel jsi, spadl jsi ze schodů a narazil si musculus gluteus maximus",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Pád",
  },
  "3": {
    text: "Dobrá práce, vejdi do třídy a představ se paní uřitelce. Kolik je 19 na druhou?",
    type: "choice",
    buttons: [
      {
        text: "351",
        beforeInput: "",
        placeholder: "",
        checkpoint: "3a",
      },
      {
        text: "371",
        beforeInput: "",
        placeholder: "",
        checkpoint: "3a",
      },
      {
        text: "361",
        beforeInput: "",
        placeholder: "",
        checkpoint: "4",
      },
      {
        text: "381",
        beforeInput: "",
        placeholder: "",
        checkpoint: "3a",
      },
    ],
    name: "Představení",
  },
  "3a": {
    text: "Špatně jsi spočítal devatenáct na druhou, paní učitelka tě zesměšnila před celou třídou.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Zesměšnění",
  },
  "4": {
    text: "Skvělé, nyní si vyber s kým se budeš bavit.",
    type: "choice",
    buttons: [
      {
        text: "Spolužák, který hraje League of Legends",
        beforeInput: "",
        placeholder: "",
        checkpoint: "5",
      },
      {
        text: "Spolužačka, která si kreslí do sešitu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "6",
      },
      {
        text: "Spolužák, který vypadá, že má rád programování",
        beforeInput: "",
        placeholder: "",
        checkpoint: "7",
      },
      {
        text: "Spolužačka, která čte knihu o umělé inteligenci",
        beforeInput: "",
        placeholder: "",
        checkpoint: "8",
      },
    ],
    name: "Výběr kamaráda",
  },
  "5": {
    text: "Určitě se s ním skamarádíš, ale zdá se, že má pro tebe hádanku. Kolik je 7 * 8",
    type: "choice",
    buttons: [
      {
        text: "54",
        beforeInput: "",
        placeholder: "",
        checkpoint: "5a",
      },
      {
        text: "55",
        beforeInput: "",
        placeholder: "",
        checkpoint: "5a",
      },
      {
        text: "56",
        beforeInput: "",
        placeholder: "",
        checkpoint: "9",
      },
      {
        text: "57",
        beforeInput: "",
        placeholder: "",
        checkpoint: "5a",
      },
    ],
    name: "Hádanka LoL hráče",
  },
  "5a": {
    text: "Neuhádl jsi hádanku a on se ti vysmál, League of Legends hráči nemají rádi hlupáky.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Výsměch LoL hráče",
  },
  "6": {
    text: "Spolužačka se usmívá, zdá se, že má pro tebe uměleckou otázku. Jaká barva vznikne smícháním modré a žluté?",
    type: "choice",
    buttons: [
      {
        text: "Červená",
        beforeInput: "",
        placeholder: "",
        checkpoint: "6a",
      },
      {
        text: "Oranžová",
        beforeInput: "",
        placeholder: "",
        checkpoint: "6a",
      },
      {
        text: "Zelená",
        beforeInput: "",
        placeholder: "",
        checkpoint: "14",
      },
      {
        text: "Fialová",
        beforeInput: "",
        placeholder: "",
        checkpoint: "6a",
      },
    ],
    name: "Umělecká otázka",
  },
  "6a": {
    text: "Neodpověděl jsi uměleckou otázku a spolužačka se na tebe zamračila, umělci nemají rádi ignoranty.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Zamračení",
  },
  "7": {
    text: "Zdá se, že programátor má pro tebe logickou hádanku. Co je vždycky před tebou, ale nikdy ho nedohoníš?",
    type: "choice",
    buttons: [
      {
        text: "Včerejšek",
        beforeInput: "",
        placeholder: "",
        checkpoint: "7a",
      },
      {
        text: "Přítomnost",
        beforeInput: "",
        placeholder: "",
        checkpoint: "7a",
      },
      {
        text: "Budoucnost",
        beforeInput: "",
        placeholder: "",
        checkpoint: "19",
      },
      {
        text: "Minulost",
        beforeInput: "",
        placeholder: "",
        checkpoint: "7a",
      },
    ],
    name: "Logická hádanka",
  },
  "7a": {
    text: "Neuhádl jsi logickou hádanku a programátor se otočil zpět k svému kódu, logici nemají čas na hlupáky.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Ignorace",
  },
  "8": {
    text: "Spolužačka se usmívá, vypadá, že má pro tebe otázku z umělé inteligence. Ale možná je to jen hádanka. Co je to: čím víc toho ubývá, tím je to větší?",
    type: "choice",
    buttons: [
      {
        text: "Tma",
        beforeInput: "",
        placeholder: "",
        checkpoint: "8a",
      },
      {
        text: "Díra",
        beforeInput: "",
        placeholder: "",
        checkpoint: "24",
      },
      {
        text: "Hloubka",
        beforeInput: "",
        placeholder: "",
        checkpoint: "8a",
      },
      {
        text: "Nic",
        beforeInput: "",
        placeholder: "",
        checkpoint: "8a",
      },
    ],
    name: "AI hádanka",
  },
  "8a": {
    text: "Neodpověděl jsi hádanku a spolužačka se vrátila ke své knize, chytré hlavy nemají čas na pomalé myslitele.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Zpět ke knize",
  },
  "9": {
    text: 'Skvělé, přežil jsi konverzaci s League of Legends hráčem, teď musíš přežít hodinu. Vyber správné slovo pro větu: "Everyone ______ Peter came on time."',
    type: "choice",
    buttons: [
      {
        text: "Accept",
        beforeInput: "",
        placeholder: "",
        checkpoint: "9a",
      },
      {
        text: "Except",
        beforeInput: "",
        placeholder: "",
        checkpoint: "10",
      },
      {
        text: "Expect",
        beforeInput: "",
        placeholder: "",
        checkpoint: "9a",
      },
      {
        text: "Accent",
        beforeInput: "",
        placeholder: "",
        checkpoint: "9a",
      },
    ],
    name: "Přežití hodiny",
  },
  "9a": {
    text: "Nepřežil jsi hodinu, celou dobu sis hrál s propiskou a paní učitelka tě vyhodila.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Vyhození z hodiny",
  },
  "10": {
    text: "Hodina utekla jako voda, je přestávka, co budeš dělat? Jaké je hlavní město Slovenska?",
    type: "choice",
    buttons: [
      {
        text: "Praha",
        beforeInput: "",
        placeholder: "",
        checkpoint: "10a",
      },
      {
        text: "Budapešť",
        beforeInput: "",
        placeholder: "",
        checkpoint: "10a",
      },
      {
        text: "Bratislava",
        beforeInput: "",
        placeholder: "",
        checkpoint: "11",
      },
      {
        text: "Vídeň",
        beforeInput: "",
        placeholder: "",
        checkpoint: "10a",
      },
    ],
    name: "Přestávka",
  },
  "10a": {
    text: "Nepřežil jsi přestávku, zakopl jsi o spolužáka a vylil sis pití na kalhoty.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Polití kalhot",
  },
  "11": {
    text: "Přestávka je za tebou, jdeš na oběd? Kolik je 15 * 15?",
    type: "choice",
    buttons: [
      {
        text: "220",
        beforeInput: "",
        placeholder: "",
        checkpoint: "11a",
      },
      {
        text: "230",
        beforeInput: "",
        placeholder: "",
        checkpoint: "11a",
      },
      {
        text: "225",
        beforeInput: "",
        placeholder: "",
        checkpoint: "12",
      },
      {
        text: "240",
        beforeInput: "",
        placeholder: "",
        checkpoint: "11a",
      },
    ],
    name: "Oběd",
  },
  "11a": {
    text: "Nešel jsi na oběd, protože jsi si myslel, že jsi moc cool na školní jídlo a omdlel jsi hlady.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Omdlení",
  },
  "12": {
    text: "Oběd byl fajn, zbývá už jen konec školy. Co má město, hory i vodu, ale žádné domy, stromy ani ryby?",
    type: "choice",
    buttons: [
      {
        text: "Mapa",
        beforeInput: "",
        placeholder: "",
        checkpoint: "13",
      },
      {
        text: "Fotka",
        beforeInput: "",
        placeholder: "",
        checkpoint: "12a",
      },
      {
        text: "Krajina",
        beforeInput: "",
        placeholder: "",
        checkpoint: "12a",
      },
      {
        text: "Sen",
        beforeInput: "",
        placeholder: "",
        checkpoint: "12a",
      },
    ],
    name: "Konec školy",
  },
  "12a": {
    text: "Konec školy nedorazil, protože jsi se zamotal do dveří a zlomil sis nos.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Zlomený nos",
  },
  "13": {
    text: "Úspěšně jsi přežil den ve škole! Gratuluji!",
    type: "end",
    buttons: [],
    name: "Konec",
  },
  "14": {
    text: "Správně, uměleckou otázku jsi zvládl, teď musíš přežít hodinu matematiky. Kolik je 12 * 12?",
    type: "choice",
    buttons: [
      {
        text: "140",
        beforeInput: "",
        placeholder: "",
        checkpoint: "14a",
      },
      {
        text: "142",
        beforeInput: "",
        placeholder: "",
        checkpoint: "14a",
      },
      {
        text: "144",
        beforeInput: "",
        placeholder: "",
        checkpoint: "15",
      },
      {
        text: "146",
        beforeInput: "",
        placeholder: "",
        checkpoint: "14a",
      },
    ],
    name: "Matematika",
  },
  "14a": {
    text: "Nepřežil jsi hodinu matematiky, usnul jsi nudou a dostal jsi pětku.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Pětka",
  },
  "15": {
    text: "Matematika byla nuda, ale přežil jsi, je přestávka, co děláš? Jaké je hlavní město Německa?",
    type: "choice",
    buttons: [
      {
        text: "Mnichov",
        beforeInput: "",
        placeholder: "",
        checkpoint: "15a",
      },
      {
        text: "Hamburk",
        beforeInput: "",
        placeholder: "",
        checkpoint: "15a",
      },
      {
        text: "Berlín",
        beforeInput: "",
        placeholder: "",
        checkpoint: "16",
      },
      {
        text: "Kolín nad Rýnem",
        beforeInput: "",
        placeholder: "",
        checkpoint: "15a",
      },
    ],
    name: "Přestávka",
  },
  "15a": {
    text: "Nepřežil jsi přestávku, chtěl jsi si kopnout s míčem a trefil jsi ředitele do hlavy.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Ředitel",
  },
  "16": {
    text: "Přestávka s ředitelem se obešla bez následků, jdeš na oběd? Co má krk, ale nemá hlavu?",
    type: "choice",
    buttons: [
      {
        text: "Košile",
        beforeInput: "",
        placeholder: "",
        checkpoint: "16a",
      },
      {
        text: "Židle",
        beforeInput: "",
        placeholder: "",
        checkpoint: "16a",
      },
      {
        text: "Láhev",
        beforeInput: "",
        placeholder: "",
        checkpoint: "17",
      },
      {
        text: "Strom",
        beforeInput: "",
        placeholder: "",
        checkpoint: "16a",
      },
    ],
    name: "Oběd",
  },
  "16a": {
    text: "Na obědě sis chtěl vzít jídlo bez placení a kuchařka tě chytla za ucho.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Kuchařka",
  },
  "17": {
    text: 'Oběd se obešel bez karambolu, už jen přežít cestu domů. Vyber správné slovo pro větu: "______ car is new"',
    type: "choice",
    buttons: [
      {
        text: "There car is new",
        beforeInput: "",
        placeholder: "",
        checkpoint: "17a",
      },
      {
        text: "Their car is new",
        beforeInput: "",
        placeholder: "",
        checkpoint: "18",
      },
      {
        text: "They're car is new",
        beforeInput: "",
        placeholder: "",
        checkpoint: "17a",
      },
      {
        text: "Thair car is new",
        beforeInput: "",
        placeholder: "",
        checkpoint: "17a",
      },
    ],
    name: "Cesta domů",
  },
  "17a": {
    text: "Cestou domů tě srazilo auto, protože jsi se díval do mobilu.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Auto",
  },
  "18": {
    text: "Úspěšně jsi přežil den ve škole! Gratuluji!",
    type: "end",
    buttons: [],
    name: "Konec",
  },
  "19": {
    text: "Logickou hádanku jsi zvládl, teď tě čeká hodina fyziky. Kolik je 20 * 20?",
    type: "choice",
    buttons: [
      {
        text: "390",
        beforeInput: "",
        placeholder: "",
        checkpoint: "19a",
      },
      {
        text: "410",
        beforeInput: "",
        placeholder: "",
        checkpoint: "19a",
      },
      {
        text: "400",
        beforeInput: "",
        placeholder: "",
        checkpoint: "20",
      },
      {
        text: "420",
        beforeInput: "",
        placeholder: "",
        checkpoint: "19a",
      },
    ],
    name: "Fyzika",
  },
  "19a": {
    text: "Nepřežil jsi fyziku, usnul jsi a spadl ze židle.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Pád ze židle",
  },
  "20": {
    text: "Fyzika tě nezabila, je přestávka, co podnikneš? Jaké je hlavní město Rakouska?",
    type: "choice",
    buttons: [
      {
        text: "Salcburk",
        beforeInput: "",
        placeholder: "",
        checkpoint: "20a",
      },
      {
        text: "Graz",
        beforeInput: "",
        placeholder: "",
        checkpoint: "20a",
      },
      {
        text: "Vídeň",
        beforeInput: "",
        placeholder: "",
        checkpoint: "21",
      },
      {
        text: "Innsbruck",
        beforeInput: "",
        placeholder: "",
        checkpoint: "20a",
      },
    ],
    name: "Přestávka",
  },
  "20a": {
    text: "Nepřežil jsi přestávku, snažil jsi se dělat parkour a zlomil sis nohu.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Zlomená noha",
  },
  "21": {
    text: "Parkour nebyl tvůj silný obor, ale přestávku jsi přežil, jdeš na oběd? Co je lehčí než peří, ale nikdo ho dlouho neudrží?",
    type: "choice",
    buttons: [
      {
        text: "Vzduch",
        beforeInput: "",
        placeholder: "",
        checkpoint: "21a",
      },
      {
        text: "Dech",
        beforeInput: "",
        placeholder: "",
        checkpoint: "22",
      },
      {
        text: "Pírko",
        beforeInput: "",
        placeholder: "",
        checkpoint: "21a",
      },
      {
        text: "Myšlenka",
        beforeInput: "",
        placeholder: "",
        checkpoint: "21a",
      },
    ],
    name: "Oběd",
  },
  "21a": {
    text: "Na obědě jsi se snažil předbíhat frontu a dostal jsi vynadáno.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Vynadání",
  },
  "22": {
    text: 'Oběd bez problémů, už jen přežít cestu ze školy. Vyber správné slovo pro větu: "I want to go ______."',
    type: "choice",
    buttons: [
      {
        text: "I want to go To.",
        beforeInput: "",
        placeholder: "",
        checkpoint: "22a",
      },
      {
        text: "I want to go Too.",
        beforeInput: "",
        placeholder: "",
        checkpoint: "23",
      },
      {
        text: "I want to go Two.",
        beforeInput: "",
        placeholder: "",
        checkpoint: "22a",
      },
      {
        text: "I want to go Tu.",
        beforeInput: "",
        placeholder: "",
        checkpoint: "22a",
      },
    ],
    name: "Cesta ze školy",
  },
  "22a": {
    text: "Cestou ze školy jsi spadl do kanálu, protože jsi neviděl na cestu.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Kanál",
  },
  "23": {
    text: "Úspěšně jsi přežil den ve škole! Gratuluji!",
    type: "end",
    buttons: [],
    name: "Konec",
  },
  "24": {
    text: "Hádanku jsi vyřešil, teď tě čeká hodina chemie. Kolik je 11 * 11?",
    type: "choice",
    buttons: [
      {
        text: "120",
        beforeInput: "",
        placeholder: "",
        checkpoint: "24a",
      },
      {
        text: "122",
        beforeInput: "",
        placeholder: "",
        checkpoint: "24a",
      },
      {
        text: "121",
        beforeInput: "",
        placeholder: "",
        checkpoint: "25",
      },
      {
        text: "124",
        beforeInput: "",
        placeholder: "",
        checkpoint: "24a",
      },
    ],
    name: "Chemie",
  },
  "24a": {
    text: "Nepřežil jsi chemii, z nudy jsi začal míchat chemikálie a vybuchlo to.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Výbuch",
  },
  "25": {
    text: "Chemie tě nezabila, ale málem, je přestávka, co podnikáš? Jaké je hlavní město Polska?",
    type: "choice",
    buttons: [
      {
        text: "Krakov",
        beforeInput: "",
        placeholder: "",
        checkpoint: "25a",
      },
      {
        text: "Vratislav",
        beforeInput: "",
        placeholder: "",
        checkpoint: "25a",
      },
      {
        text: "Varšava",
        beforeInput: "",
        placeholder: "",
        checkpoint: "26",
      },
      {
        text: "Poznaň",
        beforeInput: "",
        placeholder: "",
        checkpoint: "25a",
      },
    ],
    name: "Přestávka",
  },
  "25a": {
    text: "Nepřežil jsi přestávku, hrál jsi si s ohněm na záchodě a spustil jsi požární alarm.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Požární alarm",
  },
  "26": {
    text: "Požární alarm se naštěstí nespustil, jdeš na oběd? Co má zuby, ale nekouše?",
    type: "choice",
    buttons: [
      {
        text: "Žralok",
        beforeInput: "",
        placeholder: "",
        checkpoint: "26a",
      },
      {
        text: "Hřeben",
        beforeInput: "",
        placeholder: "",
        checkpoint: "27",
      },
      {
        text: "Pilka",
        beforeInput: "",
        placeholder: "",
        checkpoint: "26a",
      },
      {
        text: "Ústa",
        beforeInput: "",
        placeholder: "",
        checkpoint: "26a",
      },
    ],
    name: "Oběd",
  },
  "26a": {
    text: "Na obědě jsi se pokusil ukrást jídlo spolužákovi a dostal jsi pěstí.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Pěstí",
  },
  "27": {
    text: 'Oběd bez rvačky, zbývá jen cesta domů. Vyber správné slovo pro větu: "I am standing ______ you."',
    type: "choice",
    buttons: [
      {
        text: "I am standing Buy you.",
        beforeInput: "",
        placeholder: "",
        checkpoint: "27a",
      },
      {
        text: "I am standing By you.",
        beforeInput: "",
        placeholder: "",
        checkpoint: "28",
      },
      {
        text: "I am standing Bye you.",
        beforeInput: "",
        placeholder: "",
        checkpoint: "27a",
      },
      {
        text: "I am standing Bi you.",
        beforeInput: "",
        placeholder: "",
        checkpoint: "27a",
      },
    ],
    name: "Cesta domů",
  },
  "27a": {
    text: "Cestou domů tě okradli, protože jsi vypadal jako snadná oběť.",
    type: "title",
    buttons: [
      {
        text: "Zkusit znovu",
        beforeInput: "",
        placeholder: "",
        checkpoint: "0",
      },
    ],
    name: "Okradení",
  },
  "28": {
    text: "Úspěšně jsi přežil den ve škole! Gratuluji!",
    type: "end",
    buttons: [],
    name: "Konec",
  },
};
