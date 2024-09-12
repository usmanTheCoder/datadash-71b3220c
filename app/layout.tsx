'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { Navbar, Footer } from '@/components';
import '@/app/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <title>DataDash</title>
      <meta name="description" content="Data visualization dashboard" />
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body>
      <Provider store={store}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </Provider>
    </body>
  </html>
);

export default RootLayout;