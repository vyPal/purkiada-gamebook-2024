export const checkpoints: {
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
        text: "2, 6, 18, 54, 162, 480, 1440",
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
    text: "Úspěšně jsi prošel přes turniket, teď nachází těžší úkol, vyjít schody.",
    type: "choice",
    buttons: [
      {
        text: "Everyone ______ Peter came on time.",
        beforeInput: "",
        placeholder: "",
        checkpoint: "3",
      },
      {
        text: "Everyone principal Peter came on time.",
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
    text: "Dobrá práce, vejdi do třídy a představ se paní uřitelce.",
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
    text: "Určitě se s ním skamarádíš, ale zdá se, že má pro tebe hádanku.",
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
    text: "Spolužačka se usmívá, zdá se, že má pro tebe uměleckou otázku.",
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
    text: "Zdá se, že programátor má pro tebe logickou hádanku.",
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
    text: "Spolužačka se usmívá, vypadá, že má pro tebe otázku z umělé inteligence. Ale možná je to jen hádanka.",
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
    text: "Skvělé, přežil jsi konverzaci s League of Legends hráčem, teď musíš přežít hodinu.",
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
    text: "Hodina utekla jako voda, je přestávka, co budeš dělat?",
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
    text: "Přestávka je za tebou, jdeš na oběd?",
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
    text: "Oběd byl fajn, zbývá už jen konec školy.",
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
    text: "Správně, uměleckou otázku jsi zvládl, teď musíš přežít hodinu matematiky.",
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
    text: "Matematika byla nuda, ale přežil jsi, je přestávka, co děláš?",
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
    text: "Přestávka s ředitelem se obešla bez následků, jdeš na oběd?",
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
    text: "Oběd se obešel bez karambolu, už jen přežít cestu domů.",
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
    text: "Logickou hádanku jsi zvládl, teď tě čeká hodina fyziky.",
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
    text: "Fyzika tě nezabila, je přestávka, co podnikneš?",
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
    text: "Parkour nebyl tvůj silný obor, ale přestávku jsi přežil, jdeš na oběd?",
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
    text: "Oběd bez problémů, už jen přežít cestu ze školy.",
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
    text: "Hádanku jsi vyřešil, teď tě čeká hodina chemie.",
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
    text: "Chemie tě nezabila, ale málem, je přestávka, co podnikáš?",
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
    text: "Požární alarm se naštěstí nespustil, jdeš na oběd?",
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
    text: "Oběd bez rvačky, zbývá jen cesta domů.",
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
