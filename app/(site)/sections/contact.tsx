'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  submitContactForm,
  type ContactFormState,
} from '@/app/actions/contact';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Container } from '@/components/primitives';
import { cn } from '@/lib/utils';

const initialState: ContactFormState = { message: '', success: false };

export function Contact() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  const {
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  return (
    <section id="contact" className="bg-muted/50 py-16 md:py-24">
      <Container>
        <div className="max-w-lg">
          <h2 className="font-heading mb-2 text-3xl font-bold md:text-4xl">
            Get in Touch
          </h2>
          <p className="text-muted-foreground mb-8">
            Have a question or want to work together? Send us a message.
          </p>

          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                {...register('name')}
                aria-invalid={!!errors.name || !!state.errors?.name}
                aria-describedby={
                  errors.name || state.errors?.name ? 'name-error' : undefined
                }
              />
              {(errors.name || state.errors?.name) && (
                <p
                  id="name-error"
                  className="text-destructive text-sm"
                  role="alert"
                >
                  {errors.name?.message || state.errors?.name?.[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                aria-invalid={!!errors.email || !!state.errors?.email}
                aria-describedby={
                  errors.email || state.errors?.email
                    ? 'email-error'
                    : undefined
                }
              />
              {(errors.email || state.errors?.email) && (
                <p
                  id="email-error"
                  className="text-destructive text-sm"
                  role="alert"
                >
                  {errors.email?.message || state.errors?.email?.[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Your message..."
                {...register('message')}
                aria-invalid={!!errors.message || !!state.errors?.message}
                aria-describedby={
                  errors.message || state.errors?.message
                    ? 'message-error'
                    : undefined
                }
              />
              {(errors.message || state.errors?.message) && (
                <p
                  id="message-error"
                  className="text-destructive text-sm"
                  role="alert"
                >
                  {errors.message?.message || state.errors?.message?.[0]}
                </p>
              )}
            </div>

            <Button type="submit" disabled={pending}>
              {pending ? 'Sending...' : 'Send Message'}
            </Button>

            {state.message && !state.errors && (
              <p
                className={cn(
                  'text-sm',
                  state.success
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-destructive',
                )}
                aria-live="polite"
              >
                {state.message}
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
