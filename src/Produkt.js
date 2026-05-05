function Produkt({ nazov, cena, popis, onPridat }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      padding: "20px",
      flex: "1"
    }}>
      <h3 style={{ color: "#1a1a2e", marginBottom: "8px" }}>
        {nazov}
      </h3>
      <p style={{ color: "#666", fontSize: "13px", marginBottom: "8px" }}>
        {popis}
      </p>
      <p style={{ color: "#e63946", fontWeight: "bold", fontSize: "18px" }}>
        {cena} €
      </p>
      <button
        onClick={() => onPridat({ nazov, cena })}
        style={{
          background: "#1a1a2e",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "6px",
          width: "100%",
          cursor: "pointer",
          marginTop: "12px"
        }}>
        Pridať do košíka
      </button>
    </div>
  )
}

export default Produkt