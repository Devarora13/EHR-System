"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import TabNavigation from "@/components/TabNavigation"
import PatientInformation from "@/components/PatientInformation"
import VisitDetails from "@/components/VisitDetails"
import Vitals from "@/components/Vitals"
import ClinicalNotes from "@/components/ClinicalNotes"
import VisitWiseOrders from "@/components/VisitWiseOrders"

export default function EHRSystem() {
  const [activeTab, setActiveTab] = useState("Patient Information")

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Patient Information":
        return <PatientInformation />
      case "Visit Details":
        return <VisitDetails />
      case "Vitals":
        return <Vitals />
      case "Clinical Notes":
        return <ClinicalNotes />
      case "Visit Wise Order & Orders":
        return <VisitWiseOrders />
      default:
        return <PatientInformation />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar with Tracker Link */}
<div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="text-center">
            <Link 
              href="/tracker" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline inline-flex items-center"
            >
              Go to Tracker Dashboard
            </Link>
          </div>
        </div>
      </div>
      
      <Header />
      <div className="container mx-auto px-4 py-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>{renderActiveTab()}</div>
      </div>
    </div>
  )
}
