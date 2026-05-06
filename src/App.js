import { useState, useEffect } from 'react'
import Produkt from './Produkt'
import Admin from './Admin'
import Login from './Login'

function App() {

  const [kosik, setKosik] = useState([])
  const [produkty, setProdukty] = useState([])
  const [stranka, setStranka] = useState('obchod')
  const [rola, setRola] = useState(localStorage.getItem('rola') || null)

  function onLogin(novaRola) {
    setRola(novaRola)
    setStranka('admin')
  }

  function odhlasit() {
    localStorage.removeItem('token')
    localStorage.removeItem('rola')
    setRola(null)
    setStranka('obchod')
  }

  useEffect(function() {
    fetch('https://mojshop-backend-production.up.railway.app')
      .then(function(res) { return res.json() })
      .then(function(data) { setProdukty(data) })
  }, [])

  function pridajDoKosika(produkt) {
    setKosik([...kosik, produkt])
  }

  const celkom = kosik.reduce(function(suma, polozka) {
    return suma + polozka.cena
  }, 0)

  if (stranka === 'admin' && !rola) return <Login onLogin={onLogin} />

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>

      <header style={{
        background: "#1a1a2e",
        color: "white",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ fontSize: "22px" }}>MôjShop</h1>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>

          {rola === 'admin' && (
            <button
              onClick={() => setStranka(stranka === 'obchod' ? 'admin' : 'obchod')}
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid white',
                padding: '4px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px'
              }}>
              {stranka === 'obchod' ? 'Admin' : 'Späť do obchodu'}
            </button>
          )}

          {!rola && (
            <button
              onClick={() => setStranka('admin')}
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid white',
                padding: '4px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px'
              }}>
              Prihlásiť
            </button>
          )}

          {rola && (
            <button
              onClick={odhlasit}
              style={{
                background: '#e63946',
                color: 'white',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px'
              }}>
              Odhlásiť
            </button>
          )}

          <span style={{
            background: "#e63946",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "13px"
          }}>
            Košík: {kosik.length}
          </span>

        </div>
      </header>

      {stranka === 'admin' ? (
        <Admin />
      ) : (
        <main style={{ maxWidth: "900px", margin: "32px auto", padding: "0 16px" }}>
          <h2 style={{ marginBottom: "20px", color: "#1a1a2e" }}>Najnovšie produkty</h2>
          <div style={{ display: "flex", gap: "20px" }}>
            {produkty.map(function(produkt) {
              return (
                <Produkt
                  key={produkt.id}
                  nazov={produkt.nazov}
                  cena={produkt.cena}
                  popis={produkt.popis}
                  onPridat={pridajDoKosika}
                />
              )
            })}
          </div>

          {kosik.length > 0 && (
            <div style={{
              marginTop: "40px",
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              border: "1px solid #e0e0e0"
            }}>
              <h3 style={{ color: "#1a1a2e", marginBottom: "16px" }}>Tvoj košík</h3>
              {kosik.map(function(polozka, index) {
                return (
                  <div key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #f0f0f0",
                    fontSize: "14px"
                  }}>
                    <span>{polozka.nazov}</span>
                    <span style={{ color: "#e63946", fontWeight: "bold" }}>{polozka.cena} €</span>
                  </div>
                )
              })}
              <div style={{
                marginTop: "16px",
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "right"
              }}>
                Celkom: {celkom} €
              </div>
            </div>
          )}
        </main>
      )}

    </div>
  )
}

export default App