/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Every color points at a token in src/index.css :root, so the palette lives in one place.
      colors: {
        page: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        deep: 'var(--bg-subtle)',
        raised: 'var(--bg-hover)',
        ink: 'var(--text-primary)',
        soft: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        stroke: 'var(--text-stroke)',
        line: 'var(--border-subtle)',
        strong: 'var(--border-strong)',
        accent: 'var(--accent-primary)',
        'accent-hover': 'var(--accent-hover)',
        tint: 'var(--accent-tint)',
        ok: 'var(--status-ok)',
        warn: 'var(--warn)',
        'warn-tint': 'var(--warn-tint)',
        wa: 'var(--wa)',
        'wa-tint': 'var(--wa-tint)',
        note: 'var(--note)',
        panel: 'var(--panel)',
        'panel-raised': 'var(--panel-raised)',
        'panel-line': 'var(--panel-line)',
        'panel-text': 'var(--panel-text)',
        'panel-muted': 'var(--panel-muted)',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
};
