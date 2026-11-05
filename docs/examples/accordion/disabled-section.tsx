import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

export default function DisabledSection() {
  return (
    <div style={{ width: '100%', maxWidth: 560 }}>
      <Accordion defaultOpened={['password']}>
        <AccordionItem value='password'>
          <AccordionHeader>
            <AccordionTrigger>
              Password sign-in
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size={3}>Members sign in with an email and a password of at least 12 characters.</Text>
          </AccordionContent>
          <Separator />
        </AccordionItem>
        <AccordionItem value='sso'>
          <AccordionHeader>
            <AccordionTrigger asChild>
              <button type='button' disabled aria-describedby='sso-reason' style={{ cursor: 'not-allowed', color: 'var(--label-tertiary)' }}>
                SAML single sign-on
                <AccordionIcon />
              </button>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size={3}>Connect Okta, Azure AD or any SAML 2.0 identity provider.</Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Text id='sso-reason' size={2} style={{ color: 'var(--label-secondary)' }}>
        Single sign-on is available on the Enterprise plan.
      </Text>
    </div>
  );
}
