import { useEffect, useState } from "react";
import LayoutPage from "../general";
import { Card } from "../../components/Card";
import { DashboardData, DashboardMessageData } from "../../data/dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface DataPoint {
  date: string;
  count: number;
}

const startDate = new Date();
const endDate = new Date(startDate.getTime() - 4 * 24 * 60 * 60 * 1000);
const formattedStartDate = startDate.toISOString().split('T')[0];
const formattedEndDate = endDate.toISOString().split('T')[0];

const DashboardPage = () => {
  const [count, setCount] = useState({
    whatsapp: {
      today: 0,
      yesterday: 0,
    },
    message: {
      today: 0,
      yesterday: 0,
    },
    message_template: 0,
    api_token: 0,
  });

  const [chartData, setChartData] = useState<DataPoint[]>([]);

  async function fetchData() {
    const getDashboard = await DashboardData();
    setCount(getDashboard);
  }

  async function fetchChartData() {
    const data = await DashboardMessageData();
    setChartData(data);
  }

  useEffect(() => {
    try {
      fetchData();
      fetchChartData();
    } catch {
      console.log("error");
    }
  }, []);

  return (
    <LayoutPage>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4 flex flex-col gap-2 justify-between ">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-md font-semibold text-gray-600">
          Selamat datang di Monitoring Notifikasi Whatsapp
        </p>
      </div>
      <div className="flex gap-4 w-full flex-4 flex-nowrap items-center ">
        <Card>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{count.message.today}</h2>
            <p className="font-semibold text-gray-600">
              Pesan Terkirim hari ini
            </p>
            <div className="mt-auto">
              <p className="text-sm font-semibold text-gray-600">
                <span className="text-blue-500">
                  {count.message.yesterday} terkirim kemarin
                </span>
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{count.whatsapp.yesterday}</h2>
            <p className="font-semibold text-gray-600">Nomor Terdaftar</p>
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
      <div className="flex gap-4 w-full flex-col flex-4 flex-nowrap items-center bg-white p-4 rounded-lg">

<h1>Grafik Pengiriman pesan 5 hari terakhir ({formattedEndDate} s.d {formattedStartDate})</h1>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" fillOpacity={1} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </LayoutPage>
  );
};

export default DashboardPage;
