export default function Header() {
  return (
    <header className="bg-blue-600 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">EHR System - Medical Claim Form</h1>
          <p className="text-sm text-blue-100">
            Healthcare Medical Center - 123 Medical Plaza, Healthcare City, HC 12345
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-medium">Logo</button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium">
            Preview Form
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">Save</button>
        </div>
      </div>
    </header>
  )
}
