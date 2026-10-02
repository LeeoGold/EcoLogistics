import AppRoutes from './routes/AppRoutes'
import { ClientProvider } from './state/ClientContext'
import { OrderProvider } from './state/OrderContext'
import { VehicleProvider } from './state/VehicleContext'

export default function App() {
  return (
    <VehicleProvider>
      <ClientProvider>
        <OrderProvider>
          <AppRoutes />
        </OrderProvider>
      </ClientProvider>
    </VehicleProvider>
  )
}
