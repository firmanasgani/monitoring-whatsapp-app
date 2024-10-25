import { useParams } from "react-router-dom";
import LayoutPage from "../general";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

interface template_message {
  id: string;
  name: string;
  body: string;
  contentsid: string;
  category: string
  status: string;
}

interface dt_template_message {
  line_num: string;
  var_name: string;
}

const MessageTemplateUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<template_message | null>(null);
  const [detailTemplate, setDetailTemplate] = useState<
    dt_template_message[] | []
  >([]);

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
          setDetailTemplate(response.data.detail);
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
      <div>
        <Card>
          <h1>Update Message Template</h1>
        </Card>
        <div className="container p-6 bg-white rounded-lg mb-4 shadow-md">
          <h1 className="text-2xl font-bold mb-4">{template.name}</h1>
          <table className="table-auto w-full mb-4">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-bold">contentSid</td>
                <td className="px-4 py-2">{template.contentsid}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold">Body</td>
                <td className="px-4 py-2">{template.body}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold">Category</td>
                <td className="px-4 py-2">{template.category}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold">Status</td>
                <td className="px-4 py-2">{template.status}</td>
              </tr>
            </tbody>
          </table>
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
      </div>
      
      <div className="container p-6 bg-white rounded-lg flex flex-col gap-4 shadow-md">
        {template.status === "on requested" ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to set this template to progress?"
                )
              ) {
                axios
                  .put(
                    `${process.env.REACT_APP_API_URL}/message/template/${template.id}`,
                    { status: "on progress" },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then((res) => {
                    window.location.reload();
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }
            }}
          >
            Set to Progress
          </button>
        ) : (
          template.status === "on progress" && (
            <form
                className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const contentSid = (e.target as any).contentSid.value;
                if (
                  window.confirm(
                    `Are you sure you want to ${
                      contentSid ? "approved" : "rejected"
                    } this template?`
                  )
                ) {
                  axios
                    .put(
                      `${process.env.REACT_APP_API_URL}/message/template/${template.id}`,
                      { status: contentSid ? "approved" : "rejected", contentsid: contentSid ? contentSid : template.contentsid },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                    .then((res) => {
                      window.location.href = '/message-approval'
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }
              }}
            >
              <input
                type="text"
                name="contentSid"
                placeholder="Content Sid"
                className="border p-2 rounded"
              />
            <div className="flex flex-row gap-4">
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Approved
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Rejected
              </button>
            </div>
            </form>
          )
        )}
      </div>
    </LayoutPage>
  );
};

export default MessageTemplateUpdate;
