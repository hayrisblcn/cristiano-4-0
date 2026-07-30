import React, { useState } from 'react';

// Örnek veri yapısı (Kendi verilerin/import'ların ile çalışır)
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(100);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      {/* Başlık */}
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>CRISTIANO 4.0: Absolute Scouting</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Veri Analitiği & Algoritmik Oyuncu Değerlendirme</p>
      </header>

      {/* Mobilde Alt Alta Esneyen Filtre Konteyneri */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        marginBottom: '20px',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: '15px',
        borderRadius: '8px'
      }}>
        {/* Arama Kutusu */}
        <input
          type="text"
          placeholder="Oyuncu ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 200px',
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />

        {/* Mevki Butonları */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {['ALL', 'DF', 'MF', 'FW'].map((pos) => (
            <button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: selectedPosition === pos ? '#007bff' : '#e0e0e0',
                color: selectedPosition === pos ? '#fff' : '#333',
                cursor: 'pointer'
              }}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* Market Value Slider (Mobilde Net Görünür) */}
        <div style={{ flex: '1 1 200px', minWidth: '180px' }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>
            Maks. Piyasa Değeri: €{maxPrice}M
          </label>
          <input
            type="range"
            min="0"
            max="150"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Sağa-Sola Kaydırılabilir Mobil Uyumlu Tablo Konteyneri */}
      <div style={{
        width: '100%',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px'
      }}>
        <table style={{
          width: '100%',
          minWidth: '650px', /* Mobilde sütunların ezilmesini önler */
          borderCollapse: 'collapse',
          backgroundColor: '#fff'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'left' }}>
              <th style={{ padding: '12px', whiteSpace: 'nowrap' }}>Oyuncu</th>
              <th style={{ padding: '12px', whiteSpace: 'nowrap' }}>Mevki</th>
              <th style={{ padding: '12px', whiteSpace: 'nowrap' }}>Yaş</th>
              <th style={{ padding: '12px', whiteSpace: 'nowrap' }}>Piyasa Değeri (€M)</th>
              <th style={{ padding: '12px', whiteSpace: 'nowrap' }}>Absolute Score</th>
            </tr>
          </thead>
          <tbody>
            {/* Tablo İçeriği */}
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>Sample Player</td>
              <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>FW</td>
              <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>24</td>
              <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>€45.0M</td>
              <td style={{ padding: '12px', whiteSpace: 'nowrap', color: '#28a745', fontWeight: 'bold' }}>88.4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
