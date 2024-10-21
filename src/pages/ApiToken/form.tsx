import { useState } from "react";
import LayoutPage from "../general";
import { Link } from "react-router-dom";
import axios from "axios";

const ApiTokenForm = () => {
  const [expired, setExpired] = useState(true);
  const [postData, setPostData] = useState(false);
  const [dataAfterPost, setDataAfterPost] = useState({
    api_key: "",
    secret_key: "",
    is_active: 1,
    expired_at: "",
  });
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    expired_at: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const dateExpired = new Date(data.expired_at);
        const today = new Date();
        if (dateExpired <= today) {
          setError(true);
          return;
        }

        axios
          .post(`${process.env.REACT_APP_API_URL}/api/openapi`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setPostData(true);
            setDataAfterPost({
              api_key: response.data.data.api_key,
              secret_key: response.data.data.secret_key,
              is_active: response.data.data.is_active,
              expired_at: response.data.data.expired_at,
            });
          });
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col justify-between">
        <div className="mb-4">
          <p className="text-red-500 text-xl font-semibold">
            Harap copy secret key. Secret key hanya muncul sekali saat selesai
            membuat token.
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold">Token Form</h2>
          <Link
            to="/api-token"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </Link>
        </div>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col gap-4 flex-start w-full"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              id="expired"
              name="expired"
              onChange={(e) => setExpired(e.target.checked)}
            />
            <label htmlFor="expired" className="text-lg">
              Add date expired
            </label>
          </div>
          <div className="flex items-center">
            <input
              type={expired ? "date" : "text"}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Date Expired"
              value={data.expired_at}
              onChange={(e) => setData({ ...data, expired_at: e.target.value })}
              disabled={!expired}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
          {error && (
            <p className="text-red-600">
              Tanggal tidak bisa sama atau lewat dari hari ini!
            </p>
          )}
        </form>
      </div>

      {postData ? (
        <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col justify-between">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">Result of Token:</h1>
          </div>
          <div className="mb-4">
            <p>
              Token key: <b>{dataAfterPost.api_key}</b>
            </p>
            <p>
              Secret Key: <b>{dataAfterPost.secret_key}</b>
            </p>
            <p>
              Tanggal Expired: <b>{dataAfterPost.expired_at}</b>
            </p>
            <p>
              Aktif:{" "}
              <b>{dataAfterPost.is_active === 1 ? "Active" : "Inactive"}</b>
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </LayoutPage>
  );
};

export default ApiTokenForm;
