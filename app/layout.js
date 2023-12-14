import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sisthema',
  description: 'Benvenuti nella nostra pagina di acquisti di prodotti informatici e servizi di riparazione elettronica. Offriamo una vasta gamma di prodotti di alta qualità, da computer e componenti hardware a software e accessori. Inoltre, forniamo servizi di riparazione professionale per dispositivi elettronici. Il nostro team esperto è pronto ad aiutarti a trovare ciò di cui hai bisogno e garantire che i tuoi dispositivi funzionino al meglio.',
}


export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
