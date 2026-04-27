# Quote form production fix

## Summary
- Rebuilt the quote form as a mobile-first, single-screen Zalo handoff form.
- Removed the form's dependency on email APIs for successful customer submission.
- Kept SEO/schema/video/image/CTA source intact.

## Main behavior
1. Customer enters phone and optional details.
2. Website validates only a Vietnamese mobile/phone format: 10 digits starting with 0.
3. Website generates the quote request message.
4. Website tries to copy the message to clipboard.
5. Website opens Zalo for 0349596898 using the best available mobile/web fallback.
6. Website always displays a fallback result area with the generated message, copy button, Zalo button, and call button.

## Files changed
- components/lead-form.tsx
- components/sticky-mobile.tsx
- components/quote-cta.tsx
- components/youtube-gallery.tsx
- app/globals.css

## Tracking events
- quote_submit
- quote_copy
- zalo_click
- call_click

## Manual test checklist
- Mobile 375px: form fields fit width, no horizontal overflow.
- Desktop: form remains two-column for compact fields.
- Empty phone submit: shows validation error.
- Invalid phone submit: shows validation error.
- Valid phone submit: creates quote message and shows fallback area.
- Copy button: copies the generated quote text if browser allows clipboard.
- Open Zalo button: opens Zalo app on mobile or zalo.me fallback.
- Call button: opens tel:0349596898.
