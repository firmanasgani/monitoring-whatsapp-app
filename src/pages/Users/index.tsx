import { Link } from "react-router-dom";
import LayoutPage from "../general";
import { USERS_PAGE } from "../../utils/variables/urlPath";
import { useEffect, useState } from "react";
import { UserData } from "../../data/users";
import { CardTable } from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

interface Users {
  username: string;
  email: string;
  full_name: string;
  status: string;
}

const UsersPage = () => {
  const [data, setData] = useState<Users[]>([]);

  async function fetchData() {
    const users = await UserData();
    setData(users);
  }

  useEffect(() => {
    fetchData();
  }, []);

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
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Search "
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
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
                    colSpan={6}
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
                      {item.username}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                      {item.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                      {item.status}
                    </td>
                    <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-200 flex gap-2 text-sm">
                      <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded text-sm">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm">
                        Hapus
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

export default UsersPage;
