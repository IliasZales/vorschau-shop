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
- Always use the `DynamicImage` component (`src/components/utils/DynamicImage.astro`) with the `example.avif` as the image
- For AI-generated images, pass the `isAi` prop to show a small "KI" badge with an explanation tooltip (required by EU law):
  ```astro
  <DynamicImage src={...} alt="..." isAi />
  ```

## Settings / Data
- Data like email, formspark form URLs, phone numbers etc. lives in `src/content/settings/index.json`
- Load them like this:
  ```astro
  const entry = await getEntry("settings", "index");
  const { email, phone, adress, instagram, taxnumber, companyName, mapUrl } = entry!.data;
  ```
- If you need new data, add it there

## Project Structure
- `src/components/` - Reusable UI components
- `src/layouts/` - Page layouts
- `src/pages/` - Page routes
- `src/content/` - Content collections
- `public/` - Static assets

## Important Notes
- This is an Astro project using Tailwind CSS
- Components use Astro's component syntax
- No specific linting or testing setup configured
- Follow existing patterns in the codebase
