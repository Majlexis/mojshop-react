import { useState } from 'react'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [heslo, setHeslo] = useState('')
  const [chyba, setChyba] = useState('')

  function prihlasit() {
    fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, heslo })
    })
    .then(res => res.json())
    .then(function(data) {
      if (data.error) {
        setChyba(data.error)
      } else {
        localStorage.setItem('token', data.token)
        localStorage.setItem('rola', data.rola)
        onLogin(data.rola)
      }
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5',
      fontFamily: 'Arial'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        border: '1px solid #e0e0e0',
        width: '360px'
      }}>
        <h2 style={{ color: '#1a1a2e', marginBottom: '24px', textAlign: 'center' }}>
          Prihlásenie
        </h2>

        {chyba && (
          <div style={{
            background: '#fdecea',
            color: '#e63946',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {chyba}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #e0e0e0', borderRadius: '6px', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Heslo"
          value={heslo}
          onChange={e => setHeslo(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '16px', border: '1px solid #e0e0e0', borderRadius: '6px', boxSizing: 'border-box' }}
        />

        <button
          onClick={prihlasit}
          style={{
            width: '100%',
            background: '#1a1a2e',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
          Prihlásiť sa
        </button>
      </div>
    </div>
  )
}

export default Login