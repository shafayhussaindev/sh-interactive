// Build-time only: renders a route to HTML so search engines and link previews get real content.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { PATHS, resolve } from './App';

export { PATHS };

export function render(path) {
  const [page, title, description, schema] = resolve(path);
  return { html: renderToString(<StrictMode>{page}</StrictMode>), title, description, schema };
}
