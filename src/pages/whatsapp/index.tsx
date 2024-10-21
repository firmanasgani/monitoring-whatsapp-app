import React, { useState } from "react";
import LayoutPage from "../general";
import axios from "axios";
import { Link } from "react-router-dom";

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

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/whatsapp`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
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

  const deleteNumber = (id: string) => {
    if (window.confirm('Are you sure you want to delete this number?')) {
        // Add delete logic here
        axios
          .delete(`${process.env.REACT_APP_API_URL}/api/whatsapp/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            window.location.reload()
          })
          .catch((error) => {
            console.error("Delete error:", error);
          });
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
      <Card>
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
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {formatPhoneNumber(item.phone_number)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteNumber(item.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </LayoutPage>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => {
  return   <div className="p-6 bg-white rounded-lg shadow-md overflow-y-auto">{children}</div>;
};

export default WhatsappNumberPage;
