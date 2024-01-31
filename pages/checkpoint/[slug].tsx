"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router'

import "../../app/globals.css"
import { useState } from 'react';

const checkpoints : { [key: string]: { text: string, buttons: {
  text: string,
  checkpoint: string
}[] } } = {
  "A": {
    "text": "Z kapitánského křesla na můstku lodi USS Sobek jsem sledoval monitor, na kterém se rozprostírala zpráva od admirála Janewayové. Její hlas zněl klidně, ale naléhavě, což vždy evokovalo důležitost situace.\n\"Stanice Deep Space 13 vyslala nouzový signál, jste nejbližší lodí Hvězdné flotily,\" informovala mě. \"Souřadnice vám posíláme.",
    "buttons": [
      {
        "text": "„Už jsme na cestě admirále!“",
        "checkpoint": "D"
      },
      {
        "text": "„Nemám zájem, čau“",
        "checkpoint": "B"
      },
      {
        "text": "Ukončit komunikaci a ignorovat příkaz",
        "checkpoint": "C"
      }
    ]
  },
  "B": {
    "text": "Stál jsem před polním soudem Hvězdné flotily, obklopený svými nadřízenými a dalšími členy posádky USS Sobek. Moje rozhodnutí ignorovat přímý rozkaz admirála Janewayové mělo vážné důsledky a teď jsem čelil následkům svých činů.",
    "buttons": [
      {
        "text": "Zkusit znovu",
        "checkpoint": "A"
      }
    ]
  },
  "C": {
    "text": "Bylo zřejmé, že moje rozhodnutí nebylo v souladu s Janewayovou představou o nejlepší akci. Její výraz byl nekompromisní, ale také chápavý. \"Jste povinni vyslechnout rozkaz,\" prohlásila nakonec, její hlas pevný, ale ne nepřátelský“\n\"Rozumím, admirále,\" odpověděl jsem respektovaně. \"Pokud budou naše současné povinnosti splněny nebo pokud se situace změní, budu ihned informovat a připravím se na vykonání příkazu.",
    "buttons": [
      {
        "text": "„Dobrá, už jsme na cestě“",
        "checkpoint": "D"
      },
      {
        "text": "Ukončit komunikaci a ignorovat příkaz",
        "checkpoint": "B"
      }
    ]
  },
  "D": {
    "text": "Stál jsem na můstku lodi USS Sobek, připravený na cestu, která ležela před námi. Měl jsem před sebou tři možnosti, jak se vydat k cíli, stanici Deep Space 13, a každá z nich nesla svá rizika a výhody.\nSeverní cestou: Tato trasa byla považována za bezpečnou, přestože se v této oblasti občas vyskytovaly meteorické bouře a gravitační anomálie. Většina lodí, které se v této oblasti pohybovaly, patřila k pakledským, což byly obvykle nebezpečné situace způsobené jejich nedostatkem technologického chápání. I když se v této oblasti nacházely jen zřídka jiné formy života nebo obchodní lodě, převažujícím nebezpečím zde byla nerozumná a nepředvídatelná chování pakledských lodí.\nKolem neutrální zóny: Tato trasa vedla kolem Neutrální zóny, což byla oblast mezi teritoriálními hranicemi Federace a Romulanského impéria. I když bychom se na této trase vyhnuli přímému konfliktu s Romulany, stále bychom museli být ostražití kvůli možnému porušení neutrality na straně Federace nebo Romulanů.\nPřes klingonské impérium: Tato trasa by byla nejrychlejší z těchto tří možností, ale také nejrizikovější. Přelet přes klingonské území by vyžadoval povolení a koordinaci s klingonskými autoritami. Existovalo riziko, že by nás mohli považovat za nepřátelskou hrozbu a podniknout proti nám opatření.\nS ohledem na tyto faktory jsem se obrátil na svou posádku a společně jsme zvážili všechny možnosti, abychom se rozhodli, kterou trasou se vydat.",
    "buttons": [
      {
        "text": "Severní cestou",
        "checkpoint": "E"
      },
      {
        "text": "Kolem neutrální zóny",
        "checkpoint": "X"
      },
      {
        "text": "Přes klingonské impérium",
        "checkpoint": "Y"
      }
    ]
  }
}
 
export default function Page() {
  const router = useRouter()
  const [verified, setVerified] = useState(false);
  const [cheater, setCheater] = useState(false);
  if (typeof window === 'undefined' || sessionStorage === undefined) {
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
  const checkpoint = checkpoints[slug];
  if (checkpoint === undefined) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
        <div className="text-4xl font-bold">404</div>
        <div className="text-2xl">Stránka nenalezena</div>
      </div>
    )
  }

  if (!verified) {
    tryProgress("");
    setVerified(true);
  }

  function tryProgress(ncp: string) {
    fetch('/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        ncp: ncp
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.checkpoint != slug && ncp === "") {
        console.log("Slug is `"+slug+"`, but checkpoint is `"+data.checkpoint+"`.")
        setCheater(true);
      }
      router.push(`/checkpoint/${data.checkpoint}`)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  if (cheater) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
        <div className="text-4xl font-bold">Podvodníku!</div>
        <div className="text-2xl">Tady nemáš co dělat! Vrať se spátky a už se o tohle znovu nepokoušej!</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
      <div className="text-4xl font-bold">{checkpoint.text}</div>
      {checkpoint.buttons.map((button) => (
        <Button key={button.checkpoint} onClick={() => tryProgress(button.checkpoint)} className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded mt-4">{button.text}</Button>
      ))}
    </div>
  )
}