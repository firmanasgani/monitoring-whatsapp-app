import { useState, useEffect } from "react";
import LayoutPage from "../general";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  WhatsappDeleteData,
  WhatsappNumberData,
} from "../../data/whatsappNumber";
import { CardTable } from "../../components/Card";
import { faPlus, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface WhatsappNumber {
  phone_number: string;
  id: string;
}

const WhatsappNumberPage = () => {

  const formatPhoneNumber = (phoneNumber: string) => {
    const reg = /^(\d{1,2})(\d{1,4})(\d{1,4})(\d{1,4})$/;
    const phoneNumberFormatted = phoneNumber.replace(reg, "+$1-$2-$3-$4");
    return phoneNumberFormatted;
  };
  const [data, setData] = useState<WhatsappNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  async function fetchData(search: string) {
    console.log('From fetch data', search);
    const result = await WhatsappNumberData({search});
    if(result) {
      setData(result);
    }else {
      setData([]);
    }
  }
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    try {
      setLoading(true);
      if(query) {
        setSearch(query);
      }
    
      fetchData(query || "");
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [location]);


  const deleteNumber = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this number?")) {
      // Add delete logic here
      try {
        await WhatsappDeleteData(id);
        fetchData(search);
      } catch (err: any) {
        console.error(err);
      }
    }
  };
  const handleSearch = (search: string) => {
    console.log(search);
    navigate(`?search=${search}`);
  }
  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between">
          <Link
            to="/whatsapp-number/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Number
          </Link>
        </div>
      </div>
      <CardTable>
        <div className="p-6 w-full  flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between gap-2 mb-4">
            <h1 className="text-xl">Whatsapp Number</h1>
            <div className="flex flex-row items-center gap-2">
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Search Number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSearch(search)}>  
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
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
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                      {formatPhoneNumber(item.phone_number)}
                    </td>
                    <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-200 text-sm">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
                        onClick={() => deleteNumber(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardTable>
    </LayoutPage>
  );
};

export default WhatsappNumberPage;

