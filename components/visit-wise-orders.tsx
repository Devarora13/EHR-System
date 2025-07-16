"use client";

import { useState } from "react";
import { PiFlask } from "react-icons/pi";
import { LuFileText } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";
import { BsClipboard } from "react-icons/bs";


export default function VisitWiseOrders() {
  const [selectedVisit, setSelectedVisit] = useState("VST-12349");

  const recentVisits = [
    { id: "VST-12345", date: "10/07/2025" },
    { id: "VST-12346", date: "09/07/2025" },
    { id: "VST-12347", date: "08/07/2025" },
    { id: "VST-12348", date: "07/07/2025" },
    { id: "VST-12349", date: "06/07/2025" },
  ];

  // Dummy data for different visits
  const visitData = {
    "VST-12345": {
      summary: {
        patientId: "PAT-001",
        visitId: "VST-12345",
        billDate: "10/07/2025",
        visitOrderNumber: "ORD-12345",
      },
      labOrders: [
        {
          id: "LAB-001",
          cpt: "80053",
          description: "Metabolic Panel",
          qty: 1,
          changedBy: "EMP-001",
          status: "Completed",
        },
        {
          id: "LAB-002",
          cpt: "85025",
          description: "Complete Blood Count",
          qty: 1,
          changedBy: "EMP-002",
          status: "Completed",
        },
      ],
      radiologyOrders: [
        {
          id: "RAD-001",
          cpt: "71020",
          description: "Chest X-Ray",
          qty: 1,
          changedBy: "EMP-003",
          status: "Completed",
        },
      ],
      otherProcedures: [],
      icdCodes: [
        {
          code: "Z00.00",
          description: "Encounter for general adult medical examination",
          type: "Primary",
        },
      ],
      medications: [
        { name: "Aspirin", dosage: "81mg", frequency: "Once daily" },
      ],
      additionalNotes: "Routine checkup completed successfully.",
    },
    "VST-12346": {
      summary: {
        patientId: "PAT-001",
        visitId: "VST-12346",
        billDate: "09/07/2025",
        visitOrderNumber: "ORD-12346",
      },
      labOrders: [
        {
          id: "LAB-003",
          cpt: "83036",
          description: "Hemoglobin A1C",
          qty: 1,
          changedBy: "EMP-001",
          status: "Pending",
        },
      ],
      radiologyOrders: [],
      otherProcedures: [
        {
          id: "PROC-001",
          cpt: "99213",
          description: "Office Visit Level 3",
          qty: 1,
          changedBy: "EMP-001",
          status: "Completed",
        },
      ],
      icdCodes: [
        {
          code: "E11.9",
          description: "Type 2 diabetes mellitus",
          type: "Primary",
        },
      ],
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      ],
      additionalNotes: "Follow-up for diabetes management.",
    },
    "VST-12347": {
      summary: {
        patientId: "PAT-001",
        visitId: "VST-12347",
        billDate: "08/07/2025",
        visitOrderNumber: "ORD-12347",
      },
      labOrders: [
        {
          id: "LAB-004",
          cpt: "81003",
          description: "Urinalysis",
          qty: 1,
          changedBy: "EMP-002",
          status: "In Process",
        },
        {
          id: "LAB-005",
          cpt: "85027",
          description: "Complete Blood Count",
          qty: 1,
          changedBy: "EMP-002",
          status: "Completed",
        },
      ],
      radiologyOrders: [],
      otherProcedures: [],
      icdCodes: [
        {
          code: "N39.0",
          description: "Urinary tract infection",
          type: "Primary",
        },
      ],
      medications: [
        {
          name: "Ciprofloxacin",
          dosage: "500mg",
          frequency: "Twice daily for 7 days",
        },
      ],
      additionalNotes: "UTI treatment prescribed.",
    },
    "VST-12348": {
      summary: {
        patientId: "PAT-001",
        visitId: "VST-12348",
        billDate: "07/07/2025",
        visitOrderNumber: "ORD-12348",
      },
      labOrders: [],
      radiologyOrders: [
        {
          id: "RAD-002",
          cpt: "73060",
          description: "Knee X-Ray",
          qty: 1,
          changedBy: "EMP-004",
          status: "Completed",
        },
      ],
      otherProcedures: [
        {
          id: "PROC-002",
          cpt: "99214",
          description: "Office Visit Level 4",
          qty: 1,
          changedBy: "EMP-001",
          status: "Completed",
        },
      ],
      icdCodes: [
        { code: "M25.561", description: "Pain in right knee", type: "Primary" },
      ],
      medications: [
        { name: "Ibuprofen", dosage: "400mg", frequency: "Three times daily" },
      ],
      additionalNotes: "Knee pain evaluation and treatment.",
    },
    "VST-12349": {
      summary: {
        patientId: "PAT-001",
        visitId: "VST-12349",
        billDate: "06/07/2025",
        visitOrderNumber: "ORD-12349",
      },
      labOrders: [
        {
          id: "LAB-001",
          cpt: "80053",
          description: "Metabolic Panel",
          qty: 1,
          changedBy: "EMP-001",
          status: "Pending",
        },
        {
          id: "LAB-002",
          cpt: "83036",
          description: "Hemoglobin A1C",
          qty: 1,
          changedBy: "EMP-220",
          status: "In Process",
        },
        {
          id: "LAB-003",
          cpt: "81003",
          description: "Urinalysis",
          qty: 1,
          changedBy: "EMP-001",
          status: "Completed",
        },
      ],
      radiologyOrders: [],
      otherProcedures: [],
      icdCodes: [],
      medications: [],
      additionalNotes: "Any special instructions or medical conditions...",
    },
  };

  const currentData = visitData[selectedVisit as keyof typeof visitData] || visitData["VST-12349"];

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    switch (status) {
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "In Process":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "Completed":
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Recent Visits */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Visits
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {recentVisits.map((visit) => (
            <button
              key={visit.id}
              onClick={() => setSelectedVisit(visit.id)}
              className={`p-3 rounded text-center transition-colors ${
                selectedVisit === visit.id
                  ? "bg-blue-100 "
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="text-sm font-medium text-blue-600">
                {visit.id}
              </div>
              <div className="text-xs text-gray-600">{visit.date}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Orders Summary
        </h3>

        <div className="bg-blue-100 p-4 mb-6 rounded">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <span className="text-sm text-gray-900 font-medium">
                Patient ID: -
              </span>
              <span className="ml-2 text-sm text-gray-700">
                {currentData?.summary?.patientId || "-"}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-900 font-medium">
                Visit ID: -
              </span>
              <span className="ml-2 text-sm text-gray-700">
                {currentData?.summary?.visitId || "-"}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-900 font-medium">
                Bill Date: -
              </span>
              <span className="ml-2 text-sm text-gray-700">
                {currentData?.summary?.billDate || "-"}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-900 font-medium">
                Visit Order Number: -
              </span>
              <span className="ml-2 text-sm text-gray-700">
                {currentData?.summary?.visitOrderNumber || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Lab Orders */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <PiFlask /> Lab Orders
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Lab Order #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    CPT Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status changed by
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.labOrders.length > 0 ? (
                  currentData.labOrders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{order.cpt}</td>
                      <td className="px-4 py-3 text-sm">{order.description}</td>
                      <td className="px-4 py-3 text-sm">{order.qty}</td>
                      <td className="px-4 py-3 text-sm">{order.changedBy}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={getStatusBadge(order.status)}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No lab orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Radiology Orders */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <BsClipboard /> Radiology Orders
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Rad Order #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    CPT Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status changed by
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.radiologyOrders.length > 0 ? (
                  currentData.radiologyOrders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{order.cpt}</td>
                      <td className="px-4 py-3 text-sm">{order.description}</td>
                      <td className="px-4 py-3 text-sm">{order.qty}</td>
                      <td className="px-4 py-3 text-sm">{order.changedBy}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={getStatusBadge(order.status)}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No radiology orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Other Procedures */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <LuFileText />Other Procedures
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Procedure Order #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    CPT Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status changed by
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.otherProcedures.length > 0 ? (
                  currentData.otherProcedures.map((procedure) => (
                    <tr key={procedure.id} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm">{procedure.id}</td>
                      <td className="px-4 py-3 text-sm">{procedure.cpt}</td>
                      <td className="px-4 py-3 text-sm">
                        {procedure.description}
                      </td>
                      <td className="px-4 py-3 text-sm">{procedure.qty}</td>
                      <td className="px-4 py-3 text-sm">
                        {procedure.changedBy}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={getStatusBadge(procedure.status)}>
                          {procedure.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No other procedures
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ICD Codes Summary */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <CiFileOn /> ICD Codes Summary
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    ICD Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.icdCodes.length > 0 ? (
                  currentData.icdCodes.map((code, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm">{code.code}</td>
                      <td className="px-4 py-3 text-sm">{code.description}</td>
                      <td className="px-4 py-3 text-sm">{code.type}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No ICD codes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Medications */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <PiFlask /> Medications
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Medication
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Dosage
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Frequency
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.medications.length > 0 ? (
                  currentData.medications.map((medication, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm">{medication.name}</td>
                      <td className="px-4 py-3 text-sm">{medication.dosage}</td>
                      <td className="px-4 py-3 text-sm">
                        {medication.frequency}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No medications
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            rows={3}
            value={currentData.additionalNotes}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}
