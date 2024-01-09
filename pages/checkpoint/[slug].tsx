import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router'

const checkpoints : { [key: string]: { text: string, buttons: {
  text: string,
  checkpoint: string
}[] } } = {
  "A": {
    "text": "Nějaká část příběhu",
    "buttons": [
      {
        "text": "Nějaká odpověď",
        "checkpoint": "B"
      },
      {
        "text": "Nějaká odpověď",
        "checkpoint": "C"
      }
    ]
  }
}
 
export default function Page() {
  const router = useRouter()
  let slug = router.query.slug;
  if (slug === undefined) {
    slug = "A";
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 dark:bg-white text-white">
      <div className="text-4xl font-bold">{checkpoint.text}</div>
      {checkpoint.buttons.map((button) => (
        <Button key={button.checkpoint} onClick={() => router.push(`/checkpoint/${button.checkpoint}`)} className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded mt-4">{button.text}</Button>
      ))}
    </div>
  )
}