import React, { useEffect, useState } from "react";
import "../../css/tablesiswa.css";
import client from "../../utils/client";
import { useNavigate } from "react-router-dom";

function TableSiswa({ dashboard, search, jurusan, angkatan }) {
  const [siswa, setSiswa] = useState([]);
  search = search ? search : "";
  jurusan = jurusan ? jurusan : "";
  angkatan = angkatan ? angkatan : "";

  jurusan = jurusan.replaceAll("+", " ");

  // useEffect(() => {
  //   client.get(`/admin/akun?search=${search}&jurusan=${jurusan}&angkatan=${angkatan}`)
  //   .then(({data}) => {
  //     setSiswa(data)
  //     console.log(search);
  //     console.log(data);
  //   })
  // }, [])

  useEffect(() => {
    client
      .get(
        `/admin/akun?search=${search}&jurusan=${jurusan}&angkatan=${angkatan}`
      )
      .then(({ data }) => {
        setSiswa(data);
        console.log("Search:", search);
        console.log("Data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [search, jurusan, angkatan]);


  const getSiswa = () => {
    client.get("/admin/akun").then(({ data }) => {
      setSiswa(data);
      console.log(data);
    });
  };

  // const getSiswa = () => {
  //   client
  //     .get(
  //       `/admin/akun?search=${search}&jurusan=${jurusan}&angkatan=${angkatan}`
  //     )
  //     .then(({ data }) => {
  //       setSiswa(data);
  //       console.log("Data siswa:", data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };


  return (
    <div className="w-100">
      <table className="w-100">
        <thead style={{ fontWeight: "bold" }}>
          <tr>
            <td>No</td>
            <td>NISN</td>
            <td>Nama</td>
            <td>Aksi</td>
          </tr>
        </thead>

        <tbody>
          {siswa.map((val, index) => {
            if (dashboard && index > 4) {
              return;
            }
            return (
              <Row
                id={val?.id}
                NISN={val?.nisn}
                nama={val?.nama}
                key={index}
                getSiswa={getSiswa}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Row({ id, NISN, nama, getSiswa }) {
  const nav = useNavigate();
  const deleteSiswa = () => {
    if (!window.confirm("Apakah anda yakin ingin menghapus data " + nama)) {
      return;
    }
    client.delete("admin/akun" + id).then(() => {
      alert(nama + " berhasil dihapus");
      getSiswa();
    });
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{NISN}</td>
      <td>{nama}</td>
      <td className="col-aksi">
        <button
          className="btn-primary btn"
          onClick={() => {
            nav(`/dashboard/siswa/${id}`);
          }}
        >
          Lihat Detail
        </button>
        <button className="btn-danger btn" onClick={deleteSiswa}>
          Hapus
        </button>
      </td>
    </tr>
  );
}

export default TableSiswa;
