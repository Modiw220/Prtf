import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import SocialSidebar from '../SocialSidebar';
import ScrollToTop from './ScrollToTop';

export default function AppShell() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth overflow-x-hidden">
      <ScrollToTop />
      {!isAdminPath && (
        <>
          <Navbar />
          <SocialSidebar />
        </>
      )}
      <Outlet />
      {!isAdminPath && <Footer />}
    </div>
  );
}
