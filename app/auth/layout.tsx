import React from 'react';
import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ReduxProvider } from 'react/redux';
import { store } from '@/store';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Auth | Data Dash',
  description: 'Authentication pages for Data Dash',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      <body>
        <ReduxProvider store={store}>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-grow">{children}</div>
            <footer className="bg-gray-800 py-4">
              <div className="container mx-auto px-4 text-center text-white">
                &copy; {new Date().getFullYear()} Data Dash. All rights reserved.
              </div>
            </footer>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default AuthLayout;