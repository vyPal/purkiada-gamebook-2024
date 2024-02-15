"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router'

import "../../app/globals.css"
import { useState, useEffect } from 'react';
import Link from 'next/link';

const checkpoints : { [key: string]: { text: string, buttons: {
  text: string,
  checkpoint: string
}[], name: string } } = {"A":{"text":"Z kapitánského křesla na můstku lodi USS Sobek jsem sledoval monitor, na kterém se rozprostírala zpráva od admirála Janewayové. Její hlas zněl klidně, ale naléhavě, což vždy evokovalo důležitost situace. \"Stanice Deep Space 13 vyslala nouzový signál, jste nejbližší lodí Hvězdné flotily,\" informovala mě. \"Souřadnice vám posíláme.\" ","buttons":[{"text":"„Už jsme na cestě admirále!“","checkpoint":"E"},{"text":"„Nemám zájem, čau“","checkpoint":"B"},{"text":"Ukončit komunikaci a ignorovat příkaz","checkpoint":"C"}],"name":"A"},"B":{"text":"Stál jsem před polním soudem Hvězdné flotily, obklopený svými nadřízenými a dalšími členy posádky USS Sobek. Moje rozhodnutí ignorovat přímý rozkaz admirála Janewayové mělo vážné důsledky a teď jsem čelil následkům svých činů.","buttons":[{"text":"Zkusit znovu","checkpoint":"A"}],"name":"B"},"C":{"text":"Bylo zřejmé, že moje rozhodnutí nebylo v souladu s Janewayovou představou o nejlepší akci. Její výraz byl nekompromisní, ale také chápavý. \"Jste povinni vyslechnout rozkaz,\" prohlásila nakonec, její hlas pevný, ale ne nepřátelský“ \"Rozumím, admirále,\" odpověděl jsem respektovaně. \"Pokud budou naše současné povinnosti splněny nebo pokud se situace změní, budu ihned informovat a připravím se na vykonání příkazu.\"","buttons":[{"text":"„Dobrá, už jsme na cestě“","checkpoint":"E"},{"text":"Ukončit komunikaci a ignorovat příkaz","checkpoint":"B"}],"name":"C"},"D":{"text":"Stál jsem na můstku lodi USS Sobek, připravený na cestu, která ležela před námi. Měl jsem před sebou tři možnosti, jak se vydat k cíli, stanici Deep Space 13, a každá z nich nesla svá rizika a výhody. Severní cestou: Tato trasa byla považována za bezpečnou, přestože se v této oblasti občas vyskytovaly meteorické bouře a gravitační anomálie. Většina lodí, které se v této oblasti pohybovaly, patřila k pakledským, což byly obvykle nebezpečné situace způsobené jejich nedostatkem technologického chápání. I když se v této oblasti nacházely jen zřídka jiné formy života nebo obchodní lodě, převažujícím nebezpečím zde byla nerozumná a nepředvídatelná chování pakledských lodí. Kolem neutrální zóny: Tato trasa vedla kolem Neutrální zóny, což byla oblast mezi teritoriálními hranicemi Federace a Romulanského impéria. I když bychom se na této trase vyhnuli přímému konfliktu s Romulany, stále bychom museli být ostražití kvůli možnému porušení neutrality na straně Federace nebo Romulanů. Přes klingonské impérium: Tato trasa by byla nejrychlejší z těchto tří možností, ale také nejrizikovější. Přelet přes klingonské území by vyžadoval povolení a koordinaci s klingonskými autoritami. Existovalo riziko, že by nás mohli považovat za nepřátelskou hrozbu a podniknout proti nám opatření. S ohledem na tyto faktory jsem se obrátil na svou posádku a společně jsme zvážili všechny možnosti, abychom se rozhodli, kterou trasou se vydat.","buttons":[{"text":"Severní cestou","checkpoint":"E"},{"text":"Kolem neutrální zóny","checkpoint":"X"},{"text":"Přes klingonské impérium","checkpoint":"Y"}],"name":"D"},"E":{"text":"\"Pakledská loď vyslala nouzový signál, kapitáne,\" oznámil mi můj první důstojník. \"Zdá se, že mají problém se svým motorem a potřebují pomoc.\" Nouzové signály od pakledských lodí nebyly neobvyklé, ale vždy to mohlo být trochu... komplikované. Pakledové byli známi svým omezeným chápáním technologie, což mohlo vést k různým nečekaným situacím.","buttons":[{"text":"Nemůžeme je nechat v nesnázích","checkpoint":"F"},{"text":"Není čas, ztrácet čas","checkpoint":"B"}],"name":"E"},"F":{"text":"\"Zde je kapitán z lodi USS Sobek. Jaký je váš stav?\" optal jsem se vstřícně. Odpověď, která dorazila, byla typická pro pakledskou komunikaci: \"Hledámevěci, věci na létání. Loď, je rozbitá. Hledáme věci.\" zaznělo z reproduktorů. Můj tým se na můstku pozvedl a výrazně se podíval na mě. Bylo zřejmé, že tato situace mohla být komplikovaná.","buttons":[{"text":"Nenecháme je na holičkách","checkpoint":"G"},{"text":"Nezaslouží si existenci, zničte je","checkpoint":"B"}],"name":"F"},"G":{"text":"Pomohl jsem jim opravit jejich loď, ale unesly hlavního technika, jako výměnu požadují zbraňové systémy.","buttons":[{"text":"Zničím je","checkpoint":"I"},{"text":"Dám jim je","checkpoint":"H"},{"text":"Přesvědčím je, že je nepotřebují","checkpoint":"J"}],"name":"G"},"H":{"text":"Dal jsem jim zbraně, jako reakci nám vrátili technika. Ale začaly na nás střílet. Moje loď je rychlejší i více vyzbrojená. Můžeme jim uletět, ale to by nechalo nebezpečnou pakledskou loď, nebo je zničíme.","buttons":[{"text":"Utéct","checkpoint":"K"},{"text":"Bránit se","checkpoint":"I"}],"name":"H"},"I":{"text":"Po krátké přestřelce je zasaženo jejich jádro a jejich loď explodovala i se všemi 12 pakledy na palubě. K polnímu soudu to nepovede jelikož to bylo oprávněné.","buttons":[{"text":"Smutné","checkpoint":"L"}],"name":"I"},"J":{"text":"Po dlouhém jednání jsem je přesvědčil že zbraně nepotřebují. Když byly přesvědčení, že je nepotřebují, vrátili nám našeho technika.","buttons":[{"text":"Výtečně","checkpoint":"L"}],"name":"J"},"K":{"text":"Nechal jsi vyzbrojenou loď pakledů cestovat prostorem federace. Po pár hodinách jsi se dozvěděl že je odchytila hlídková loď Hvězdné Flotily.","buttons":[{"text":"Smutné","checkpoint":"L"}],"name":"K"},"L":{"text":"Dorazil jsi na souřadnice, kde by měla být stanice, ale nic tu není.","buttons":[{"text":"Prozkoumat okolí senzory","checkpoint":"M"},{"text":"Otočka, odlétáme","checkpoint":"M"}],"name":"L"},"M":{"text":"Z ničeho nic se před vámi vynořila velká krychle. Jedná se o loď borgů, napůl biologických a napůl umělých bytostí. Otevřeli s vámi komunikační frekvenci „My jsme Borgové, budete asimilováni, odpor je marný!“, poté ukončili hovor.","buttons":[{"text":"Bojové pozice","checkpoint":"N"},{"text":"Zkusit vyjednávat","checkpoint":"X"}],"name":"M"},"N":{"text":"Loď vstoupila do pohotovosti, zbraně a štíty na maximu. Nepřítel vyzařuje nějaký paprsek odsávající energii ze štítů.","buttons":[{"text":"Posílit štíty","checkpoint":"O"},{"text":"Palte na zdroj paprsku","checkpoint":"P"}],"name":"N"},"O":{"text":"Selhali štíty. Nepřítel se pomalu transportuje na loď a snaží se ji obsadit.","buttons":[{"text":"Rychle pryč","checkpoint":"T"},{"text":"Braňte se do posledního muže","checkpoint":"U"}],"name":"O"},"P":{"text":"Po pár zásazích je paprsek ochromen a získáváte zpět štíty.","buttons":[{"text":"Zvýšit rychlost přes bezpečný limit","checkpoint":"Q"},{"text":"Palte dál!","checkpoint":"S"}],"name":"P"},"Q":{"text":"Po zvýšení rychlosti se loď otřásla a ze strojovny přišla informace že, je jádro na pokraji svého výkonu. Je před tebou rozhodnutí, které rozhodne o osudu lodi.","buttons":[{"text":"Zastavte stroje! Do bojových pozic!","checkpoint":"S"},{"text":"Pokračovat v útěku","checkpoint":"R"}],"name":"Q"},"R":{"text":"Po pár minutách vás nepřítel přestává pronásledovat. Zvládli jste přežít téměř s celou posádkou.","buttons":[],"name":"R"},"S":{"text":"Po dlouhé bitvě s borgy se projevila jejich lepší technologie a byl jsi i se svojí lodí zničen.","buttons":[],"name":"S"},"T":{"text":"Posádka se evakuovala v únikových modulech. Z okénka je vidět exploze lodi USS Sobek. Pomalu plujete prostorem. Najednou vás zachytí vlečný paprsek a ten jeden modul po druhém táhne do nepřátelské lodi. Všichni lidé byli chyceni a asimilováni.","buttons":[],"name":"T"},"U":{"text":"Borgové se nalodili a začali asimilovat loď a posádku. Pomalu asimilují loď. Situace vypadá ztraceně, ale je zde stále malá šance že loď získáš zpět.","buttons":[{"text":"Evakuace","checkpoint":"T"},{"text":"Braňte se do posledního muže","checkpoint":"V"}],"name":"U"},"V":{"text":"Po krátkém boji jsou nepřátelé eliminováni a získal jsi zpět kontrolu nad lodí.","buttons":[{"text":"Padáme odtud","checkpoint":"W"},{"text":"postavit se nepratelske lodi","checkpoint":"S"}],"name":"V"},"W":{"text":"Vstoupil jsi do warpové rychlosti, ale nepřítel tě dohání.","buttons":[{"text":"Rychleji","checkpoint":"Q"},{"text":"Zastavte stroje! Do bojových pozic!","checkpoint":"S"}],"name":"W"},"X":{"text":"Pokoušíš se vyjednávat, ale jediná odpověď které se dočkáš je „My jsme borgove, odpor je marný“.  Nepřítel na vás vystřelil, ale stihly jste zapnout štíty.","buttons":[{"text":"Bojové pozice!","checkpoint":"N"}],"name":"X"}}
 
export default function Page() {
  const router = useRouter()
  useEffect(() => {
    history.pushState(null, '', router.asPath);
    window.addEventListener('popstate', function (event) {
        history.pushState(null, '', router.asPath);
    });
  }, [router.asPath]);
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
        <div className="text-4xl font-bold">Tuto část příběhu jsme nenašli</div>
        <div className="text-2xl">Tohle by se nemělo stát, zkus se vrátit na <Link href={"/"}>domovní stránku</Link>.<br />
        Pokud problém přetrvá, řekni někomu z organizátorů.
        </div>
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
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white p-32">
      <div className="text-4xl font-bold">{checkpoint.text}</div>
      {checkpoint.buttons.map((button) => (
        <Button key={button.checkpoint} onClick={() => tryProgress(button.checkpoint)} className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded mt-4">{button.text}</Button>
      ))}
      {checkpoint.buttons.length === 0 ? <Button onClick={() => router.push("/")} className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded mt-4">Konec</Button> : null}
    </div>
  )
}