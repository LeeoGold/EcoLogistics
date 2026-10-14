import AppRoutes from './routes/AppRoutes'
import { ClientProvider } from './state/ClientContext'
import { DriverProvider } from './state/DriverContext'
import { OrderProvider } from './state/OrderContext'
import { VehicleProvider } from './state/VehicleContext'

export default function App() {
  return (
    <VehicleProvider>
      <ClientProvider>
        <DriverProvider>
          <OrderProvider>
            <AppRoutes />
          </OrderProvider>
        </DriverProvider>
      </ClientProvider>
    </VehicleProvider>
  )
}
