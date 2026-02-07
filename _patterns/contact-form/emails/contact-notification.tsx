// Contact notification email template -- self-contained for the contact-form pattern.
// Built for React Email (https://react.email). Only imports from npm packages.
//
// Install: npm install @react-email/components
//
// Plain text alternative (for email clients that don't render HTML):
//
//   Subject: New contact form submission from {name}
//
//   New Contact Form Submission
//   ---
//   Name: {name}
//   Email: {email}
//
//   Message:
//   {message}
//   ---
//   Sent via your website contact form.

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Preview,
} from '@react-email/components';

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactNotificationEmail({
  name,
  email,
  message,
}: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>New Contact Form Submission</Heading>
          <Hr style={hrStyle} />

          <Section>
            <Text style={labelStyle}>Name</Text>
            <Text style={valueStyle}>{name}</Text>

            <Text style={labelStyle}>Email</Text>
            <Text style={valueStyle}>{email}</Text>

            <Text style={labelStyle}>Message</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            Sent via your website contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Inline styles -- React Email renders these as inline CSS in the HTML output.

const bodyStyle = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const containerStyle = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 32px',
  maxWidth: '560px',
  borderRadius: '8px',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: '600' as const,
  color: '#1a1a1a',
  margin: '0 0 16px',
};

const hrStyle = {
  borderColor: '#e6e6e6',
  margin: '20px 0',
};

const labelStyle = {
  fontSize: '12px',
  fontWeight: '600' as const,
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '16px 0 4px',
};

const valueStyle = {
  fontSize: '16px',
  color: '#1a1a1a',
  margin: '0 0 8px',
};

const messageStyle = {
  fontSize: '16px',
  color: '#1a1a1a',
  margin: '0 0 8px',
  whiteSpace: 'pre-wrap' as const,
  lineHeight: '1.5',
};

const footerStyle = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: '0',
};

export default ContactNotificationEmail;
