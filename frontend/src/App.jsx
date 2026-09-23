import AppRoutes from './routes/AppRoutes'
import { VehicleProvider } from './state/VehicleContext'

export default function App() {
  return (
    <VehicleProvider>
      <AppRoutes />
    </VehicleProvider>
  )
}
