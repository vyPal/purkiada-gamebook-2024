"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router'

import "../../app/globals.css"
import { useState } from 'react';

const checkpoints : { [key: string]: { text: string, buttons: {
  text: string,
  checkpoint: string
}[] } } = {
  "A": {
    "text": "Nějaká část příběhu (A)",
    "buttons": [
      {
        "text": "Možnost B",
        "checkpoint": "B"
      },
      {
        "text": "Možnost C",
        "checkpoint": "C"
      },
      {
        "text": "Možnost D",
        "checkpoint": "D"
      }
    ]
  },
  "B": {
    "text": "Nějaká část příběhu (B)",
    "buttons": [
      {
        "text": "Možnost A",
        "checkpoint": "A"
      },
      {
        "text": "Možnost C",
        "checkpoint": "C"
      }
    ]
  },
  "C": {
    "text": "Nějaká část příběhu (C)",
    "buttons": [
      {
        "text": "Možnost A",
        "checkpoint": "A"
      },
      {
        "text": "Možnost B",
        "checkpoint": "B"
      }
    ]
  },
  "D": {
    "text": "Nějaká část příběhu (D)",
    "buttons": [
      {
        "text": "Možnost A",
        "checkpoint": "A"
      }
    ]
  }
}
 
export default function Page() {
  const router = useRouter()
  const [verified, setVerified] = useState(false);
  const [cheater, setCheater] = useState(false);
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