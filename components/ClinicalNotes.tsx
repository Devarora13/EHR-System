import { useState } from "react";

export default function ClinicalNotes() {
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [durationOfIllness, setDurationOfIllness] = useState("");
  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [referredTo, setReferredTo] = useState("");
  const [referralReason, setReferralReason] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorSignature, setDoctorSignature] = useState<File | null>(null);
  const [patientSignature, setPatientSignature] = useState<File | null>(null);

  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState<Array<{ code: string, description: string }>>([]);
  const [newSecondaryCode, setNewSecondaryCode] = useState("");
  const [newSecondaryDescription, setNewSecondaryDescription] = useState("");

  const [procedures, setProcedures] = useState<Array<{ cptCode: string, description: string, type: string, qty: number }>>([]);
  const [newProcedureCpt, setNewProcedureCpt] = useState("");
  const [newProcedureDescription, setNewProcedureDescription] = useState("");
  const [newProcedureType, setNewProcedureType] = useState("Procedure");
  const [newProcedureQty, setNewProcedureQty] = useState(1);

  const [medications, setMedications] = useState<Array<{ name: string, dosage: string, frequency: string }>>([]);
  const [newMedicationName, setNewMedicationName] = useState("");
  const [newMedicationDosage, setNewMedicationDosage] = useState("");
  const [newMedicationFrequency, setNewMedicationFrequency] = useState("");

  const addSecondaryDiagnosis = () => {
    if (newSecondaryCode.trim() && newSecondaryDescription.trim()) {
      setSecondaryDiagnosis([...secondaryDiagnosis, {
        code: newSecondaryCode.trim(),
        description: newSecondaryDescription.trim()
      }]);
      setNewSecondaryCode("");
      setNewSecondaryDescription("");
    }
  };

  const removeSecondaryDiagnosis = (index: number) => {
    const updated = [...secondaryDiagnosis];
    updated.splice(index, 1);
    setSecondaryDiagnosis(updated);
  };

  const addProcedure = () => {
    if (newProcedureCpt.trim() && newProcedureDescription.trim()) {
      setProcedures([...procedures, {
        cptCode: newProcedureCpt.trim(),
        description: newProcedureDescription.trim(),
        type: newProcedureType,
        qty: newProcedureQty
      }]);
      setNewProcedureCpt("");
      setNewProcedureDescription("");
      setNewProcedureType("Procedure");
      setNewProcedureQty(1);
    }
  };

  const removeProcedure = (index: number) => {
    const updated = [...procedures];
    updated.splice(index, 1);
    setProcedures(updated);
  };

  const addMedication = () => {
    if (newMedicationName.trim() && newMedicationDosage.trim() && newMedicationFrequency.trim()) {
      setMedications([...medications, {
        name: newMedicationName.trim(),
        dosage: newMedicationDosage.trim(),
        frequency: newMedicationFrequency.trim()
      }]);
      setNewMedicationName("");
      setNewMedicationDosage("");
      setNewMedicationFrequency("");
    }
  };

  const removeMedication = (index: number) => {
    const updated = [...medications];
    updated.splice(index, 1);
    setMedications(updated);
  };

  const handleDoctorSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDoctorSignature(file);
    }
  };

  const handlePatientSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPatientSignature(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Clinical Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinical Summary</h3>
        <hr className="mb-6" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chief Complaint</label>
          <textarea
            rows={3}
            placeholder="Patient presents with..."
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Duration of Illness/Symptoms</label>
        <input
          type="text"
          placeholder="e.g., 3 weeks"
          value={durationOfIllness}
          onChange={(e) => setDurationOfIllness(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* History */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">History of Present Illness</label>
        <textarea
          rows={4}
          placeholder="Describe the history of present illness..."
          value={historyOfPresentIllness}
          onChange={(e) => setHistoryOfPresentIllness(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <hr className="my-6" />

      {/* Diagnosis */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Diagnosis</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Diagnosis</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ICD-10 Code"
                className="w-32 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Description"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Secondary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Diagnosis</label>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="ICD-10 Code"
                  value={newSecondaryCode}
                  onChange={(e) => setNewSecondaryCode(e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newSecondaryDescription}
                  onChange={(e) => setNewSecondaryDescription(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={addSecondaryDiagnosis}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Add
                </button>
              </div>

              <div className="space-y-2">
                {secondaryDiagnosis.map((diag, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <span className="text-sm"><strong>{diag.code}</strong> - {diag.description}</span>
                    <button
                      onClick={() => removeSecondaryDiagnosis(i)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Procedures */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Procedures/Services (CPT Code)</h4>
        <div className="space-y-2">
          <div className="hidden md:grid grid-cols-12 gap-2 items-end">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">CPT Code</label>
              <input
                type="text"
                value={newProcedureCpt}
                placeholder="99123"
                onChange={(e) => setNewProcedureCpt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-10"
              />
            </div>
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={newProcedureDescription}
                placeholder="Office Visit, Level 3"
                onChange={(e) => setNewProcedureDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-10"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={newProcedureType}
                onChange={(e) => setNewProcedureType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-10"
              >
                <option>Procedure</option>
                <option>Service</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Qty</label>
              <input
                type="number"
                min={1}
                value={newProcedureQty}
                onChange={(e) => setNewProcedureQty(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-10 text-center"
              />
            </div>
            <div className="col-span-2">
              <button
                onClick={addProcedure}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium h-10 flex items-center justify-center"
              >
                Add
              </button>
            </div>
          </div>

          {procedures.map((procedure, index) => (
            <div key={index} className="hidden md:grid grid-cols-12 gap-2 items-center bg-gray-50 p-3 rounded-md">
              <div className="col-span-2 text-sm font-medium">{procedure.cptCode}</div>
              <div className="col-span-5 text-sm">{procedure.description}</div>
              <div className="col-span-2 text-sm">{procedure.type}</div>
              <div className="col-span-1 text-sm text-center">{procedure.qty}</div>
              <div className="col-span-2 text-center">
                <button
                  onClick={() => removeProcedure(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* Medications */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Medications</h4>
        <div className="grid grid-cols-4 gap-4 items-end mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medication name</label>
            <input
              type="text"
              value={newMedicationName}
              placeholder="Medication Name"
              onChange={(e) => setNewMedicationName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
            <input
              type="text"
              value={newMedicationDosage}
              placeholder="Dosage (e.g., 500mg)"
              onChange={(e) => setNewMedicationDosage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <input
              type="text"
              value={newMedicationFrequency}
              placeholder="Frequency (e.g., BID)"
              onChange={(e) => setNewMedicationFrequency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              onClick={addMedication}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium h-10 flex items-center justify-center"
            >
              Add
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {medications.map((med, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
              <span className="text-sm">
                • {med.name} - {med.dosage} - {med.frequency}
              </span>
              <button
                onClick={() => removeMedication(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* Treatment Plan */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Treatment Plan</h4>
        <textarea
          rows={4}
          placeholder="Describe the treatment plan..."
          value={treatmentPlan}
          onChange={(e) => setTreatmentPlan(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <hr className="my-6" />

      {/* Referral */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Referral (if applicable)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Referred To</label>
            <input
              type="text"
              value={referredTo}
              onChange={(e) => setReferredTo(e.target.value)}
              placeholder="Specialist name or department"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Referral Reason</label>
            <input
              type="text"
              value={referralReason}
              onChange={(e) => setReferralReason(e.target.value)}
              placeholder="Reason for referral"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Signatures */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Signatures</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Doctor's Signature & Seal</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleDoctorSignatureUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="doctor-signature"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                {doctorSignature ? (
                  <div>
                    <p className="text-green-600 font-medium">✓ {doctorSignature.name}</p>
                    <p className="text-gray-500 text-xs mt-1">Click to change</p>
                  </div>
                ) : (
                  <p className="text-gray-500">Click to upload signature</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient's Signature</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handlePatientSignatureUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="patient-signature"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                {patientSignature ? (
                  <div>
                    <p className="text-green-600 font-medium">✓ {patientSignature.name}</p>
                    <p className="text-gray-500 text-xs mt-1">Click to change</p>
                  </div>
                ) : (
                  <p className="text-gray-500">Click to upload signature</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Doctor's Name</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Enter doctor's name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <hr className="my-6" />

      {/* Declaration */}
      <div>
        <div className="flex items-start gap-3">
          <input type="checkbox" className="mt-1" />
          <p className="text-sm text-gray-600">
            I am Dr. {doctorName || "[Doctor Name]"}, treating doctor of the above patient and all the information provided in this claims
            form are best of my professional expertise and are true to best of my knowledge.
          </p>
        </div>
      </div>

      <hr className="my-6" />

      {/* System Generated Info */}
      <div className="p-4 rounded-md text-sm text-gray-600 space-y-3">
        <p>
          <strong>System Generated Timestamp:</strong> {new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })}
        </p>
        <p><i>This is a computer-generated document. Valid with digital signature and seal.</i></p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium">
          Claim Form(Save)
        </button>
      </div>
    </div>
  );
}
