"use client"

import { useState } from "react"
import {
  FaUsers,
  FaFolder,
  FaComments,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"

interface Patient {
  startTime: string
  endTime: string
  status: "Confirmed" | "Pending"
  patientName: string
  duration: number
  providerName: string
  dob: string
  gender: "Male" | "Female"
  programService: string
}

// Dummy data
const samplePatients: Patient[] = [
  {
    startTime: "09:00 AM",
    endTime: "09:30 AM",
    status: "Confirmed",
    patientName: "Almazan, Jose Pocholo",
    duration: 30,
    providerName: "Lakshmi Prathipati, MD",
    dob: "8/1/1980",
    gender: "Male",
    programService: "Geriatric",
  },
  {
    startTime: "09:00 AM",
    endTime: "09:15 AM",
    status: "Pending",
    patientName: "Del Rio, Ruben",
    duration: 15,
    providerName: "N Kuruvadi DO",
    dob: "4/1/1985",
    gender: "Male",
    programService: "",
  },
  {
    startTime: "09:15 AM",
    endTime: "09:30 AM",
    status: "Pending",
    patientName: "Vasquez, Marilyn",
    duration: 15,
    providerName: "N Kuruvadi DO",
    dob: "3/1/1969",
    gender: "Female",
    programService: "",
  },
  {
    startTime: "09:30 AM",
    endTime: "10:00 AM",
    status: "Confirmed",
    patientName: "Almazan, Jose Pocholo",
    duration: 30,
    providerName: "Lakshmi Prathipati, MD",
    dob: "12/1/1982",
    gender: "Female",
    programService: "",
  },
  {
    startTime: "09:30 AM",
    endTime: "09:45 AM",
    status: "Pending",
    patientName: "Hassan, Ibrahim Sharif",
    duration: 15,
    providerName: "N Kuruvadi DO",
    dob: "4/1/1970",
    gender: "Male",
    programService: "",
  },
  {
    startTime: "09:45 AM",
    endTime: "10:00 AM",
    status: "Pending",
    patientName: "Fonseca, Cynia",
    duration: 15,
    providerName: "L Prathipati",
    dob: "5/2/1955",
    gender: "Female",
    programService: "",
  },
  {
    startTime: "09:45 AM",
    endTime: "10:00 AM",
    status: "Pending",
    patientName: "Huseymli, Mahammad",
    duration: 15,
    providerName: "N Kuruvadi DO",
    dob: "2/1/1995",
    gender: "Male",
    programService: "",
  },
  {
    startTime: "10:00 AM",
    endTime: "10:15 AM",
    status: "Pending",
    patientName: "Torres, Thony",
    duration: 15,
    providerName: "L Prathipati",
    dob: "7/2/1946",
    gender: "Male",
    programService: "",
  },
  {
    startTime: "10:00 AM",
    endTime: "10:15 AM",
    status: "Pending",
    patientName: "Canto Encalada, Georgina",
    duration: 15,
    providerName: "N Kuruvadi DO",
    dob: "8/2/1995",
    gender: "Female",
    programService: "",
  },
  {
    startTime: "10:15 AM",
    endTime: "10:30 AM",
    status: "Confirmed",
    patientName: "Oca, Fe",
    duration: 15,
    providerName: "Lakshmi Prathipati, MD",
    dob: "8/1/1953",
    gender: "Female",
    programService: "",
  },
  {
    startTime: "10:15 AM",
    endTime: "10:30 AM",
    status: "Pending",
    patientName: "Nguyen, Lisa",
    duration: 15,
    providerName: "N Kuruvadi DO",
    dob: "1/2/2003",
    gender: "Female",
    programService: "",
  },
  {
    startTime: "10:30 AM",
    endTime: "10:45 AM",
    status: "Pending",
    patientName: "Torres, Gener",
    duration: 15,
    providerName: "L Prathipati",
    dob: "6/5/1970",
    gender: "Male",
    programService: "",
  },
  {
    startTime: "10:30 AM",
    endTime: "10:45 AM",
    status: "Pending",
    patientName: "Morales, Pedro",
    duration: 15,
    providerName: "N Kuruvadi DO",
    dob: "4/27/1968",
    gender: "Male",
    programService: "",
  },
  {
    startTime: "10:45 AM",
    endTime: "11:00 AM",
    status: "Pending",
    patientName: "Pelonia, Digno",
    duration: 15,
    providerName: "L Prathipati",
    dob: "9/22/1949",
    gender: "Male",
    programService: "",
  },
  {
    startTime: "11:00 AM",
    endTime: "11:15 AM",
    status: "Confirmed",
    patientName: "Java, Rommel",
    duration: 15,
    providerName: "Lakshmi Prathipati, MD",
    dob: "1/2/1976",
    gender: "Male",
    programService: "",
  },
  {
    startTime: "11:00 AM",
    endTime: "11:15 AM",
    status: "Pending",
    patientName: "Yetbarek, Delina",
    duration: 15,
    providerName: "N Kuruvadi DO",
    dob: "4/26/2003",
    gender: "Female",
    programService: "",
  },
  {
    startTime: "11:15 AM",
    endTime: "11:30 AM",
    status: "Pending",
    patientName: "Reyes, Myrna",
    duration: 15,
    providerName: "L Prathipati",
    dob: "5/16/1956",
    gender: "Female",
    programService: "",
  },
]

export default function Tracker() {
  const [activeTab, setActiveTab] = useState<"Dashboard" | "Waiting" | "Seen by Doctor">("Dashboard")
  const [activeView, setActiveView] = useState<"Daily View" | "Week View" | "Month View">(
    "Daily View",
  )

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const today = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  
  // Calendar calculations
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()

  const calendarDays = []

  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    const date = new Date(currentYear, currentMonth - 1, day)
    calendarDays.push({
      day,
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
    })
  }

  //Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = date.toDateString() === selectedDate.toDateString()
    
    calendarDays.push({
      day,
      date,
      isCurrentMonth: true,
      isToday,
      isSelected,
    })
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day)
    calendarDays.push({
      day,
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
    })
  }

  // Calendar navigation fns.
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  
  const formatSelectedDate = () => {
    const dayName = dayNames[selectedDate.getDay()]
    const monthName = monthNames[selectedDate.getMonth()]
    const day = selectedDate.getDate()
    const year = selectedDate.getFullYear()
    return `${dayName}, ${monthName} ${day}, ${year}`
  }

  // Calculate stats from actual data
  const totalAppointments = samplePatients.length
  const pendingAppointments = samplePatients.filter(patient => patient.status === "Pending").length
  const confirmedAppointments = samplePatients.filter(patient => patient.status === "Confirmed").length

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-blue-600 text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 gap-2">
          {/* Left Icons */}
          <div className="flex items-center space-x-4">
            <FaUsers className="w-5 h-5 cursor-pointer hover:text-blue-200" />
            <FaUsers className="w-5 h-5 cursor-pointer hover:text-blue-200" />
            <FaFolder className="w-5 h-5 cursor-pointer hover:text-blue-200 text-yellow-300" />
            <FaComments className="w-5 h-5 cursor-pointer hover:text-blue-200" />
            <FaSearch className="w-5 h-5 cursor-pointer hover:text-blue-200" />
          </div>

          {/* Center Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("Dashboard")}
              className={`px-3 py-1 rounded border-2 text-xs sm:text-sm font-medium ${
                activeTab === "Dashboard"
                  ? "bg-white text-blue-600 border-white"
                  : "border-white text-white hover:bg-blue-500"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("Waiting")}
              className={`px-3 py-1 rounded border-2 text-xs sm:text-sm font-medium ${
                activeTab === "Waiting"
                  ? "bg-white text-blue-600 border-white"
                  : "border-white text-white hover:bg-blue-500"
              }`}
            >
              Waiting
            </button>
            <button
              onClick={() => setActiveTab("Seen by Doctor")}
              className={`px-2 py-1 rounded border-2 text-xs sm:text-sm font-medium ${
                activeTab === "Seen by Doctor"
                  ? "bg-white text-blue-600 border-white"
                  : "border-white text-white hover:bg-blue-500"
              }`}
            >
              <span className="hidden sm:inline">Seen by Doctor</span>
              <span className="sm:hidden">Seen</span>
            </button>
          </div>

          {/* Right User Button */}
          <button className="bg-white text-blue-600 px-4 py-1 rounded text-xs sm:text-sm font-medium hover:bg-gray-100">
            User Name
          </button>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 gap-2">
          {/* Left - All Providers View */}
          <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
            All Providers View
          </div>
          
          {/* Center - View Navigation */}
          <div className="flex items-center space-x-4 sm:space-x-6 order-1 sm:order-2">
            <button
              onClick={() => setActiveView("Daily View")}
              className={`text-xs sm:text-sm ${
                activeView === "Daily View"
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setActiveView("Week View")}
              className={`text-xs sm:text-sm ${
                activeView === "Week View"
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveView("Month View")}
              className={`text-xs sm:text-sm ${
                activeView === "Month View"
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Month
            </button>
          </div>
          
          <div className="order-3">
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-blue-700">
              <span className="hidden sm:inline">Export to Excel</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>
      </div>      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <div className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
            {/* Calendar */}
            <div className="flex-1 lg:flex-none mb-0 lg:mb-6 border border-gray-300 rounded p-3 bg-white">
              <div className="flex items-center justify-between mb-4">
                <FaChevronLeft 
                  className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                  onClick={goToPreviousMonth}
                />
                <h3 className="text-sm font-medium text-gray-900">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <FaChevronRight 
                  className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                  onClick={goToNextMonth}
                />
              </div>

              <div className="grid grid-cols-7 gap-0 mb-2 border-b border-gray-200">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-xs text-gray-500 text-center py-2 font-medium border-r border-gray-200 last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0 border border-gray-200">
                {calendarDays.map((dateObj, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(dateObj.date)}
                    className={`text-xs py-2 text-center border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-100 transition-colors ${
                      !dateObj.isCurrentMonth
                        ? "text-gray-300 bg-gray-50"
                        : dateObj.isSelected
                          ? "bg-blue-600 text-white"
                          : dateObj.isToday
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "text-gray-700 bg-white"
                    }`}
                  >
                    {dateObj.day}
                  </button>
                ))}
              </div>

              <div className="mt-3 text-xs text-gray-600 text-center font-medium">
                {formatSelectedDate()}
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex-1 lg:flex-none bg-blue-600 text-white p-3 rounded">
              <div className="flex flex-col items-center justify-center text-center space-y-2 h-full">
                <div>
                  <div className="text-sm font-medium">Dr Name -</div>
                  <div className="text-sm font-medium">Dr. Aruna</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Department -</div>
                  <div className="text-sm font-medium">Gastro</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-2 sm:p-4">
          {/* Stats Bar */}
          <div className="py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-6 text-xs sm:text-sm text-gray-700">
                <span className="text-blue-600 font-medium">Show Appt Week View</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-700">
                <span>
                  Pending: <span className="font-medium text-blue-600">{pendingAppointments}</span>
                </span>
                <span>
                  Confirmed: <span className="font-medium text-green-600">{confirmedAppointments}</span>
                </span>
                <span className="hidden sm:inline">
                  Checked In: <span className="font-medium">0</span>
                </span>
                <span className="hidden sm:inline">
                  Checked Out: <span className="font-medium">0</span>
                </span>
                <span className="hidden md:inline">
                  Missed: <span className="font-medium">0</span>
                </span>
                <span className="hidden md:inline">
                  Cancelled: <span className="font-medium">0</span>
                </span>
                <span className="font-medium">
                  Total: <span className="text-blue-600">{totalAppointments}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Patient Table */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium">Start Time</th>
                    <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium">End Time</th>
                    <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium">Status</th>
                    <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium">Patient Name</th>
                    <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium hidden sm:table-cell">Duration</th>
                    <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium">Provider</th>
                    <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium hidden md:table-cell">DOB</th>
                    <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium hidden md:table-cell">Gender</th>
                    <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium hidden lg:table-cell">Program Service</th>
                  </tr>
                </thead>
                <tbody>
                  {samplePatients.map((patient, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50`}
                    >
                      <td className="px-2 sm:px-3 py-2 text-xs">{patient.startTime}</td>
                      <td className="px-2 sm:px-3 py-2 text-xs">{patient.endTime}</td>
                      <td className="px-2 sm:px-3 py-2 text-xs">
                        <span className="text-blue-600">
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-2 sm:px-3 py-2 text-xs">
                        <div className="truncate max-w-[120px] sm:max-w-none">{patient.patientName}</div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 text-xs hidden sm:table-cell">{patient.duration}</td>
                      <td className="px-2 sm:px-3 py-2 text-xs">
                        <div className="truncate max-w-[100px] sm:max-w-none">{patient.providerName}</div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 text-xs hidden md:table-cell">{patient.dob}</td>
                      <td className="px-2 sm:px-3 py-2 text-xs hidden md:table-cell">{patient.gender}</td>
                      <td className="px-2 sm:px-3 py-2 text-xs hidden lg:table-cell">{patient.programService}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
