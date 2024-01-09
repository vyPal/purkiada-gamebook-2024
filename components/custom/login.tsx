"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/router"
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Prosím zadejte uživatelské jméno, které vám bylo přiděleno.",
  }),
  password: z.string().min(2, {
    message: "Prosím zadejte heslo, které vám bylo přiděleno.",
  }),
})
 
export function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
  
    if (response.ok) {
      const data = await response.json()
      // Redirect the user to the page that displays the text based on the checkpoint
      router.push(`/checkpoint/${data.checkpoint}`)
    } else {
      
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uživatelské jméno</FormLabel>
              <FormControl>
                <Input placeholder="Uživatelské jméno" {...field} />
              </FormControl>
              <FormDescription>
                Uživatelské jméno které vám bylo přiděleno.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heslo</FormLabel>
              <FormControl>
                <Input placeholder="Heslo" {...field} />
              </FormControl>
              <FormDescription>
                Heslo které vám bylo přiděleno.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Přihlásit</Button>
      </form>
    </Form>
  )
}