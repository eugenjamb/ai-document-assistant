import React, { useState } from "react";
import { askQuestion } from "../api";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;
    try {
      const res = await askQuestion(question);
      setAnswer(res.data.answer || "No answer received.");
    } catch (err) {
      console.error(err);
      setAnswer("Error while fetching answer.");
    }
  };

  return (
    <div>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your question..."
        rows={3}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <button onClick={handleAsk}>Ask</button>

      {answer && (
        <div style={{ marginTop: 20, padding: 10, background: "#f7f7f7" }}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
