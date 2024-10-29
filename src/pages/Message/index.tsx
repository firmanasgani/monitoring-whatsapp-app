import React, { useState, useEffect } from "react";
import { Card, CardTable } from "../../components/Card";
import LayoutPage from "../general";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface history_message {
  body: string;
  direction: string;
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
  const [page, setPage] = useState<number>(
    new URLSearchParams(search).get("page") ? Number(new URLSearchParams(search).get("page")) : 1
  );
  const [limit, setLimit] = useState<number>(
    new URLSearchParams(search).get("limit") ? Number(new URLSearchParams(search).get("limit")) : 10
  );

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
                to
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                date updated
              </th>
              <th className="px-6 py-3 w-[140px] text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                price
              </th>
              <th className="px-6 py-3 w-[140px] text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                error message
              </th>
              <th className="px-6 py-3 w-[140px] text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.body}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.direction}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.to}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {new Date(new Date(item.dateUpdated).getTime() + 7 * 60 * 60 * 1000).toLocaleString("en-US")}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.price}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.errorMessage}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
