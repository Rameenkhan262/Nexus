import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const DocumentChamberPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState("Draft");
  const [uploaded, setUploaded] = useState(false);

  const [numPages, setNumPages] = useState<number>(0);

  const sigRef = useRef<any>(null);
const [signatureURL, setSignatureURL] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

    const onDocumentLoadSuccess = ({ numPages }: any) => {
  setNumPages(numPages);
};

const handleRemove = () => {
  setFile(null);
  setNumPages(0);
  setUploaded(false);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

const handleUploadFile = () => {
  if (!file) return;

  setUploaded(true);
  console.log("Uploading:", file);

  // Optional: change status
  setStatus("In Review");
};

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">📄 Document Chamber</h2>

      {/* Upload */}
      <div className="flex gap-2 items-center">
  <input type="file" ref={fileInputRef} onChange={handleUpload} />

  <button
    onClick={handleUploadFile}
    className="bg-blue-600 text-white px-3 py-1 rounded"
  >
    Upload
  </button>
</div>

{uploaded && (
  <p className="text-green-600 text-sm">
    ✔ File uploaded successfully
  </p>
)}

      {/* Preview */}
      {file && (
  <div className="bg-white p-4 rounded-lg shadow space-y-3">

    {/* Remove Button */}
    <button
      onClick={handleRemove}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
    >
      Remove File
    </button>

    <p className="font-medium">Preview:</p>

    {file.type === "application/pdf" ? (
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={index} pageNumber={index + 1} />
        ))}
      </Document>
    ) : (
      <p>{file.name}</p>
    )}
  </div>
)}

      {/* Signature */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
  <h3 className="font-semibold">✍️ Signature</h3>

  <SignatureCanvas
    ref={sigRef}
    penColor="black"
    canvasProps={{
      width: 400,
      height: 150,
      className: "border rounded",
    }}
  />

  <div className="flex gap-2">
    <button
  onClick={() => {
    setSignatureURL(sigRef.current.toDataURL());
    setStatus("Signed"); // ✅ correct place
  }}
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  Save
</button>


    <button
      onClick={() => sigRef.current.clear()}
      className="bg-gray-500 text-white px-3 py-1 rounded"
    >
      Clear
    </button>
  </div>

  {signatureURL && (
    <img src={signatureURL} alt="signature" className="border mt-2" />
  )}
</div>

      {/* Status */}
      <div className="bg-white p-4 rounded-lg shadow space-y-2">
        <h3 className="font-semibold">📌 Status</h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Draft</option>
          <option>In Review</option>
          <option>Signed</option>
        </select>

        <p className="text-sm">
          Current Status:{" "}
          <span className="font-semibold text-blue-600">{status}</span>
        </p>
      </div>
    </div>
  );
};