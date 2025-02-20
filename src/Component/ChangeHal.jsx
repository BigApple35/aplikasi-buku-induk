import React from 'react';
import { Link } from 'react-router-dom';

const PilihHalaman = () => {
  return (
    <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <div className="d-flex align-items-center justify-content-center p-3 bg-primary rounded">
        <Link to={'/admin/audit/26/biodata'} className="text-white text-decoration-none">Halaman Depan</Link>
      </div>
      <div className="d-flex align-items-center justify-content-center p-3 bg-primary rounded">
        <Link to={'/admin/audit/26/belakang'} className="text-white text-decoration-none">Halaman Belakang</Link>
      </div>
    </div>
  );
}

export default PilihHalaman;
