import nextConfig from 'eslint-config-next'

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      '**/node_modules/**',
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'app/generated/**',
    ],
  },
]

export default eslintConfig
