import type { NextConfig } from 'next';

const basePath = process.env.PAGES_BASE_PATH ?? '';

const config: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    resolveAlias: {
      '@vega-ui/react': './node_modules/@vega-ui/react',
      '@vega-ui/utils': './node_modules/@vega-ui/utils',
      '@vega-ui/icons': './node_modules/@vega-ui/icons',
      '@vega-ui/i18n': './node_modules/@vega-ui/i18n',
    },
  },
};

export default config;
