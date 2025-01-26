import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LayoutPage from "../general";
import {
  MessageTemplateDataContentSID,
  MessageTemplateDataTesting,
} from "../../data/messageTemplate";

interface template_message {
  id: string;
  name: string;
  body: string;
  contentsid: string;
  category: string;
  status: string;
}

interface dt_template_message {
  line_num: string;
  var_name: string;
}

const TemplateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<template_message | null>(null);
  const [detailTemplate, setDetailTemplate] = useState<
    dt_template_message[] | []
  >([]);
  const [loading, setLoading] = useState(true);
  const [formTemplate, setFormTemplate] = useState({
    secret_key: "",
    token: "",
    parameter: "",
    contentsid: "",
  });

  async function fetchData(id: string) {
    const result = await MessageTemplateDataContentSID(id);
    setTemplate(result.data);
    setDetailTemplate(result.detail);
  }

  useEffect(() => {
    try {
      if (id) {
        fetchData(id);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
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

  const handleTemplateTesting = async (e: React.FormEvent<HTMLFormElement>) => {
    await MessageTemplateDataTesting(formTemplate);
    alert("Success Testing");
  };

  return (
    <LayoutPage>
      <div className="container p-6 bg-white rounded-lg mb-4 shadow-md">
        <h1 className="text-2xl font-bold mb-4">{template.name}</h1>
        <p>
          <strong>contentSid:</strong> {template.contentsid}
        </p>
        <p>
          <strong>Body:</strong> {template.body}
        </p>
        <p>
          <strong>Category:</strong> {template.category}
        </p>
        <p>
          <strong>Status:</strong> {template.status}
        </p>

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
                <td className="border px-4 py-2 text-center" colSpan={2}>
                  There is no detail template variable exist
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {template.status === "approved" ? (
        <div className="container p-6 bg-white rounded-lg shadow-md">
          <h2 className="font-bold font-2xl">Example using this template</h2>
          <div className="flex flex-col gap-2">
            <p>
              API URL for user: {process.env.REACT_APP_API_URL}/api/messages
            </p>
            <p>Method used: POST</p>
            <div>
              body:
              <ul>
                <li className="font-bold text-sms">
                  Token<span className="text-red-600">*</span>
                </li>
                <li className="font-bold">
                  Secret Key<span className="text-red-600">*</span>
                </li>
                <li className="font-bold">
                  Content Sid<span className="text-red-600">*</span>
                </li>
                <li>Parameter (optional)</li>
              </ul>
            </div>
          </div>
          <form
            className="mt-4 flex-col gap-4"
            onSubmit={handleTemplateTesting}
          >
            <div className="flex flex-row gap-4 mb-4 items-center">
              <label
                className="block w-[10%] text-gray-700 text-sm font-bold mb-2"
                htmlFor="secretKey"
              >
                Secret Key
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="secretKey"
                value={formTemplate.secret_key}
                onChange={(e) =>
                  setFormTemplate({
                    ...formTemplate,
                    secret_key: e.target.value,
                  })
                }
                type="text"
                placeholder="2#%434$353t4y,4646/62646426"
              />
            </div>
            <div className="flex flex-row mb-4 items-center">
              <label
                className="block w-[10%] text-gray-700 text-sm font-bold mb-2"
                htmlFor="token"
              >
                Token
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="token"
                value={formTemplate.token}
                onChange={(e) =>
                  setFormTemplate({ ...formTemplate, token: e.target.value })
                }
                type="text"
                placeholder="FEefefdvfg4r343cfef"
              />
            </div>
            <div className="flex flex-row items-center mb-4">
              <label
                className="block w-[10%] text-gray-700 text-sm font-bold mb-2"
                htmlFor="contentSid"
              >
                Content Sid
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contentSid"
                type="text"
                value={formTemplate.contentsid}
                readOnly={true}
                placeholder="25fdfSDFDGR342xKVJ"
              />
            </div>
            <div className="flex flex-row items-center mb-4">
              <label
                className="w-[10%] block text-gray-700 text-sm font-bold mb-2"
                htmlFor="parameter"
              >
                Parameter
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="parameter"
                value={formTemplate.parameter}
                onChange={(e) =>
                  setFormTemplate({
                    ...formTemplate,
                    parameter: e.target.value,
                  })
                }
                type="text"
                placeholder="{'1':'42','2':'24'}"
              />
            </div>
            <div className="flex flex-row justify-end w-full">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Test Template
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </LayoutPage>
  );
};

export default TemplateDetailPage;
