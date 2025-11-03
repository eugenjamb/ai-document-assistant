import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import ChatBox from "./components/ChatBox";

function App() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", fontFamily: "Arial" }}>
      <h2>🧠 AI Document Assistant</h2>
      {!uploaded ? (
        <FileUploader onUploadSuccess={() => setUploaded(true)} />
      ) : (
        <ChatBox />
      )}
    </div>
  );
}

export default App;
