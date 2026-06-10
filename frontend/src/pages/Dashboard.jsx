import { useEffect, useState } from "react";
import { Wallet, Utensils, History, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [hostel, setHostel] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Decode token to get hostel
  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setHostel(payload.hostel);
    }
  }, [token]);

  // Fetch wallet balance
  const fetchBalance = async () => {
    try {
      const res = await API.get("/wallet/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  // Scan meal
  const handleScan = async () => {
    try {
      if (!hostel) {
        alert("Hostel not loaded yet");
        return;
      }

      await API.post(
        "/meal/scan",
        {
          mealType: "lunch",
          hostel: hostel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Meal scanned successfully! 🍽️");

      // Refresh balance
      fetchBalance();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Scan failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-8">
            Smart Mess System
          </h2>

          <div className="space-y-4">
            <div
  onClick={() => navigate("/transactions")}
  className="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
>
  <History size={18} />
  Transactions
</div>

            <div className="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
              <History size={18} />
              Transactions
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-4">
            Hostel:{" "}
            <span className="font-semibold text-gray-800">
              {hostel}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Wallet Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-between">
              <p className="text-gray-500">Wallet Balance</p>
              <Wallet size={20} />
            </div>

            <h2 className="text-4xl font-bold mt-4">
              ₹ {balance}
            </h2>
          </div>

          {/* Meal Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-between">
              <p className="text-gray-500">Meal</p>
              <Utensils size={20} />
            </div>

            <button
              onClick={handleScan}
              className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition"
            >
              Scan Lunch Meal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;