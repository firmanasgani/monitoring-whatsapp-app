import { useEffect, useState } from "react";
import LayoutPage from "../general";
import { Link } from 'react-router-dom'
import axios from 'axios'

const DashboardPage = () => {
    const [count, setCount] = useState({
        whatsapp: 0,
        message_template: 0,
        api_token: 0
    })

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/api/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    setCount(response.data.data)
                })
                .catch(error => {
                    console.error("Dashboard error:", error)
                })
        }
    }, [])


  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <div className="flex flex-row gap-4 w-full flex-nowrap items-center">

        <div className="p-6 bg-white rounded-lg  shadow-md mb-4 flex flex-col justify-between">
          <h2 className="text-xl font-bold">{count.whatsapp}</h2>
          <Link to='/whatsapp-number'>Nomor whatsapp</Link>
        </div>

        <div className="p-6 bg-white rounded-lg   shadow-md mb-4 flex flex-col justify-between">
          <h2 className="text-xl font-bold">{count.message_template}</h2>
          <Link to='/message-template'>template tersedia</Link>
        </div>

        <div className="p-6 bg-white rounded-lg  shadow-md mb-4 flex flex-col justify-between">
          <h2 className="text-xl font-bold">{count.api_token}</h2>
          <Link to='/message-template'> Token Aktif</Link>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col justify-between">
          <h2 className="text-xl font-bold">{count.api_token}</h2>
          <Link to='/message-template'> Pesan Template</Link>
        </div>
      
      </div>
    </LayoutPage>
  );
};

export default DashboardPage;
