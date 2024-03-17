'use client';
import React from 'react';
import { z } from 'zod';
import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signup } from '../actions';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    .max(100, { message: 'Le mot de passe est trop long.' })
    .regex(/[a-z]/, {
      message: 'Le mot de passe doit contenir au moins une minuscule.',
    })
    .regex(/[A-Z]/, {
      message: 'Le mot de passe doit contenir au moins une majuscule.',
    })
    .regex(/[0-9]/, {
      message: 'Le mot de passe doit contenir au moins un chiffre.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Le mot de passe doit contenir au moins un caractère spécial.',
    }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await signup(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Input
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{"S'inscrire"}</Button>
      </form>
    </Form>
  );
}
