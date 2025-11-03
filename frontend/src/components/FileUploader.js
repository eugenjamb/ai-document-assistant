import React from "react";
import { useDropzone } from "react-dropzone";
import { uploadDocument } from "../api";

export default function FileUploader({ onUploadSuccess }) {
  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    try {
      const res = await uploadDocument(file);
      onUploadSuccess(res.data);
      alert("✅ Document uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload document");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed gray",
        padding: 20,
        textAlign: "center",
        borderRadius: 8,
        marginBottom: 20,
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop your file here...</p>
      ) : (
        <p>Drag and drop a PDF here, or click to select a file</p>
      )}
    </div>
  );
}
