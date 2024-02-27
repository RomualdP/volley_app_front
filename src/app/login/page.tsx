'use client'
import Messages from './messages'
import Card from '@/src/components/Card'
import { useState, FormEvent } from 'react'
import validatePassword from '@/src/utils/validatePassword' 
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string(),
  // .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
  // .max(100, { message: "Le mot de passe est trop long." })
  // .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule." })
  // .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule." })
  // .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." })
  // .regex(/[^a-zA-Z0-9]/, { message: "Le mot de passe doit contenir au moins un caractère spécial." })
})
 

export default function Login() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l’authentification');
      }
  
      // Gérer la réponse, par exemple rediriger l'utilisateur
    } catch (error) {
      console.error(error);
      // Gérer l'erreur ici
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Card>
      <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Entrez votre mot de passe" {...field} />
              </FormControl>
              <FormDescription className='text-xs'>
                Mot de passe oublié ?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Se connecter</Button>
      </form>
    </Form>
      </Card>
    </div>
  )
}
