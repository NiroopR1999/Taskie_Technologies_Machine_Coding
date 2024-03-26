import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { motion, easeInOut } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function Layout() {
  const location = useLocation();
  return (
    <>
      <Toaster position="top-center" />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: easeInOut }}
      >
        <Header />
        {location.pathname == '/home' ? (
          <div className="h-screen w-full grid place-content-center bg-default-100">
            Welcome To Admin Dashboard!!
          </div>
        ) : (
          <Outlet />
        )}
      </motion.main>
    </>
  );
}

export default Layout;
