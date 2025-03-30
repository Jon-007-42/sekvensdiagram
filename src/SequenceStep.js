import React from "react";

export default function SequenceStep({ step, onUpdateFunctions }) {
  const handleChange = (index, value) => {
    const updated = [...step.functions];
    updated[index] = value;
    onUpdateFunctions(step.id, updated);
  };

  const addFunction = () => {
    onUpdateFunctions(step.id, [...step.functions, ""]);
  };

  const removeFunction = (index) => {
    const updated = step.functions.filter((_, i) => i !== index);
    onUpdateFunctions(step.id, updated);
  };

  return (
    <div className="sequence-step">
      <div
        className="step-title"
        contentEditable
        suppressContentEditableWarning={true}
      >
        {step.title}
      </div>

      <div className="step-box">{step.id}</div>

      <div className="step-functions">
        {step.functions.map((func, idx) => (
          <div key={idx} className="function-edit-line">
            <input
              type="text"
              value={func}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="function-input"
            />
            <button onClick={() => removeFunction(idx)} className="small-btn">
              ✖
            </button>
          </div>
        ))}
        <button onClick={addFunction} className="add-func-button">
          ➕ Tilføj funktion
        </button>
      </div>
    </div>
  );
}
