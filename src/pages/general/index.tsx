import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Navbar';
import { ProfileData } from '../../data/profile';

const LayoutPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [status, setStatus] = useState('');
   async function getUser() {
      const result = await ProfileData()
      setStatus(result.status);
    }
  
    useEffect(() => {
      getUser();
    })
  return (
    <div className="flex h-screen">
      <Sidebar style={{ width: '250px' }} status={status} />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-200 p-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutPage;
