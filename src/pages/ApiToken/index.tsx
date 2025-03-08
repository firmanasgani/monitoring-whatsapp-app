import { Link } from "react-router-dom";
import LayoutPage from "../general";
import React, { useState } from "react";
import { CardTable } from "../../components/Card";
import {
  ApiTokenData,
  ApiTokenDataDelete,
  SetActiveApiToken,
  SetInactiveApiToken,
} from "../../data/apiToken";
import { API_TOKEN_PAGE } from "../../utils/variables/urlPath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

interface api_token {
  id: string;
  api_key: string;
  expired_at: string;
  is_active: number;
}
const ApiToken = () => {
  const [data, setData] = useState<api_token[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const result = await ApiTokenData();
    setData(result);
  }

  React.useEffect(() => {
    try {
      setLoading(true);
      fetchData();
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <LayoutPage>
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </LayoutPage>
    );
  }

  const handleInactive = async (id: string) => {
    if (
      window.confirm("Are you sure you want to set this token to inactive?")
    ) {
      // Add delete logic here
      const result = await SetInactiveApiToken(id);
      if (result.msg === "success") {
        alert("Token has been set to inactive");
        fetchData();
      } else {
        alert("Failed to set token to inactive");
      }
    }
  };

  const handleActive = async (id: string) => {
    if (window.confirm("Are you sure you want to set this token to active?")) {
      // Add delete logic here
      const result = await SetActiveApiToken(id);
      if (result.msg === "success") {
        alert("Token has been set to active");
        fetchData();
      } else {
        alert("Failed to set token to active");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this token?")) {
      // Add delete logic here
      const result = await ApiTokenDataDelete(id);
      if (result.msg === "success") {
        alert("Token has been deleted");
        fetchData();
      } else {
        alert("Failed to delete token");
      }
    }
  };
  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between">
          <Link
            to="/whatsapp-number/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Token
          </Link>
        </div>
      </div>
      <CardTable>
        <div className="p-6 w-full  flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between gap-2 mb-4">
            <h1 className="text-xl">Token</h1>
            <div className="flex flex-row items-center gap-2">
              <select className="mt-1 block w-full p-2 border border-gray-300 rounded">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                type="date"
                placeholder="Search Number"
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
                  API key
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Date expired
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  is active
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
                    {item.api_key}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.expired_at &&
                      new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(item.expired_at))}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.is_active === 1 ? "active" : "inactive"}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex flex-row gap-2 justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() =>
                        item.is_active === 1
                          ? handleInactive(item.id)
                          : handleActive(item.id)
                      }
                    >
                      {item.is_active === 1 ? "inactive" : "active"}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardTable>
    </LayoutPage>
  );
};

export default ApiToken;
