import React, { useEffect, useRef, useState } from "react";
import TableSiswa from "../Component/Dashboard/TableSiswa";
import "../css/data-siswa.css";
import { useNavigate } from "react-router-dom";
import { FaMale, FaFemale, FaSearch, FaFilter } from "react-icons/fa";
import client from "../utils/client";
import fileDownload from "js-file-download";
import { useSearchParams } from "react-router-dom";
import { Axios } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllSiswa() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [jurusan, setJurusan] = useState([]);
  const [angkatan, setAngkatan] = useState([]);
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const [selectedAngkatan, setSelectedAngkatan] = useState("");
  const navigate = useNavigate();
  const searchQuery = searchParams.get("search")
    ? searchParams.get("search")
    : "";
  const jurusanQuery = searchParams.get("jurusan")
    ? searchParams.get("jurusan")
    : "";
  const angkatanQuery = searchParams.get("angkatan")
    ? searchParams.get("angkatan")
    : "";

  useEffect(() => {
    client.get("/siswa/jurusan").then(({ data }) => {
      setJurusan(data);
      console.log(data);
    });

    client.get("/siswa/angkatan").then(({ data }) => {
      setAngkatan(data);
    });
  }, []);

  const exportData = () => {
    client
      .get(
        `/admin/export-excel?search=${searchQuery}&jurusan=${jurusanQuery}&angkatan=${angkatanQuery}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        fileDownload(response.data, "data-siswa.xlsx");
        toast.success("Ekspor Excel berhasil");
      })
      .catch((error) => {
        console.error("Download error:", error);
        toast.error("Gagal mengekspor Excel !");
      });
  };

  const exportDataPDF = () => {
    client
      .get(
        `/admin/export-pdf?search=${searchQuery}&jurusan=${jurusanQuery}&angkatan=${angkatanQuery}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        fileDownload(response.data, "download.pdf");
        toast.success("Ekspor PDF berhasil");
      })
      .catch((error) => {
        console.error("Download error:", error);
        toast.error("Gagal mengekspor PDF !");
      });
  };

  const addDataSiswa = () => {
    navigate("/dashboard/isi-data");
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    navigate(
      `?search=${searchQuery}&jurusan=${selectedJurusan}&angkatan=${selectedAngkatan}`
    );
  };

  return (
    <div className="w-100 container">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="col-12 d-flex title mb-2 justify-content-between align-items-center">
        <h1 className=" ">Data Siswa</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-primary" onClick={addDataSiswa}>
            Tambah Data Siswa
          </button>
          <button className="btn btn-primary" onClick={exportDataPDF}>
            Ekspor Pdf
          </button>
          <button className="btn btn-primary" onClick={exportData}>
            Ekspor Excel
          </button>
        </div>
      </div>
      <div className="search-box p-0">
        <form action="" className="search-bar">
          <FaSearch />
          <input
            type="text"
            name="search"
            id=""
            placeholder="Cari Data Siswa..."
          />
        </form>
        <button onClick={() => setFilterOpen(!filterOpen)}>
          <FaFilter />
          <div>Filter</div>
        </button>
      </div>

      {filterOpen && (
        <div className="filter-box">
          <form
            className="form-control w-100 p-4"
            onSubmit={handleFilterSubmit}
          >
            <h4 className="fw-semibold">Filter Siswa</h4>
            <div className="mb-3">
              <label className="fw-semibold">Jurusan</label>
              <select
                className="form-select"
                value={selectedJurusan}
                onChange={(e) => setSelectedJurusan(e.target.value)}
              >
                <option value="">Pilih Jurusan</option>
                {jurusan.map((val, index) => (
                  <option key={index} value={val?.nama}>
                    {val?.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="fw-bold">Angkatan</label>
              <select
                className="form-select"
                value={selectedAngkatan}
                onChange={(e) => setSelectedAngkatan(e.target.value)}
              >
                <option value="">Pilih Angkatan</option>
                {angkatan.map((val, index) => (
                  <option key={index} value={val?.tahun}>
                    {val?.tahun}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Terapkan
            </button>
          </form>
        </div>
      )}

      <div className="mt-5">
        <TableSiswa
          search={searchQuery}
          jurusan={searchParams.get("jurusan")}
          angkatan={searchParams.get("angkatan")}
        />
      </div>
    </div>
  );
}

function CheckBox({ label, id, className, name, value }) {
  return (
    <div className={"form-check " + className}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        className="form-check-input"
      />
      <label htmlFor={id} type="checkbox" className="form-check-label">
        {label}
      </label>
    </div>
  );
}

export default AllSiswa;