import React, { useState, useEffect } from "react";
import axios from "axios";
import InputHalaman from "../Component/ChangeHal";
import Profil from "../Component/Profile";
import { useParams } from "react-router";
import "../css/halBelakang.css";
import client from "../utils/client";
import { useNavigate, useLocation } from "react-router-dom";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:8080";

const ERaport = () => {
  const [activeSemester, setActiveSemester] = useState(1);
  const [mapelList, setMapelList] = useState([]);
  const [nilaiList, setNilaiList] = useState([]);

  useEffect(() => {
    fetchMapel();
    fetchNilai();
  }, [activeSemester]);

  const params = useParams();
  const navigate = useNavigate()

  const fetchMapel = async () => {
    try {
      const response = await axios.get(baseUrl + "/admin/mapel", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMapelList(response.data);
    } catch (error) {
      console.error("Error fetching mapel:", error);
    }
  };

  const handleSave = async () => {
    try {
      const data = nilaiList.map((val) => ({
        mapel_id: val.mapel.id,
        r: val.nilai,
        keterangan: val.keterangan,
      }));
  
      const sia = nilaiList.length > 0 ? nilaiList[0].sia : { sakit: 0, izin: 0, alpha: 0 };
  
      const response = await axios.post(
        baseUrl + "/admin/nilai",
        {
          semester: activeSemester,
          user_id: params.id,
          sia,
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      alert("Data berhasil disimpan!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving nilai:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const fetchNilai = async () => {
    try {
      const response = await axios.get(baseUrl + `/admin/nilai/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data[`Semester ${activeSemester}`].length !== 0) {
        setNilaiList(response.data[`Semester ${activeSemester}`].map((val) => ({
          sia: {
            sakit: val.SIA.sakit ?? 0,
            izin: val.SIA.izin ?? 0,
            alpha: val.SIA.alpha ?? 0,
          },
          mapel: {
            id: val.mapel_id,
            nama: val.mapel.nama,
          },
          nilai: val.r,
          keterangan: val.keterangan,
        })));
      } else {
        setNilaiList([]);
      }
    } catch (error) {
      console.error("Error fetching nilai:", error);
    }
  };

  const deleteNilai = (index) => {
    const newNilaiList = [...nilaiList];
    newNilaiList.splice(index, 1);
    setNilaiList(newNilaiList);
  };

  const [siswaData, setSiswaData] = useState({})

  useEffect(() => {
    client.get("/admin/akun/" + params.id).then(({ data }) => {
      setSiswaData(data);
    });
  }, []);

  const handleAddRow = () => {
    setNilaiList([...nilaiList, { mapel: "", nilai: "", keterangan: "" }]);
  };

  const handleButtonClickHalamanBelakang = (button) => {
    navigate("/dashboard/siswa/" + params.id);
  };

  const exportDataPDF = () => {
    client
      .get(
        `/admin/export-raport-pdf/${params.id}`,
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

  const location = useLocation()

  const handleSIAChange = (field, value) => {

    setNilaiList((prevList) => {
      if (prevList.length === 0) return prevList; // Ensure there's at least one item
      const updatedList = [...prevList];
      updatedList[0] = {
        ...updatedList[0],
        sia: {
          ...updatedList[0].sia,
          [field]: parseInt(value),
        },
      };
      return updatedList;
    });
  };

  const handleInputChange = (index, field, value) => {
    const newNilaiList = [...nilaiList];
    newNilaiList[index][field] = value;
    setNilaiList(newNilaiList);
  };

  return (
    <div className="container py-4 bg-light min-vh-100">
          <div className="container">
        <div className="form-section">
          <h2>Informasi Siswa</h2>
          <div className="form-group-row">
            <div className="form-group">
              <label>Nama Siswa</label>
              <input
                type="text"
                defaultValue={siswaData?.data_diri?.nama_lengkap}
                placeholder="Nama Siswa"
              />
            </div>
            <div className="form-group">
              <label>Angkatan</label>
              <input
                type="text"
                defaultValue={siswaData?.angkatan?.tahun}
                placeholder="Nama Siswa"
              />
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>NISN Siswa</label>
              <input
                type="text"
                defaultValue={siswaData?.nisn}
                placeholder="NISN Siswa"
              />
            </div>
            <div className="form-group">
              <label>Jurusan</label>
              <input
                type="text"
                value={siswaData?.jurusan?.nama}
                placeholder="Nama Siswa"
              />
            </div>
          </div>
        </div>
        <div className="button-section">
          <button
            className={location.pathname.includes("/rapot") ? "" : "active"}
            onClick={handleButtonClickHalamanBelakang}
          >
            Halaman Depan
          </button>
          <button
            className={location.pathname.includes("/rapot") ? "active" : ""}
          >
            Halaman Belakang
          </button>
        </div>
      </div>
    <div>
    </div>
    <h1 className="text-center my-4">E - Raport (Semester {activeSemester})</h1>

    <div className="d-flex gap-2 flex-wrap mb-4">
      {[...Array(6)].map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveSemester(index + 1)}
          className={`btn ${activeSemester === index + 1 ? "btn-primary" : "btn-secondary"}`}
        >
          Semester {index + 1}
        </button>
      ))}
      <button onClick={() => {handleSave()}} className="btn btn-success">Simpan</button>
      <button className="btn btn-danger" onClick={exportDataPDF}>Expor</button>
    </div>

    <div className="row g-4">
      <div className="col-md-8 bg-white p-4 shadow-sm">
        <table className="table table-bordered">
          <thead className="table-light text-center">
            <tr>
              <th>MATA PELAJARAN</th>
              <th>NILAI</th>
              <th>KETERANGAN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {nilaiList.map((item, index) => (
              <tr key={index}>
                <td>
                  <select
                    className="form-select"
                    defaultValue={item.mapel.id}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedMapel = mapelList.find((mapel) => mapel.id == selectedId);
                      handleInputChange(index, "mapel", {
                        id: selectedId,
                        nama: selectedMapel ? selectedMapel.nama : ""
                      });
                    }}
                  >
                    <option value="">Pilih Mapel</option>
                    {mapelList.map((mapel) => (
                      <option key={mapel.id} value={mapel.id}>{mapel.nama}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Nilai"
                    value={item.nilai}
                    onChange={(e) => handleInputChange(index, "nilai", e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    className="form-control"
                    placeholder="Deskripsi"
                    value={item.keterangan}
                    onChange={(e) => handleInputChange(index, "keterangan", e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => deleteNilai(index)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddRow} className="btn btn-primary mt-3">Tambah Nilai</button>
      </div>

      <div className="col-md-4">
        {nilaiList[0]?.sia && (
          <table className="table table-bordered">
            <thead className="table-light text-center">
              <tr>
                <th>FIELD</th>
                <th>HARI</th>
              </tr>
            </thead>
            <tbody>
              {['sakit', 'izin', 'alpha'].map((field) => (
                <tr key={field}>
                  <td className="text-capitalize">{field}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Nilai"
                      value={nilaiList[0]?.sia?.[field] || ""}
                      onChange={(e) => handleSIAChange(field, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
  );
};

export default ERaport;
