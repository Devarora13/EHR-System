"use client"

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = ["Patient Information", "Visit Details", "Vitals", "Clinical Notes", "Visit Wise Order & Orders"]

  return (
    <div className="border-b border-gray-200 bg-white rounded-t-lg">
      <nav className="flex ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${tab==="Patient Information" && "rounded-tl-lg"} px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
              activeTab === tab
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-700 border-transparent hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  )
}
