export const applyStoredTheme = () => {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  root.classList.remove('light', 'dark');
  root.classList.add(localStorage.getItem('theme') ?? system);

  const accent = localStorage.getItem('accent');
  if (accent) root.dataset.accent = accent;

  const radius = localStorage.getItem('radius');
  if (radius) root.dataset.radius = radius;

  const css = localStorage.getItem('theme-css');
  const style = document.getElementById('site-theme');

  if (!css) {
    style?.remove();
    return;
  }

  if (style) {
    style.textContent = css;
    return;
  }

  const created = document.createElement('style');
  created.id = 'site-theme';
  created.textContent = css;
  document.head.append(created);
};

export const themeScript = `try { const apply = ${applyStoredTheme.toString()}; apply(); matchMedia('(prefers-color-scheme: dark)').addEventListener('change', apply); } catch { document.documentElement.classList.add('light'); }`;
