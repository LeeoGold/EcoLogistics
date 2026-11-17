import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      clearMocks: true,
      restoreMocks: true,

      // Vitest ejecuta pruebas unitarias; Playwright gestiona las E2E.
      exclude: [
        ...configDefaults.exclude,
        'e2e/**',
      ],

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
          'src/services/vehicleService.js',
          'src/services/clientService.js',
          'src/services/driverService.js',
          'src/services/orderService.js',
          'src/services/routeService.js',
          'src/pages/LoginPage.jsx',
          'src/pages/VehiclesPage.jsx',
          'src/routes/AppRoutes.jsx',
          'src/components/vehicles/VehicleTable.jsx',
          'src/components/vehicles/VehicleEditForm.jsx',
        ],
      },
    },
  }),
)