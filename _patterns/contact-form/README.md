# Contact Form Pattern

Server Action contact form with Zod validation and email delivery via Resend.
Copy into any project built from this template.

## Features

- Server-side validation with Zod (name, email, message)
- Server Action with `useActionState` for progressive enhancement
- Per-field error messages with accessible `aria-invalid` attributes
- Pending state while submission is in flight
- Success confirmation message after submission
- React Email template for notification emails
- Works without JavaScript (progressive enhancement via Server Actions)

## Prerequisites

| Package                  | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `zod`                    | Form validation (included in template)   |
| `resend`                 | Email delivery service                   |
| `@react-email/components`| HTML email template rendering            |

## Resend Setup

Resend is used to send contact form notification emails.

### 1. Create a Resend account

Sign up at [resend.com](https://resend.com). The free tier includes 100
emails/day and 3,000 emails/month.

### 2. Create an API key

Go to **API Keys** in your Resend dashboard and create a new key. Copy the key
immediately -- it is only shown once.

### 3. Verify your domain (recommended)

In the Resend dashboard, go to **Domains** and add your domain. Follow the DNS
instructions to add the required records. Domain verification lets you send from
your own email address (e.g., `contact@yourdomain.com`) instead of
`onboarding@resend.dev`.

### 4. Set environment variables

| Variable               | Description                                     | Example                              |
| ---------------------- | ----------------------------------------------- | ------------------------------------ |
| `RESEND_API_KEY`       | Your Resend API key                             | `re_123abc...`                       |
| `RESEND_FROM_EMAIL`    | Sender email (must match verified domain)       | `Contact Form <contact@example.com>` |
| `CONTACT_FORM_TO_EMAIL`| Where submissions are delivered                 | `hello@example.com`                  |

Add these to your `.env.local`:

```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL="Contact Form <contact@yourdomain.com>"
CONTACT_FORM_TO_EMAIL="hello@yourdomain.com"
```

## Installation

### 1. Install dependencies

```bash
npm install resend @react-email/components
```

### 2. Copy the validation schema

```bash
cp _patterns/contact-form/lib/validation.ts src/lib/validations/
```

Or merge into your existing validations directory.

### 3. Copy the Server Action

```bash
cp _patterns/contact-form/actions/submit-contact.ts src/app/actions/
```

Update the import path for the validation schema to match your project:

```typescript
// Change this:
import { contactFormSchema } from '../lib/validation';
// To your project path:
import { contactFormSchema } from '@/lib/validations/validation';
```

### 4. Copy the email template

```bash
mkdir -p src/emails
cp _patterns/contact-form/emails/contact-notification.tsx src/emails/
```

### 5. Uncomment the Resend integration

In the copied `submit-contact.ts`, uncomment the Resend email sending code and
remove the placeholder `console.log`. The commented block shows the exact code
to uncomment.

### 6. Copy the form component

```bash
cp _patterns/contact-form/components/contact-form.tsx src/components/
```

Update the import path for the Server Action:

```typescript
// Change this:
import { submitContactForm, initialState } from '../actions/submit-contact';
// To your project path:
import { submitContactForm, initialState } from '@/app/actions/submit-contact';
```

### 7. Copy the page (optional)

```bash
cp -r _patterns/contact-form/app/contact src/app/
```

Or import `ContactForm` into an existing page or section.

## Customization

### Styling

All components use Tailwind CSS utility classes. Modify the classes in
`contact-form.tsx` to match your design system. If your project uses a component
library (e.g., shadcn/ui), replace the native `input`, `textarea`, and `button`
elements with your library components.

### Validation rules

Edit `validation.ts` to adjust field requirements:

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  // Add more fields as needed:
  // phone: z.string().optional(),
  // company: z.string().optional(),
});
```

### Email template

Edit `contact-notification.tsx` to change the email layout, colors, or add
your logo. Preview templates locally with `npx react-email dev`.

## File Structure

```
contact-form/
  README.md
  lib/
    validation.ts          # Zod schema and types
  actions/
    submit-contact.ts      # Server Action with Resend integration
  emails/
    contact-notification.tsx  # React Email template
  components/
    contact-form.tsx       # Client form component
  app/contact/
    page.tsx               # Standalone contact page
```

## Notes

- This pattern uses native HTML form elements (not a component library) to
  remain portable. Replace with your own UI components after copying.
- The Server Action works without client-side JavaScript via progressive
  enhancement. The form submits as a standard POST and the server returns
  validation errors or success state.
- The email template includes a plain text alternative in comments at the top
  of the file for reference.
