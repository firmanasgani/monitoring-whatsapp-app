import LayoutPage from "../general";
import { useState, useEffect } from "react";
import { Card, CardTable } from "../../components/Card";
import { MessageDataHistories } from "../../data/messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
export const MessageDB = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [dateCreated, setDateCreated] = useState<string>("");
  const [searchBody, setSearchBody] = useState<string>("");
  const location = useLocation()
  const navigate = useNavigate()

  async function fetchData(page: number, limit: number, dateCreated: string, searchBody: string) {
    const response = await MessageDataHistories({ page, limit, date: dateCreated, search: searchBody });
    setTotal(response.total);
    setData(response.data);
  }

  useEffect(() => {
    const dateQuery = new URLSearchParams(location.search).get("date");
    const searchQuery = new URLSearchParams(location.search).get("search");
    if(dateQuery) {
      setDateCreated(dateQuery);
    }
    if(searchQuery) {
      setSearchBody(searchQuery);
    }
    fetchData(page, limit, dateCreated || '', searchBody || '');
  }, [page, limit, location]);
  

  const handleSelectLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value, 10));
  };

  const handleSearch = ()  => {
    console.log(dateCreated)
    navigate(`?date=${dateCreated}&search=${searchBody}`);
  }

  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col justify-between">
        <h1>Histori Pesan yang terkirim: {total.toLocaleString()} pesan</h1>
      </div>
      <CardTable>
        <div className="p-6 w-full flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between gap-2 mb-4">
            <h1 className="text-xl">History Pesan</h1>
            <div className="flex flex-row items-center gap-2">
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={dateCreated}
                onChange={(e) => setDateCreated(e.target.value)}
              />

              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Search Body"
                value={searchBody}
                onChange={(e) => setSearchBody(e.target.value)}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
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
              {data.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    Data is not available
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 break-words whitespace-normal text-sm leading-5 text-gray-900">
                      {item.body}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-900">
                      {new Date(item.created_at).toLocaleString("en-US", {
                        timeZone: "Asia/Jakarta",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
