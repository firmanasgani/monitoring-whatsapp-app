import { Link } from "react-router-dom";
import LayoutPage from "../general";
import React, { useState } from "react";
import axios from "axios";
import { Card as BaseCard, CardTable } from "../../components/Card";

interface api_token {
  id: string;
  api_key: string;
  expired_at: string;
  is_active: number;
}
const ApiToken = () => {
  const [data, setData] = useState<api_token[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/openapi`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
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

  const handleInactive = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to set this token to active or inactive?"
      )
    ) {
      // Add delete logic here
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/openapi/${id}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Delete error:", error);
        });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this token?")) {
      // Add delete logic here
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/openapi/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Delete error:", error);
        });
    }
  };
  return (
    <LayoutPage>
      <BaseCard>
        <h2 className="text-xl font-bold">Token List</h2>
        <Link
          to="/api-token/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Token
        </Link>
      </BaseCard>
      <CardTable>
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
                    onClick={() => handleInactive(item.id)}
                  >
                    Set {item.is_active ? "inactive" : "active"}
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
      </CardTable>
    </LayoutPage>
  );
};

export default ApiToken;
