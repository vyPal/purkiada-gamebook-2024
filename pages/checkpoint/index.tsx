"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router'

import "../../app/globals.css"
import { useState } from 'react';
 
export default function Page() {
  const router = useRouter()
  if (typeof window === 'undefined' || sessionStorage === undefined) {
    return;
  }
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");

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
      router.push(`/checkpoint/${data.checkpoint}`)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  tryProgress("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
      <div className="text-4xl font-bold">Probíhá přesměrování na poslední checkpoint...</div>
    </div>
  )
}