'use client';

import Sidebar from './Sidebar';

export default function LayoutWrapper({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-950 text-white p-10 min-h-screen">
        {children}
      </main>
    </div>
  );
}
