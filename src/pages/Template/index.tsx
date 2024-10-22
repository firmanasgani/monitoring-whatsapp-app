import { Link } from "react-router-dom";
import LayoutPage from "../general";
import React, { useState } from "react";
import axios from "axios";

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

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    try {
        if (token) {
            axios
              .get(`${process.env.REACT_APP_API_URL}/message/template`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                setData(response.data.data);
              })
              .catch((error) => {
                console.error("Fetch error:", error);
              });
          }
    }catch(err: any) {
        console.error(err)
    }finally {
        setLoading(false)
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

  const deleteTemplate = (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/message/template/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          window.location.reload()
        })
        .catch((error) => {
          console.error("Delete error:", error);
        });
    }
  };
  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Message template List</h2>
        <Link
          to="/message-template/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add template
        </Link>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                contentSid
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                name
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                body
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                status
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
                  {item.contentsid}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.body}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.status}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  gap-2">
                <button
                    onClick={() => deleteTemplate(item.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    View
                  </button>
                 {item.status === 'approved' ? '' :  <Link
                    to={`/message-template/edit/${item.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </Link>}
                  <button
                    onClick={() => deleteTemplate(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>

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
