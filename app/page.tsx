"use client";

import React, { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleSubmit = async () => {
    setSubmittedValue(inputValue);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen/qwen3-32b",
          message: inputValue,
        }),
      });

      const data = await res.json();

      // data structure depends on Hack Club AI API response
      setAiResponse(
        data.choices?.[0]?.message?.content || JSON.stringify(data),
      );
    } catch (err) {
      setAiResponse("Error calling AI: " + err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter Text Here"
      />

      <button onClick={handleSubmit}>Ask AI</button>

      <p>you typed: {submittedValue}</p>
      <p>AI response: {aiResponse}</p>
    </div>
  );
}
