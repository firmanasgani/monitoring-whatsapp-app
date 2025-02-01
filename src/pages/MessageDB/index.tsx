import LayoutPage from "../general";
import { useState, useEffect } from "react";
import { Card, CardTable } from "../../components/Card";
import { MessageDataHistories } from "../../data/messages";
export const MessageDB = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  

  async function fetchData(page: number, limit: number) {
    console.log(page)
    const response = await MessageDataHistories({ page, limit });
    setTotal(response.total)
    setData(response.data)
  }

  useEffect(() => {
    fetchData(page,limit)
  }, [page, limit]);

  const handleSelectLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value, 10));
  };

  return (
    <LayoutPage>
      <div className="message-db"></div>
      <Card>
        <h1>Histori Pesan yang terkirim: {total.toLocaleString()} pesan</h1>
      </Card>
      <CardTable>
        <table className="w-full h-[350px]">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
             
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                body
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                date created
              </th>
             
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                  {index + 1}
                </td>
              
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                  {item.body.length > 100 ? (
                    <>
                      {item.body.substring(0, 100)}<br />
                      {item.body.substring(100)}
                    </>
                  ) : (
                    item.body
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                  {new Date(item.created_at).toLocaleString("en-US", { timeZone: "UTC" })}
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
     
      </CardTable>
      <div className="flex flex-row w-full justify-between">
          <select
            className="py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-32"
            onChange={handleSelectLimit}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <div>
          <button
            className="py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="mx-2">
            Page {page} of {Math.ceil(total / limit)}
          </span>
          <button
            className="py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-16"
            onClick={() => setPage(page + 1)}
            disabled={page === Math.ceil(total / limit)}
          >
            Next
          </button>
          </div>
        </div>
    </LayoutPage>
  );
};



