import { Link } from "react-router-dom";
import LayoutPage from "../general";
import { useState } from "react";
import { WhatsappAddData } from "../../data/whatsappNumber";
import { WHATSAPP_NUMBER_PAGE } from "../../utils/variables/urlPath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const WhatsappPhoneForm = () => {
  const [error, setError] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState({
    phone_number: "",
  });
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reg = /^(\d{1,2})(\d{1,4})(\d{1,4})(\d{1,4})$/;
    if (!reg.test(whatsappNumber.phone_number)) {
      setError(true);
      return false;
    }

    if (whatsappNumber.phone_number.length > 16) {
      setError(true);
      return false;
    }

    const response = await WhatsappAddData(whatsappNumber.phone_number);
    if(response) {
      window.location.href = WHATSAPP_NUMBER_PAGE;
    }else {
      setError(true);
    }
    return true;
  };

  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-row items-center gap-2">
      <Link
          to={WHATSAPP_NUMBER_PAGE}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h2 className="text-xl font-bold">WA Number</h2>
        
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col  justify-between">
        <h2 className="text-xl font-bold">Form Tambah</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Nomor Whatsapp:</label>
            <input
              type="text"
              value={whatsappNumber.phone_number}
              onChange={(e) =>
                setWhatsappNumber({
                  ...whatsappNumber,
                  phone_number: e.target.value,
                })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
            >
              Tambah
            </button>
          </div>
          {error && (
            <p className="text-red-500">
              Nomor whatsapp harus sesuai dengan format 62xxxxxxxxxxxx atau
              08xxxxxxxxxxxx
            </p>
          )}
        </form>
      </div>
    </LayoutPage>
  );
};

export default WhatsappPhoneForm;
