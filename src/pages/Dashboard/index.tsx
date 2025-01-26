import { useEffect, useState } from "react";
import LayoutPage from "../general";
import { Card } from "../../components/Card";
import { DashboardData } from "../../data/dashboard";

const DashboardPage = () => {
  const [count, setCount] = useState({
    whatsapp: {
      today: 0,
      current: 0,
    },
    message: {
      today: 0,
      current: 0,
    },
    message_template: 0,
    api_token: 0,
  });

  async function fetchData() {
    const getDashboard = await DashboardData();
    setCount(getDashboard);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch {
      console.log("error");
    }
  }, []);

  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col gap-2 justify-between">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-md font-semibold text-gray-600">
          Selamat datang di Monitoring Notifikasi Whatsapp
        </p>
      </div>
      <div className="flex flex-row gap-4 w-full flex-nowrap items-center">
        <Card>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{count.message.current}</h2>
            <p className="font-semibold text-gray-600">Pesan Terkirim</p>
            <div className="mt-auto">
              <p className="text-sm font-semibold text-gray-600">
                <span className="text-blue-500">{count.message.today}+</span>
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{count.whatsapp.current}</h2>
            <p className="font-semibold text-gray-600">Nomor Terdaftar</p>
            <div className="mt-auto">
              <p className="text-sm font-semibold text-gray-600">
                <span className="text-blue-500">{count.whatsapp.today}+</span>
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{count.message_template}</h2>
            <p className="font-semibold text-gray-600">
              Template Pesan tersedia
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{count.api_token}</h2>
            <p className="font-semibold text-gray-600">API Token aktif</p>
          </div>
        </Card>
      </div>
    </LayoutPage>
  );
};

export default DashboardPage;
