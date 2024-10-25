import { Link } from "react-router-dom";
import LayoutPage from "../general";
import React, { useState } from "react";
import axios from "axios";

const MessageTemplateForm = () => {
  const [parameters, setParameters] = useState<string[]>([]);
  const [data, setData] = useState({
    name: "",
    body: "",
    category: "utility",
    parameter: "",
  });

  const addParameter = () => {
    setParameters([...parameters, ""]);
  };

  const removeParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleParameterChange = (value: string, index: number) => {
    const newParameters = [...parameters];
    newParameters[index] = value;
    setParameters(newParameters);
  };

  const countParameterInSentence = (sentence: string) => {
    const words = sentence.split(" ");
    return words.filter((word) => word.startsWith(":")).length;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let paramOnWords = countParameterInSentence(data.body);
    if (paramOnWords !== parameters.length) {
      alert(
        "Parameter tidak sesuai. Pastikan kamu menandakan parameter di body dengan tanda : "
      );
      return;
    }
    if (!data.body || data.body === "") {
      alert("Body cannot empty");
      return;
    }

    if (!data.name || data.name === "") {
      alert("Name cannot empty");
      return;
    }

    const parametersJson = JSON.stringify(
      Object.fromEntries(parameters.map((v, i) => [`${i + 1}`, v]))
    );

    const formData = {
      ...data,
      parameter: parametersJson,
    };
    try {
      const token = localStorage.getItem("token");
      axios
        .post(`${process.env.REACT_APP_API_URL}/message/template`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.msg === "success") {
            alert("Success add template");
            window.location.href = "/message-template";
          }
        });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Template message</h2>
        <Link
          to="/message-template"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col justify-between">
        <code className="text-red-400 mb-4">
          Perhatian! Harap tulis isi parameter pada text sesuai ketentuan. Jika
          anda ingin membuat parameter untuk suhu, maka ketik ":suhu" pada isi
          pesan.
        </code>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Nama Template:</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Pengecekan suhu"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Isi pesan Template:</label>
            <input
              type="text"
              placeholder="Peringatan! suhu pada device :nama sampai :temperature derajat"
              value={data.body}
              onChange={(e) => setData({ ...data, body: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <div className="mb-4">
              <label>Tipe template:</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                <option value="utility">Utility</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
              onClick={addParameter}
            >
              Add Parameter
            </button>
          </div>
          {parameters.map((parameter, index) => (
            <div key={index} className="mb-4 flex flex-row items-center">
              <input
                type="text"
                placeholder="Parameter variable"
                value={parameter}
                onChange={(e) => handleParameterChange(e.target.value, index)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => removeParameter(index)}
              >
                Delete
              </button>
            </div>
          ))}

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </LayoutPage>
  );
};

export default MessageTemplateForm;
