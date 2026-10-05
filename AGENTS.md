# Agent Instructions

## Build/Lint/Test Commands
- `npm run dev` - Start development server
- `npm run build` - Build production site
- `npm run preview` - Preview build locally
- No specific lint or test commands configured

## Code Style Guidelines
- Use Astro components with the `.astro` extension
- Make Astro components reusable and self contained
- Astro components should be configurable via Props
- Pages should have their data at the top of the file like `const DATA = {}` and pass it into components like `<Component {...data} />`
- Use TypeScript for logic files (`.ts`)
- Tailwind CSS for styling
- Follow existing import patterns
- Use PascalCase for components
- Use camelCase for variables/functions
- Prefer functional components
- Use Astro's built-in components and APIs when possible
- Uses Tailwind 4; the tailwind config is in the `global.css`

## Images
- Always use the `DynamicImage` component (`src/components/utils/DynamicImage.astro`)
- For AI-generated images, pass the `isAi` prop to show a small "KI" badge with an explanation tooltip (required by EU law):
  ```astro
  <DynamicImage src={...} alt="..." isAi />
  ```
- For the shop preview, product photos are loaded from Unsplash URLs via `DynamicImage`. Pre-download them into `src/images/` before running `npm run build` if the build fails with a glob error.

## Settings / Data
- Data like email, formspark form URLs, phone numbers etc. lives in `src/content/settings/index.json`
- Shop-specific data lives in `src/data/` (`products.ts`, `shopConfig.ts`, `shopTypes.ts`)
- Load settings like this:
  ```astro
  const entry = await getEntry("settings", "index");
  const { email, phone, adress, instagram, taxnumber, companyName, mapUrl } = entry!.data;
  ```
- If you need new data, add it there

## Shop Preview
- The shop is password-protected via `ShopPasswordGate` on all `/shop/*` pages
- Default preview password: `iz-shop-2026`
- Test account for checkout demo: `demo@kunde.de` / `demo1234`
- Cart state is stored in `localStorage` under `iz-shop-cart`
- Checkout is simulated; Stripe integration is prepared in `src/lib/checkout.ts`
- Shop pages are excluded from the sitemap and have `robots: noindex`

## Project Structure
- `src/components/` - Reusable UI components
- `src/components/shop/` - Shop-specific components
- `src/data/` - TypeScript data and configuration
- `src/lib/` - Client-side utilities (cart, checkout)
- `src/layouts/` - Page layouts
- `src/pages/` - Page routes
- `src/content/` - Content collections
- `public/` - Static assets

## Important Notes
- This is an Astro project using Tailwind CSS
- Components use Astro's component syntax
- No specific linting or testing setup configured
- Follow existing patterns in the codebase
- Run `npm run build` after changes to verify the static build
