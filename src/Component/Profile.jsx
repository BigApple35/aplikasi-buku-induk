import React from "react";

const StudentInfo = () => {
  const angkatanMapping = {
    1: "2022",
    2: "2023",
    3: "2024",
    4: "2025",
  };

  const jurusanMapping = {
    1: "Rekayasa Perangkat Lunak",
    2: "Desain Komunikasi Visual",
    3: "Audio Video",
    4: "Broadcasting",
    5: "Animasi",
    6: "Teknik Komunikasi Jaringan",
    7: "Elektronika Industri",
    8: "Mekatronika",
  };

  const angkatanId = localStorage.getItem("akun-angkatanId");
  const jurusanId = localStorage.getItem("akun-jurusanId");

  return (
    <div className="bg-white p-4 rounded shadow w-100 mx-auto">
      <h2 className="mb-3">Informasi Siswa</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nama Siswa</label>
          <input
            type="text"
            value={localStorage.getItem("biodata-nama")}
            readOnly
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Angkatan</label>
          <input
            type="text"
            value={angkatanMapping[angkatanId] || "Angkatan tidak ditemukan"}
            readOnly
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">NIS</label>
          <input
            type="text"
            value={localStorage.getItem("akun-nisn")}
            readOnly
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Jurusan</label>
          <input
            type="text"
            value={jurusanMapping[jurusanId] || "Jurusan tidak ditemukan"}
            readOnly
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
