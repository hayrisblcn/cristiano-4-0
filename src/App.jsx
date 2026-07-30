import React, { useState } from 'react';
import playersData from './INPUTSS.json';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLeague, setSelectedLeague] = useState('Primeira Liga');
  
  const [selectedPos, setSelectedPos] = useState("DF");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  
  // Modal Açma / Kapama Durumu
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parseMarketValue = (valStr) => {
    if (!valStr) return 0;
    const cleanStr = String(valStr).replace(/[^0-9]/g, '');
    return parseInt(cleanStr, 10) || 0;
  };

  const filteredAndSortedPlayers = [...playersData]
    .filter(p => {
      const pos = String(p.Pos || "").toUpperCase();
      if (selectedPos === "DF" && !pos.includes("DF")) return false;
      if (selectedPos === "MF" && !pos.includes("MF")) return false;
      if (selectedPos === "FW" && (!pos.includes("FW") && !pos.includes("ST"))) return false;

      const valNumber = parseMarketValue(p["Market Values"]);
      const minVal = minPriceInput !== "" ? parseFloat(minPriceInput) * 1000000 : 0;
      const maxVal = maxPriceInput !== "" ? parseFloat(maxPriceInput) * 1000000 : Infinity;

      if (valNumber < minVal || valNumber > maxVal) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const aDef = Number(a["Defence Score"]) || 0;
      const bDef = Number(b["Defence Score"]) || 0;
      const aMid = Number(a["Midfielder Score"]) || 0;
      const bMid = Number(b["Midfielder Score"]) || 0;
      const aFwd = Number(a["Strike Score"]) || 0;
      const bFwd = Number(b["Strike Score"]) || 0;

      if (selectedPos === "DF") {
        if (bDef !== aDef) return bDef - aDef;
        if (bMid !== aMid) return bMid - aMid;
        return bFwd - aFwd;
      } else if (selectedPos === "MF") {
        if (bMid !== aMid) return bMid - aMid;
        if (bFwd !== aFwd) return bFwd - aFwd;
        return bDef - aDef;
      } else if (selectedPos === "FW") {
        if (bFwd !== aFwd) return bFwd - aFwd;
        if (bMid !== aMid) return bMid - aMid;
        return bDef - aDef;
      }
      return 0;
    });

  // Ortak Footer Bileşeni
  const Footer = () => (
    <footer style={{ marginTop: 'auto', paddingTop: '3rem', paddingBottom: '1.5rem', textAlign: 'center', color: '#94a3b8', borderTop: '1px solid #1e293b', width: '100%' }}>
      <p style={{ fontWeight: 'bold', color: '#e2e8f0', fontSize: '1.05rem', margin: '0 0 0.4rem 0' }}>
        Hayriyenur Balçın
      </p>
      <p style={{ fontSize: '0.9rem', color: '#10b981', margin: '0 0 0.8rem 0' }}>
        contact: hayrisblcn@gmail.com
      </p>
      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
        © All Rights Reserved
      </p>
    </footer>
  );

  // ==================== 1. HOME PAGE ====================
  if (currentPage === 'home') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#090d16', color: '#fff', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 2rem 0 2rem', boxSizing: 'border-box' }}>
        
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '4rem 2.5rem 3.5rem 2.5rem', textAlign: 'center', maxWidth: '600px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            
            <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#10b981', marginTop: '0.5rem', marginBottom: '2.5rem', letterSpacing: '1px', lineHeight: '1.3' }}>
              CRISTIANO 4.0 : ABSOLUTE SCOUTING
            </h1>

            <div style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.6rem', fontWeight: 'bold' }}>
                Choose a League
              </label>
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#1e293b',
                  color: '#fff',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="Primeira Liga">Primeira Liga</option>
              </select>
            </div>

            <button
              onClick={() => setCurrentPage('scout')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#10b981',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Find a Player
            </button>

          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // ==================== 2. SCOUT PAGE ====================
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', color: '#fff', fontFamily: 'sans-serif', padding: '2rem 2rem 0 2rem', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      
      <div style={{ flex: 1, maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
            CRISTIANO 4.0
          </h1>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#10b981',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 'bold'
              }}
            >
              How Are the Scores Calculated?
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#1e293b',
                color: '#94a3b8',
                border: '1px solid #334155',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 'bold'
              }}
            >
              ← Back to Home
            </button>
          </div>
        </header>

        <main style={{ marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Position Select */}
            <div>
              <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Position Select</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { id: 'DF', label: 'Defender' },
                  { id: 'MF', label: 'Midfielder' },
                  { id: 'FW', label: 'Forward' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPos(item.id)}
                    style={{
                      flex: 1,
                      padding: '0.8rem',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      backgroundColor: selectedPos === item.id ? '#10b981' : '#1e293b',
                      color: selectedPos === item.id ? '#000' : '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Market Value Range */}
            <div>
              <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                Market Value Range (€ Million)
              </h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    placeholder="Min (e.g. 5)"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      backgroundColor: '#1e293b',
                      color: '#fff',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>-</span>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    placeholder="Max (e.g. 25)"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      backgroundColor: '#1e293b',
                      color: '#fff',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Player Table */}
          <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.85rem', backgroundColor: '#1e293b' }}>
                  <th style={{ padding: '1rem' }}>Player</th>
                  <th style={{ padding: '1rem' }}>Squad</th>
                  <th style={{ padding: '1rem' }}>Age</th>
                  <th style={{ padding: '1rem' }}>Market Value</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>DEF SCORE</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>MID SCORE</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>STRIKE SCORE</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedPlayers.map((player, idx) => {
                  const valNumber = parseMarketValue(player["Market Values"]);
                  const formattedVal = valNumber ? `€${valNumber.toLocaleString()}` : (player["Market Values"] || '-');

                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #1e293b' }}>
                      <td style={{ padding: '1rem', fontWeight: 'bold' }}>{player.Player || '-'}</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>{player.Squad || '-'}</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>{player.Age || '-'}</td>
                      <td style={{ padding: '1rem', color: '#10b981', fontWeight: 'bold' }}>{formattedVal}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: selectedPos === 'DF' ? '#10b981' : '#fff', fontWeight: selectedPos === 'DF' ? 'bold' : 'normal' }}>
                        {player["Defence Score"] ?? '-'}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: selectedPos === 'MF' ? '#10b981' : '#fff', fontWeight: selectedPos === 'MF' ? 'bold' : 'normal' }}>
                        {player["Midfielder Score"] ?? '-'}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: selectedPos === 'FW' ? '#10b981' : '#fff', fontWeight: selectedPos === 'FW' ? 'bold' : 'normal' }}>
                        {player["Strike Score"] ?? '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Footer />

      {/* ==================== FORMÜLLER MODAL (POP-UP) ==================== */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            zIndex: 1000,
            padding: '1.5rem',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '16px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
              <h2 style={{ color: '#10b981', margin: 0, fontSize: '1.5rem' }}>
                Scoring Methodology & Metrics
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0 0.5rem'
                }}
              >
                ✕
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* FORWARD CARD */}
              <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
                <h3 style={{ color: '#10b981', marginTop: 0, borderBottom: '1px solid #334155', paddingBottom: '0.5rem', fontSize: '1.1rem' }}>
                  Forward (FW) Score
                </h3>
                <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0, fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>• Goal: <strong>+5 pts</strong></li>
                  <li>• Assist: <strong>+3 pts</strong></li>
                  <li>• Shot on Target: <strong>+0.3 pts</strong></li>
                  <li>• Yellow Card: <strong>-1 pt</strong></li>
                  <li>• Red Card: <strong>-3 pts</strong></li>
                  <li>• Duels Won: <strong>+0.2 pts</strong></li>
                  <li>• Goal / Shot Ratio × (+10) <em>(Shots on Target &gt; 5)</em></li>
                  <li>• Shot Conversion / 100 × (+4) <em>(Total Shots &gt; 10)</em></li>
                  <li>• Minutes Played / 90 × 0.5</li>
                  <li>• Age &gt; 30: <strong>-1.5 pts</strong> per additional year</li>
                  <li>• Age &lt; 20: <strong>-1 pt</strong> per year under 20</li>
                  <li>• Unused Substitute Appearance: <strong>-0.8 pts</strong></li>
                  <li>• Successful Cross: <strong>+0.2 pts</strong></li>
                  <li>• Interception: <strong>+0.1 pts</strong></li>
                </ul>
              </div>

              {/* MIDFIELDER CARD */}
              <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
                <h3 style={{ color: '#10b981', marginTop: 0, borderBottom: '1px solid #334155', paddingBottom: '0.5rem', fontSize: '1.1rem' }}>
                  Midfielder (MF) Score
                </h3>
                <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0, fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>• Goal: <strong>+4 pts</strong></li>
                  <li>• Assist: <strong>+4 pts</strong></li>
                  <li>• Shot on Target: <strong>+0.4 pts</strong></li>
                  <li>• Yellow Card: <strong>-0.8 pts</strong></li>
                  <li>• Red Card: <strong>-3 pts</strong></li>
                  <li>• Duels Won: <strong>+0.5 pts</strong></li>
                  <li>• Goal / Shot Ratio × (+10) <em>(Shots on Target &gt; 4)</em></li>
                  <li>• Shot Conversion / 100 × (+4.5) <em>(Total Shots &gt; 5)</em></li>
                  <li>• Minutes Played / 90 × 0.5</li>
                  <li>• Age &gt; 30: <strong>-1.2 pts</strong> per additional year</li>
                  <li>• Age &lt; 20: <strong>-1.5 pts</strong> per year under 20</li>
                  <li>• Unused Substitute Appearance: <strong>-0.65 pts</strong></li>
                  <li>• Successful Cross: <strong>+0.15 pts</strong></li>
                  <li>• Interception: <strong>+0.2 pts</strong></li>
                </ul>
              </div>

              {/* DEFENDER CARD */}
              <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
                <h3 style={{ color: '#10b981', marginTop: 0, borderBottom: '1px solid #334155', paddingBottom: '0.5rem', fontSize: '1.1rem' }}>
                  Defender (DF) Score
                </h3>
                <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0, fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>• Goal: <strong>+3 pts</strong></li>
                  <li>• Assist: <strong>+3 pts</strong></li>
                  <li>• Shot on Target: <strong>+0.5 pts</strong></li>
                  <li>• Yellow Card: <strong>-0.5 pts</strong></li>
                  <li>• Red Card: <strong>-3 pts</strong></li>
                  <li>• Duels Won: <strong>+0.5 pts</strong></li>
                  <li>• Goal / Shot Ratio × (+10) <em>(Shots on Target &gt; 3)</em></li>
                  <li>• Shot Conversion / 100 × (+5) <em>(Total Shots &gt; 5)</em></li>
                  <li>• Minutes Played / 90 × 0.5</li>
                  <li>• Age &gt; 30: <strong>-1 pt</strong> per additional year</li>
                  <li>• Age &lt; 20: <strong>-1.5 pts</strong> per year under 20</li>
                  <li>• Unused Substitute Appearance: <strong>-0.5 pts</strong></li>
                  <li>• Successful Cross: <strong>+0.1 pts</strong></li>
                  <li>• Interception: <strong>+0.25 pts</strong></li>
                </ul>
              </div>

            </div>

            {/* UPCOMING FEATURES SECTION */}
            <div style={{ backgroundColor: '#1e293b', padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
              <h3 style={{ color: '#e2e8f0', marginTop: 0, marginBottom: '0.75rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#10b981' }}>🚀</span> Upcoming Features & Data Integration
              </h3>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0, fontSize: '0.85rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ color: '#e2e8f0', fontWeight: 'bold' }}>★ Other Leagues</li>
                <li>• Goalkeeper Specific Scores & Analytics</li>
                <li>• Advanced Passing & Playmaking Metrics</li>
                <li>• Dynamic Rating Adjustments for Senior (First Team) vs. Reserve / Academy Appearances</li>
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
