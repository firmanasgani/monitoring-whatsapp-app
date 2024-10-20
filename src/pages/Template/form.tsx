import { Link } from "react-router-dom";
import LayoutPage from "../general";

const MessageTemplateForm = () => {
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
    </LayoutPage>
  );
};

export default MessageTemplateForm;
