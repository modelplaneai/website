import ArchDiagram from '../src/components/ArchDiagram'

export default function GifExport() {
  return (
    <>
      <style>{`
        html, body {
          background: #030724 !important;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        body::after { display: none !important; }
        .arch-wrap {
          opacity: 1 !important;
          animation: none !important;
        }
      `}</style>
      <div style={{ width: 560, padding: '12px 16px', boxSizing: 'border-box' }}>
        <ArchDiagram />
      </div>
    </>
  )
}
