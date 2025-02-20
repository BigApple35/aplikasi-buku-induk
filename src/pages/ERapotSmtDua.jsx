import React from "react";
import "../css/eRapot.css";
import * as XLSX from "xlsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ERaportSmtDua = () => {
  const [dataExcel, setDataExcel] = useState([]);
  const navigate = useNavigate();

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });
      setDataExcel((prevData) => [...prevData, sheetData]);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="container">
      <h1>E - Raport Semester 2</h1>

      <div className="grid-container">
        {/* Tanpa Map */}
        <div className="grid-item-sub-bab-flex">
          <button
            onClick={() => navigate("/eRapotS1")}
            className="grid-item-sub-bab-semester"
          >
            Semester 1
          </button>
        </div>
        <div className="grid-item-sub-bab-flex">
          <button
            onClick={() => navigate("/eRapotS2")}
            className="grid-item-sub-bab-semester"
          >
            Semester 2
          </button>
        </div>
        <div className="grid-item-sub-bab-flex">
          <button
            onClick={() => navigate("/eRapotS3")}
            className="grid-item-sub-bab-semester"
          >
            Semester 3
          </button>
        </div>
        <div className="grid-item-sub-bab-flex">
          <button
            onClick={() => navigate("/eRapotS4")}
            className="grid-item-sub-bab-semester"
          >
            Semester 4
          </button>
        </div>
        <div className="grid-item-sub-bab-flex">
          <button
            onClick={() => navigate("/eRapotS5")}
            className="grid-item-sub-bab-semester"
          >
            Semester 5
          </button>
        </div>
        <div className="grid-item-sub-bab-flex">
          <button
            onClick={() => navigate("/eRapotS6")}
            className="grid-item-sub-bab-semester"
          >
            Semester 6
          </button>
        </div>
        <div className="grid-item-sub-bab">E - Raport</div>
      </div>

      <div className="grid-container-info">
        <button className="grid-item-info-edit">✅️ Edit</button>
        <button className="grid-item-nim">Tambahkan NIM</button>
        <button className="grid-item-info-download">Download</button>
        <button
          className="grid-item-excel"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Import Excel
        </button>
        <input
          type="file"
          id="fileInput"
          accept=".xlsx, .xls"
          style={{ display: "none" }}
          onChange={handleImportExcel}
        />
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <table className="table">
            <thead className="table-th">
              <tr>
                <th>MATA PELAJARAN</th>
                <th>NILAI R</th>
                <th>KETERANGAN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input style={{ border: "none" }} type="text" name="" id="" />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="number"
                    name=""
                    id=""
                  />
                </td>
                <td>
                  <textarea
                    style={{ border: "none", width: "100%" }}
                    name=""
                    id=""
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input style={{ border: "none" }} type="text" name="" id="" />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="number"
                    name=""
                    id=""
                  />
                </td>
                <td>
                  <textarea
                    style={{ border: "none", width: "100%" }}
                    name=""
                    id=""
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input style={{ border: "none" }} type="text" name="" id="" />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="number"
                    name=""
                    id=""
                  />
                </td>
                <td>
                  <textarea
                    style={{ border: "none", width: "100%" }}
                    name=""
                    id=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid-item">
          <table className="table">
            <thead>
              <tr>
                <th>EKSTRAKULIKULER</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input style={{ border: "none" }} type="text" name="" id="" />
                </td>
              </tr>
              <tr>
                <td>
                  <input style={{ border: "none" }} type="text" name="" id="" />
                </td>
              </tr>
              <tr>
                <td>
                  <input style={{ border: "none" }} type="text" name="" id="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Ketidakhadiran */}
      <div className="attendance-section">
        <table className="table">
          <thead>
            <tr>
              <th>KETIDAKHADIRAN</th>
              <th>JUMLAH HARI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Izin</td>
              <td>
                <input style={{ border: "none" }} type="number" name="" id="" />{" "}
                hari
              </td>
            </tr>
            <tr>
              <td>Sakit</td>
              <td>
                <input style={{ border: "none" }} type="number" name="" id="" />{" "}
                hari
              </td>
            </tr>
            <tr>
              <td>Tanpa Keterangan</td>
              <td>
                <input style={{ border: "none" }} type="number" name="" id="" />{" "}
                hari
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tabel Hasil Import Excel */}
      {dataExcel.length > 0 && (
        <div className="imported-table">
          <h2>Data dari Excel</h2>
          {dataExcel.map((tableData, tableIndex) => (
            <table key={tableIndex} className="table">
              <thead>
                <tr>
                  {tableData[0].map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      )}
    </div>
  );
};

export default ERaportSmtDua;