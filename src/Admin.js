import { useState, useEffect } from 'react'

function Admin() {
  const [produkty, setProdukty] = useState([])
  const [nazov, setNazov] = useState('')
  const [popis, setPopis] = useState('')
  const [cena, setCena] = useState('')
  const [kategoria, setKategoria] = useState('')

  // Načítaj produkty
  function nacitajProdukty() {
    fetch('https://mojshop-backend-production.up.railway.app')
      .then(res => res.json())
      .then(data => setProdukty(data))
  }

  useEffect(function() {
    nacitajProdukty()
  }, [])

  // Pridaj produkt
  function pridajProdukt() {
    fetch('https://mojshop-backend-production.up.railway.app', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nazov: nazov,
        popis: popis,
        cena: parseFloat(cena),
        kategoria: kategoria
      })
    })
    .then(res => res.json())
    .then(function() {
      nacitajProdukty()
      setNazov('')
      setPopis('')
      setCena('')
      setKategoria('')
    })
  }

  // Vymaž produkt
  function vymazProdukt(id) {
    fetch('https://mojshop-backend-production.up.railway.app' + id, {
      method: 'DELETE'
    })
    .then(function() {
      nacitajProdukty()
    })
  }

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '900px', margin: '32px auto', padding: '0 16px' }}>

      <h1 style={{ color: '#1a1a2e', marginBottom: '32px' }}>Admin panel</h1>

      {/* FORMULÁR */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '10px',
        border: '1px solid #e0e0e0',
        marginBottom: '32px'
      }}>
        <h2 style={{ marginBottom: '16px', fontSize: '16px', color: '#1a1a2e' }}>
          Pridať nový produkt
        </h2>

        <input
          placeholder="Názov produktu"
          value={nazov}
          onChange={e => setNazov(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        />
        <input
          placeholder="Popis"
          value={popis}
          onChange={e => setPopis(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        />
        <input
          placeholder="Cena (napr. 99.99)"
          value={cena}
          onChange={e => setCena(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        />
        <input
          placeholder="Kategória"
          value={kategoria}
          onChange={e => setKategoria(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '16px', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        />

        <button
          onClick={pridajProdukt}
          style={{
            background: '#1a1a2e',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
          Pridať produkt
        </button>
      </div>

      {/* ZOZNAM PRODUKTOV */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '10px',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ marginBottom: '16px', fontSize: '16px', color: '#1a1a2e' }}>
          Všetky produkty ({produkty.length})
        </h2>

        {produkty.map(function(produkt) {
          return (
            <div key={produkt.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div>
                <div style={{ fontWeight: '500', color: '#1a1a2e' }}>{produkt.nazov}</div>
                <div style={{ fontSize: '13px', color: '#999' }}>{produkt.kategoria} · {produkt.cena} €</div>
              </div>
              <button
                onClick={() => vymazProdukt(produkt.id)}
                style={{
                  background: '#e63946',
                  color: 'white',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}>
                Vymazať
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Admin