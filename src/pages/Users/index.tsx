import { Link } from "react-router-dom";
import LayoutPage from "../general";
import { USERS_PAGE } from "../../utils/variables/urlPath";
import { useEffect, useState } from "react";
import { UserData } from "../../data/users";
import { CardTable } from "../../components/Card";

interface Users {
    username: string
    email: string
    full_name: string
    status: string
}

const UsersPage = () => {
    const [data, setData] = useState<Users[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        const users = await UserData()
        setData(users)
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">List Users</h2>
        <Link
          to={USERS_PAGE + "/add"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
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
            {data.length ===0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
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
            ))}
          </tbody>
        </table>
      </CardTable>
    </LayoutPage>
  );
};

export default UsersPage;
