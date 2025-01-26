import React, { useState, useEffect } from "react";
import LayoutPage from "../general";
import { Link } from "react-router-dom";
import { WhatsappDeleteData, WhatsappNumberData } from "../../data/whatsappNumber";
import { CardTable } from "../../components/Card";
import { apiInterceptors } from "../../utils/apiInterceptors";
import { WHATSAPP_DELETE } from "../../utils/variables/endpoint";

interface WhatsappNumber {
  phone_number: string;
  id: string
}

const WhatsappNumberPage = () => {
  const formatPhoneNumber = (phoneNumber: string) => {
    const reg = /^(\d{1,2})(\d{1,4})(\d{1,4})(\d{1,4})$/;
    const phoneNumberFormatted = phoneNumber.replace(reg, "+$1-$2-$3-$4");
    return phoneNumberFormatted;
  };
  const [data, setData] = useState<WhatsappNumber[]>([]);
  const [loading, setLoading] = useState(true)

  async function fetchData(){
    const result = await WhatsappNumberData()
    setData(result)
  }

  useEffect(() => {
    try {
     fetchData()
    }catch(err: any) {
      console.error(err)
    }finally {
      setLoading(false)
    }
  }, []);


  if(loading) {
    return (
      <LayoutPage>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </LayoutPage>
    )
  }

  const deleteNumber = async(id: string) => {
    if (window.confirm('Are you sure you want to delete this number?')) {
        // Add delete logic here
       try {
         await WhatsappDeleteData(id)
         fetchData()
       }catch(err: any) {
         console.error(err)
    }
  }
}
  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">WA Number List</h2>
        <Link to="/whatsapp-number/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add number
        </Link>
      </div>
      <CardTable>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Number
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.length ===0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                  No data available
                </td>
                
              </tr>
            ) :
            data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                  {formatPhoneNumber(item.phone_number)}
                </td>
                <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-200 text-sm">
                  <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm" onClick={() => deleteNumber(item.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardTable>
    </LayoutPage>
  );
};


export default WhatsappNumberPage;
