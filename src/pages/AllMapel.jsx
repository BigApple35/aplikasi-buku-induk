import React, { useEffect, useState } from "react";
import TableSiswa from "../Component/Dashboard/TableSiswa";
import { FaMale, FaFemale, FaSearch, FaFilter } from "react-icons/fa";
import "../css/data-siswa.css";
import client from "../utils/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllMapel() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    client.get("/admin/mapel").then(({ data }) => {
      setData(data);
    });
  }, []);

  return (
    <div className="w-100 container">
      <ToastContainer position="top-right" autoClose={1900} />
      <div className="col-12 d-flex title mb-2 justify-content-between align-items-center">
        <h1 className="">Mata Pelajaran</h1>
        <button
          type="button"
          class="btn btn-primary btn-lg"
          data-bs-toggle="modal"
          onClick={(e) => {
            setSelected(null);
          }}
          data-bs-target="#modalId"
        >
          Tambah
        </button>
      </div>
      <div className="search-box p-0">
        <form action="" className="search-bar">
          <FaSearch />
          <input type="text" name="" id="" placeholder="Cari..." />
        </form>
      </div>

      <div className="mt-5">
        <TableJurusan setter={setSelected} data={data} />
      </div>

      <ModalBody data={selected} />
    </div>
  );
}

function ModalBody({ data }) {
  const [mapel, setMapel] = useState("");
  let mode = "update";
  if (data === null) {
    mode = "create";
  }

  const SaveUpdated = (e) => {
    e.preventDefault();
    if (!mapel.trim()) {
      toast.error("Kolom tidak boleh kosong");
      return;
    }

    client.put("/admin/mapel/" + data?.id, { nama: mapel }).then((data) => {
      toast.success("Mata pelajaran berhasil diperbarui");
      setTimeout(() => window.location.reload(), 2000);
    });
  };

  const CreateButton = (e) => {
    e.preventDefault();
    if (!mapel.trim()) {
      toast.error("Kolom tidak boleh kosong");
      return;
    }

    client.post("/admin/mapel", { nama: mapel }).then((data) => {
      toast.success("Mata pelajaran berhasil ditambahkan");
      setTimeout(() => window.location.reload(), 2000);
    });
  };

  return (
    <div
      class="modal fade"
      id="modalId"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">
              Mata Pelajaran
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="" className="form form-control">
              <div className="d-flex gap-5">
                <label htmlFor="" className="col-3">
                  Masukkan Mata Pelajaran
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setMapel(e.target.value);
                  }}
                  className="form-control"
                  name="nama"
                  id=""
                  defaultValue={data?.nama}
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            {/* <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Keluar
            </button> */}
            {mode === "create" && (
              <button
                type="button"
                class="btn btn-primary"
                onClick={CreateButton}
              >
                Buat
              </button>
            )}

            {mode === "update" && (
              <button
                type="button"
                class="btn btn-primary"
                onClick={SaveUpdated}
              >
                Simpan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TableJurusan({ setter, data }) {
  return (
    <table className="w-100">
      <thead>
        <tr>
          <td>Id</td>
          <td>Mata Pelajaran</td>
          <td>Aksi</td>
        </tr>
      </thead>
      <tbody>
        {data.map((val) => (
          <Row setSelected={setter} id={val?.id} nama={val?.nama} />
        ))}
      </tbody>
    </table>
  );
}

function Row({ id, selected, setSelected, nama }) {
  const deleteAngkatan = () => {
    if (
      !window.confirm(
        "Apakah anda yakin anda ingin menghapus Jurusan ini dan semua siswa di dalam nya"
      )
    ) {
      return;
    }
    client.delete("admin/mapel/" + id).then(({ data }) => {
      alert("Angkatan berhasil di hapus");
      window.location.reload();
    });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{nama}</td>
      <td className="col-aksi">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalId"
          onClick={(e) => setSelected({ nama, id })}
        >
          Ubah
        </button>
      </td>
    </tr>
  );
}

export default AllMapel;