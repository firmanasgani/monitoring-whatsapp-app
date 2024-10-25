import React, { useState } from "react";
import { Card, CardTable } from "../../components/Card";
import LayoutPage from "../general";
import axios from "axios";
import { Link } from "react-router-dom";

interface template_message {
    id: string;
    name: string;
    body: string
    category: string
    status: string
}

const MessageApprovalPage = () => {
    const [data, setData] = useState<template_message[]>([])
    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        const token = localStorage.getItem("token")
        try {
            if (token) {
                axios
                    .get(`${process.env.REACT_APP_API_URL}/message/template/list/approval`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        setData(response.data)
                      
                    })
                    .catch((error) => {
                        console.error("Fetch error:", error);
                    });
            }
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }, [])

    if(loading) {
        return (
          <LayoutPage>
          <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </LayoutPage>
        )
      }

  return (
    <LayoutPage>
      <div className="container">
        <Card>
          <h1 className="text-bold text-xl">Message Template Approval</h1>
        </Card>

        <CardTable>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Body
                </th>
                <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
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
            {data.map((message, index) => (
                <tr key={message.id}>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {message.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {message.body}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {message.category}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {message.status}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                   
                    <Link
                      to={`/message-approval/update/${message.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardTable>
      </div>
    </LayoutPage>
  );
};

export default MessageApprovalPage;
