import React, { useState } from "react";
import LayoutPage from "../general";
import axios from "axios";

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

  React.useEffect(() => {
    const token = localStorage.getItem("token");
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
  }, []);

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
            setData(data.filter((item) => item.id !== id));
          })
          .catch((error) => {
            console.error("Delete error:", error);
          });
    }
}
  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">WA Number</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add number
        </button>
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
                  <button className="text-red-600" onClick={() => deleteNumber(item.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-9.414a1 1 0 011.414 0L10 10.586l1.414-1.414a1 1 0 111.414 1.414L11.414 12l1.414 1.414a1 1 0 01-1.414 1.414L10 13.414l-1.414 1.414a1 1 0 01-1.414-1.414L8.586 12 7.172 10.586a1 1 0 010-1.414z"
                      />
                    </svg>
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
  return <div className="p-6 bg-white rounded-lg shadow-md">{children}</div>;
};

export default WhatsappNumberPage;