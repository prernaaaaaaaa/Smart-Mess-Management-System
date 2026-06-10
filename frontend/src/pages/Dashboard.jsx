import { useEffect, useState } from "react";
import { Wallet, Utensils, History } from "lucide-react";
import API from "../services/api";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [hostel, setHostel] = useState("");

  const token = localStorage.getItem("token");

  // decode token
  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setHostel(payload.hostel);
    }
  }, []);

  // fetch balance
  const fetchBalance = async () => {
    try {
      const res = await API.get("/wallet/balance", {
        headers: { Authorization: token }
      });
      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  // 🔥 scan meal
  const handleScan = async () => {
    try {
      if (!hostel) {
        alert("Hostel not loaded yet");
        return;
      }

      const res = await API.post(
        "/scan/meal",
        {
          mealType: "lunch",
          hostel: hostel
        },
        {
          headers: { Authorization: token }
        }
      );

      alert("Meal scanned ✅");
      fetchBalance();

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Scan failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-8">Mess System</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-black">
              <Wallet size={18} /> Dashboard
            </div>
            <div className="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
              <History size={18} /> Transactions
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Hostel <span className="font-semibold text-gray-800">{hostel}</span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Wallet */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-between">
              <p className="text-gray-500">Wallet Balance</p>
              <Wallet size={20} />
            </div>

            <h2 className="text-4xl font-bold mt-4">
              ₹ {balance}
            </h2>
          </div>

          {/* Meal */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-between">
              <p className="text-gray-500">Meal</p>
              <Utensils size={20} />
            </div>

            <button
              onClick={handleScan}
              className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition"
            >
              Scan Meal
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;