import { FC, ReactNode } from 'react'
import ScrollToTop from 'routers/ScrollToTop';
import SiteHeader from 'containers/SiteHeader';
import Footer from 'shared/Footer/Footer';

interface PropsMain {
  children: ReactNode
}

const Main: FC<PropsMain> = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      {children}
      <Footer />
    </>
  )
}

export default Main