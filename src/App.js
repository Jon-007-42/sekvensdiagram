import React, { useState } from "react";
import "./styles.css";
import SequenceStep from "./SequenceStep";
import PrintableSequenceStep from "./PrintableSequenceStep";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";

export default function App() {
  const [steps, setSteps] = useState([
    {
      id: 0,
      title: "Init/start",
      functions: ["Nulstil alt", "Fjern fejltilstand", "Vent på start"],
      trigger: "power_on"
    },
    {
      id: 1,
      title: "Start-knap",
      functions: ["Lys tændes", "Data vises", "Vent på aktivering"],
      trigger: "start_knap"
    },
    {
      id: 2,
      title: "Laser Sektion 1",
      functions: ["Laser tænd", "Skanner aktiv", "Vent på laser done"],
      trigger: "laser_done"
    }
  ]);

  const [previewImage, setPreviewImage] = useState(null);

  const addStep = () => {
    const nextId = steps.length;
    const newStep = {
      id: nextId,
      title: `Trin ${nextId}`,
      functions: [""],
      trigger: "aktivér"
    };
    setSteps([...steps, newStep]);
  };

  const updateFunctions = (id, newFunctions) => {
    const updated = steps.map((step) =>
      step.id === id ? { ...step, functions: newFunctions } : step
    );
    setSteps(updated);
  };

  const handleDownload = () => {
    const el = document.getElementById("print-area");
    if (!el) return;
    html2pdf()
      .set({
        margin: 1,
        filename: "sekvensdiagram.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      })
      .from(el)
      .save();
  };

  const handleImagePreview = async () => {
    const el = document.getElementById("print-area");
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 2 });
    const dataUrl = canvas.toDataURL("image/png");
    setPreviewImage(dataUrl);
  };

  return (
    <>
      <div className="container">
        {steps.map((step, index) => (
          <div key={step.id}>
            <SequenceStep step={step} onUpdateFunctions={updateFunctions} />

            {index < steps.length - 1 && (
              <div className="connector">
                <div className="line" />
                <div
                  className="trigger editable"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const updated = [...steps];
                    updated[index + 1].trigger = e.target.innerText;
                    setSteps(updated);
                  }}
                >
                  {steps[index + 1].trigger}
                </div>
              </div>
            )}
          </div>
        ))}

        <button className="add-button" onClick={addStep}>
          ➕ Tilføj nyt trin
        </button>

        <div style={{ marginTop: "20px" }}>
          <button className="download-button" onClick={handleDownload}>
            📄 Download som PDF
          </button>
          <button
            className="download-button"
            onClick={handleImagePreview}
            style={{ marginLeft: "10px", backgroundColor: "#6f42c1" }}
          >
            🖼️ Vis som billede
          </button>
        </div>

        {previewImage && (
          <div style={{ marginTop: "30px" }}>
            <h3>📸 Billede af sekvensdiagram</h3>
            <img
              src={previewImage}
              alt="Sekvensdiagram"
              style={{ maxWidth: "100%", border: "2px solid #ccc" }}
            />
            <p style={{ fontSize: "14px", color: "#666" }}>
              Højreklik billedet og vælg <strong>“Gem som...”</strong> eller kopier.
            </p>
          </div>
        )}
      </div>

      <div
        id="print-area"
        style={{
          position: "relative",
          padding: "40px",
          backgroundColor: "#fff",
          border: "2px dashed red",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontFamily: "sans-serif" }}>Sekvensdiagram</h1>

        {steps.map((step, index) => (
          <div key={step.id}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrintableSequenceStep step={step} />
            </div>
            {index < steps.length - 1 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 90px 300px",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}
              >
                <div></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <div style={{ width: "2px", height: "30px", background: "black" }} />
                  <div style={{ fontSize: "16px", fontStyle: "italic", marginTop: "4px" }}>
                    {steps[index + 1].trigger}
                  </div>
                </div>
                <div></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
