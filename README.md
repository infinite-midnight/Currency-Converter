# Currency Converter

React 19 + TS + Vite, TanStack Query for fetching, Tailwind 4, Radix for the select. The select component follows the shadcn/ui wrapping pattern.

> **To use the live API** instead of mock data: set `VITE_USE_MOCK=false` and add your key to `.env` (`VITE_CURRENCY_BEACON_API_KEY=...`). Get a free key at [currencybeacon.com](https://currencybeacon.com/register).

## Running it

```bash
npm install
cp .env.example .env
npm run dev
```

**Mock mode is on by default so you can poke around without needing an API key.**

`npm test` for tests, `npm run build` to build.

## Assumptions & decisions

**Mock on by default.** CurrencyBeacon's free tier gives 5000 req/month and I didn't want to drain it on every keystroke during development (or make you register just to run the app). Mock data includes a handful of currencies with a 200–300ms artificial delay so the loading states are visible.

**CORS via Vite proxy.** The API doesn't send CORS headers, so direct browser requests get blocked. I proxied `/api` to `api.currencybeacon.com` through Vite's dev server. This only works in dev - a real deployment would need a thin backend or a CORS-friendly proxy. I didn't add one here since it felt out of scope for a 2-hour task.

**Debounce at 400ms.** Hitting convert on every keystroke would blow through the free quota fast. 400ms felt like a reasonable balance between responsiveness and not hammering the API.

**2-hour scope.** I kept the feature set close to the requirements. The main thing I'd add with more time is a proper error boundary and better test coverage. Currently, only covers the hook and the service, not the components.
