"use client"

import { useState } from "react"
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
      <Header />
      <div className="container mx-auto px-4 py-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>{renderActiveTab()}</div>
      </div>
    </div>
  )
}
