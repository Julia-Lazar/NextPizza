interface AdminTabsProps {
  activeTab: "orders" | "menu";
  setActiveTab: (tab: "orders" | "menu") => void;
}

export default function AdminTabs({ activeTab, setActiveTab }: AdminTabsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex-1 px-6 py-4 font-semibold transition ${
            activeTab === "orders"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("menu")}
          className={`flex-1 px-6 py-4 font-semibold transition ${
            activeTab === "menu"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Menu Management
        </button>
      </div>
    </div>
  );
}
