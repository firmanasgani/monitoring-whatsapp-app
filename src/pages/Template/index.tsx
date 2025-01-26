import { Link } from "react-router-dom";
import LayoutPage from "../general";
import  { useEffect,useState } from "react";
import { MessageTemplateData, MessageTemplateDataDelete } from "../../data/messageTemplate";
import { MESSAGE_TEMPLATE_PAGE_ADD, MESSAGE_TEMPLATE_PAGE } from '../../utils/variables/urlPath'

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

  async function fetchData() {
    const response = await MessageTemplateData();
    setData(response);
  }
  useEffect(() => {
    try {
      fetchData()
    }catch(error: any) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }, []);

  if(loading) {
    return (
      <LayoutPage>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </LayoutPage>
    )
  }

  const deleteTemplate = async(id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
     const response = await MessageTemplateDataDelete(id)
     if(response) {
       fetchData()
     }else {
      console.error("Error deleting template")
     }
    }
  };
  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Message template List</h2>
        <Link
          to={MESSAGE_TEMPLATE_PAGE_ADD}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add template
        </Link>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md overflow-y-auto">
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
                  {item.status === 'approved' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  ) : item.status === 'rejected' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {item.status}
                    </span>
                  ) : item.status === 'on requested' ? (
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
                  {item.status === 'approved' ? ( <Link
                    to={`${MESSAGE_TEMPLATE_PAGE}/view/${item.id}`}
                    className="text-gray-500 text-xs hover:text-gray-700"
                  >
                    View
                  </Link>): ""}
               
                  <button
                    onClick={() => deleteTemplate(item.id)}
                    className="text-red-500 text-xs hover:text-red-700"
                  >
                    Delete
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
