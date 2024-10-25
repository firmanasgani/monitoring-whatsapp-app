import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LayoutPage from "../general";
import axios from "axios";

interface template_message {
    id: string;
    name: string;
    body: string;
    contentsid: string;
    status: string;
  }

  interface dt_template_message {
    line_num: string
    var_name: string
  }

const TemplateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<template_message | null>(null);
  const [detailTemplate, setDetailTemplate] = useState<dt_template_message[] | []>([])
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/message/template/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTemplate(response.data.data);
          setDetailTemplate(response.data.detail)
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <LayoutPage>
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </LayoutPage>
    );
  }

  if (!template) {
    return (
      <LayoutPage>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Template not found</h2>
        </div>
      </LayoutPage>
    );
  }

  return (
    <LayoutPage>
      <div className="container p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{template.name}</h1>
        <p><strong>contentSid:</strong> {template.contentsid}</p>
        <p><strong>Body:</strong> {template.body}</p>
        <p><strong>Category:</strong> {template.body}</p>
        <p><strong>Status:</strong> {template.status}</p>
        
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {detailTemplate.length > 0 ? (
              detailTemplate.map((dt) => (
                <tr key={dt.line_num}>
                  <td className="border px-4 py-2">{dt.line_num}</td>
                  <td className="border px-4 py-2">{dt.var_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2" colSpan={2}>
                  There is no detail template variable exist
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </LayoutPage>
  );
};

export default TemplateDetailPage;
