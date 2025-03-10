import React, { useState, useEffect } from "react";
import { Card, CardTable } from "../../components/Card";
import LayoutPage from "../general";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface history_message {
  body: string;
  direction: string;
  from: string;
  to: string;
  dateUpdated: string;
  price: string;
  errorMessage: string;
  status: string;
}

const MessagePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<history_message[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, _] = useState<number>(
    new URLSearchParams(search).get("page") ? Number(new URLSearchParams(search).get("page")) : 1
  );
  const [limit, setLimit] = useState<number>(
    new URLSearchParams(search).get("limit") ? Number(new URLSearchParams(search).get("limit")) : 10
  );

  
  const reloadData = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      if (token) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/twilio?page=${page}&limit=${limit}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      if (token) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/twilio?page=${page}&limit=${limit}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setData(response.data.data);
          });
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    navigate(`?page=${page}&limit=${limit}`);
  }, [page, limit]);

  if (loading) {
    return (
      <LayoutPage>
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </LayoutPage>
    );
  }

  return (
    <LayoutPage>
      <Card>
        <h1>Histori Pesan</h1>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => reloadData() }
          >
            Reload
          </button>
        </div>
      </Card>
      <CardTable>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                body
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                direction
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                from
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                to
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                date updated
              </th>
              <th className="px-6 py-3 w-[140px] text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                  {item.body}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                  {item.direction}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                  {item.from}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                  {item.to}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                  {new Date(new Date(item.dateUpdated).getTime()).toLocaleString("en-US")}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </CardTable>
      <Card>
      <div className="flex justify-between w-full mt-4">
          {/* <div>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div> */}
          <div>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-4 py-2 bg-white border rounded"
            >
              {[5, 10, 15, 25, 50].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
    </LayoutPage>
  );
};

export default MessagePage;

