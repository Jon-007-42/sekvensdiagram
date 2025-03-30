import React from "react";

export default function PrintableSequenceStep({ step }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 90px 300px",
        alignItems: "center",
        gap: "20px",
        padding: "20px 0",
        width: "100%"
      }}
    >
      <div
        style={{
          textAlign: "right",
          fontWeight: "bold",
          fontSize: "16px",
          alignSelf: "center"
        }}
      >
        {step.title}
      </div>
      <div
        style={{
          width: "90px",
          height: "90px",
          border: "2px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "24px",
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
          margin: "0 auto"
        }}
      >
        {step.id}
      </div>
      <div>
        {step.functions.map((func, idx) => (
          <div
            key={idx}
            style={{
              padding: "4px 0",
              borderBottom: "1px solid #ccc",
              fontSize: "14px",
              textAlign: "left"
            }}
          >
            {func}
          </div>
        ))}
      </div>
    </div>
  );
}
