import { Link, useLocation, useNavigate } from "react-router-dom";
import LayoutPage from "../general";
import { useEffect, useState } from "react";
import {
  MessageTemplateData,
  MessageTemplateDataDelete,
} from "../../data/messageTemplate";
import {
  MESSAGE_TEMPLATE_PAGE_ADD,
  MESSAGE_TEMPLATE_PAGE,
} from "../../utils/variables/urlPath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faRefresh,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface template_message {
  id: string;
  name: string;
  body: string;
  contentsid: string;
  status: string;
}

const TemplateMessage = () => {
  const [data, setData] = useState<template_message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const location = useLocation()
  const navigate = useNavigate()

  async function fetchData() {
    const response = await MessageTemplateData({ search, status });
    setData(response);
  }
  useEffect(() => {
    const statusQuery = new URLSearchParams(location.search).get("status");
    const searchQuery = new URLSearchParams(location.search).get("search");
    setStatus(statusQuery || "");
    setSearch(searchQuery || "");
    try {
      fetchData();
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [location]);

  const handleSearch = () => {
    navigate(`?status=${status}&search=${search}`); // Update the URL with the search query and status query parameters
  };

  const handleRefresh = () => {
    navigate(`?status=&search=`); // Refresh the page
  }
  if (loading) {
    return (
      <LayoutPage>
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </LayoutPage>
    );
  }

  const deleteTemplate = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      const response = await MessageTemplateDataDelete(id);
      if (response) {
        fetchData();
      } else {
        console.error("Error deleting template");
      }
    }
  };
  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between">
          <Link
            to={MESSAGE_TEMPLATE_PAGE_ADD}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Template
          </Link>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md overflow-y-auto">
        <div className="flex flex-row items-center justify-between gap-2 mb-8">
          <h1 className="text-xl">Whatsapp Number</h1>
          <div className="flex flex-row items-center gap-2">
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="approved">Approved</option>
              <option value="on progress">On Progress</option>
              <option value="rejected">Rejected</option>
            </select>
            <input
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Search Content or name or body"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleRefresh}>
              <FontAwesomeIcon icon={faRefresh} />
            </button>
            
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase text-sm tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase text-sm  tracking-wider">
                contentSid
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase text-sm  tracking-wider">
                name
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase text-sm tracking-wider">
                body
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase text-sm tracking-wider">
                status
              </th>
              <th className="px-6 py-3 w-[140px] text-left text-xs leading-4 font-medium text-gray-500 text-sm uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {
              data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )
            }
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap text-sm  border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm border-b border-gray-200">
                  {item.contentsid}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm border-b border-gray-200">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm border-b border-gray-200">
                  {item.body}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm border-b border-gray-200">
                  {item.status === "approved" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  ) : item.status === "rejected" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {item.status}
                    </span>
                  ) : item.status === "on requested" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex flex-row gap-4">
                    {item.status === "approved" ? (
                      <Link
                        to={`${MESSAGE_TEMPLATE_PAGE}/view/${item.id}`}
                        className="text-gray-500 text-xs hover:text-gray-700"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    ) : (
                      ""
                    )}

                    <button
                      onClick={() => deleteTemplate(item.id)}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutPage>
  );
};

export default TemplateMessage;
