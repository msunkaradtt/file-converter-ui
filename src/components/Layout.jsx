// src/components/Layout.jsx
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="bg-background-light font-display text-foreground-light min-h-screen flex flex-col">
      <header className="border-b border-border-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-4">
              <div className="w-8 h-8 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path></svg>
              </div>
              <h2 className="text-2xl font-bold">2GLB</h2>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Outlet />
      </main>

      <footer className="border-t border-border-light mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm text-subtle-light">&copy; {currentYear} Celestia. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <p className="text-sm text-subtle-light">Designed & Developed by{' '} 
                <a href="https://msunkara.de/" className="text-sm text-subtle-light hover:text-primary">msunkara</a>
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/data-privacy" className="text-sm text-subtle-light hover:text-primary">Data Privacy</Link>
              <Link to="/privacy-policy" className="text-sm text-subtle-light hover:text-primary">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}