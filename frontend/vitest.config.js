import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      clearMocks: true,
      restoreMocks: true,
      coverage: {
        provider: 'v8',
        reporter: [
          'text',
          ['lcov', { projectRoot: '../' }],
        ],
        reportsDirectory: './coverage',
        include: [
          'src/services/apiClient.js',
          'src/services/authService.js',
          'src/pages/LoginPage.jsx',
          'src/routes/AppRoutes.jsx',
        ],
      },
    },
  }),
)