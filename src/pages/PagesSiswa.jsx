import React, { useEffect, useState } from "react";
import "../css/addSiswa.css";
import { FaDownload, FaPrint } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import client from "../utils/client";
import dataKeahlian from "./paket_keahlian (1).json";
import { useNavigate } from "react-router-dom";

const PagesSiswa = () => {
  const [active, setActive] = useState("data_diri");
  const [formData, setFormData] = useState({});
  const [siswaData, setSiswaData] = useState({});
  const { id } = useParams();
  const [nisn, setNisn] = useState("");
  const navigate = useNavigate();
  // const [nisn, setNisn] = useState(formData?.nisn || "");

  const [activeButton, setActiveButton] = useState("");
  const handleButtonClickHalamanBelakang = (button) => {
    setActiveButton(button);
    navigate("/eRapot");
  };

  const changeData = (e) => {
    const [parentKey, childKey] = e.target.name.split(" ");

    setFormData({
      ...formData,
      [parentKey]: {
        ...formData[parentKey],
        [childKey]: e.target.value,
      },
    });
    console.log(formData);
  };

  //   useEffect(() => {
  //     client.get("/admin/akun/" + id).then(({ data }) => {
  //       setSiswaData(data);
  //       console.log(siswaData);
  //     });
  //   }, []);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  useEffect(() => {
    console.log("formData:", formData);
    console.log("siswaData:", formData?.siswaData);
    console.log("data_diri:", formData?.siswaData?.data_diri);
    console.log("siswa:", formData?.siswaData?.data_diri?.siswa);
    console.log("nisn:", formData?.siswaData?.data_diri?.siswa?.nisn);
    console.log("formData saat ini:", formData);

    setNisn(formData.nisn || "");
  }, [formData]);

  useEffect(() => {
    fetch("/api/siswa/6")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data dari API:", data);
        setFormData(data); // Pastikan API memang mengembalikan nisn
      });
  }, []);

  function changeActive(e) {
    setActive(e.target.id);
  }

  //   function SaveButton(e) {
  //     e.preventDefault();
  //     client.put("admin/data-diri/" + id, formData).then(({ data }) => {
  //       alert("Successfully Updated");
  //       console.log(formData);
  //     });
  //   }

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  function EditButton(e) {
    setEditMode(!editMode);
  }

  function printFormData() {
    console.log(siswaData);
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print Form Data</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write("<h1>Form Data</h1>");
    printWindow.document.write("<ol>");

    // Function to print form area data
    function printFormAreaData(areaData, areaName) {
      if (areaData) {
        printWindow.document.write(`<li>${areaName}<ol>`);
        for (const key in areaData) {
          if (areaData.hasOwnProperty(key)) {
            const value = areaData[key] ? areaData[key].toString() : "";
            printWindow.document.write(`<li>${key}: ${value}</li>`);
          }
        }
        printWindow.document.write("</ol></li>");
      }
    }

    // Print 'Data Diri' form area data
    printFormAreaData(siswaData["data_diri"], "Data Diri");
    printFormAreaData(siswaData["ayah_kandung"], "Data Diri");
    printFormAreaData(siswaData["ibu_kandung"], "Data Diri");
    printFormAreaData(siswaData["kesehatan"], "Data Diri");
    printFormAreaData(siswaData["pendidikan"], "Data Diri");
    printFormAreaData(siswaData["setelah_pendidikan"], "Data Diri");
    printFormAreaData(siswaData["tempat_tinggal"], "Data Diri");

    printWindow.document.write("</ol>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  }

  //   function downloadPdf() {
  //     client
  //       .get("/admin/export-pdf/" + id, {
  //         responseType: "blob",
  //       })
  //       .then((response) => {
  //         const url = window.URL.createObjectURL(new Blob([response.data]));
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.setAttribute("download", "example.pdf"); // or any other filename
  //         document.body.appendChild(link);
  //         link.click();
  //       })
  //       .catch((error) => {
  //         console.error("Download error:", error);
  //       });
  //   }

  return (
    <div className="w-100 container d-flex flex-column ">
      <h1>Data diri siswa</h1>
      {/* Section Keterangan Data Diri */}
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
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Angkatan</label>
              <input
                type="text"
                defaultValue={siswaData?.angkatan?.tahun}
                placeholder="Nama Siswa"
                readOnly
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
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Jurusan</label>
              <input
                type="text"
                value={siswaData?.jurusan?.nama}
                placeholder="Nama Siswa"
                readOnly
              />
            </div>
          </div>
        </div>
        {/* <div className="button-section">
          <button
            className={activeButton === "halamanDepan" ? "active" : ""}
            onClick={""}
          >
            Halaman Depan
          </button>
          <button
            className={activeButton === "halamanBelakang" ? "active" : ""}
            onClick={handleButtonClickHalamanBelakang}
          >
            Halaman Belakang
          </button>
        </div> */}
      </div>
      {/* End Section Keterangan Data Diri */}

      {/* <div className="col-12 d-flex title mb-2 justify-content-between align-items-center border-0">
        <h2 className=" ">
          {active[0].toUpperCase() + active.slice(1).replaceAll("_", " ")}
        </h2>
        <div className="d-flex gap-5">
          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="fs-5 btn-header"
              onClick={downloadPdf}
              style={{
                fontSize: "24px",
                display: "flex",
                gap: 10,
                alignItems: "center",
                display: "flex",
                backgroundColor: "rgba(13, 110, 253, 100)",
                gap: 10,
                alignItems: "center",
                color: "white",
                borderRadius: "8px",
              }}
            >
              <FaDownload />
              Download
            </button>
            <button
              style={{
                display: "flex",
                backgroundColor: "rgba(13, 110, 253, 100)",
                gap: 10,
                alignItems: "center",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={printFormData}
              className="fs-5 btn-header"
            >
              <FaPrint style={{ color: "white" }} />
              Print
            </button>
            <button className=" btn btn-primary btn-lg" onClick={EditButton}>
              Ubah
            </button>
            <button className=" btn btn-primary btn-lg" onClick={SaveButton}>
              Simpan
            </button>
          </div>
        </div>
      </div> */}

      {/* <div className="nav-form-cont flex-grow-0">
        <button
          onClick={changeActive}
          id="data_diri"
          className={`btn btn-${
            active === "data_diri" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Data Diri
        </button>
        <button
          onClick={changeActive}
          id="ayah_kandung"
          className={`btn btn-${
            active === "ayah_kandung" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Ayah Kandung
        </button>
        <button
          onClick={changeActive}
          id="ibu_kandung"
          className={`btn btn-${
            active === "ibu_kandung" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Ibu Kandung
        </button>
        <button
          onClick={changeActive}
          id="kesehatan"
          className={`btn btn-${
            active === "kesehatan" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Kesehatan
        </button>
        <button
          onClick={changeActive}
          id="pendidikan"
          className={`btn btn-${
            active === "pendidikan" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Pendidikan
        </button>
        <button
          onClick={changeActive}
          id="setelah_pendidikan"
          className={`btn btn-${
            active === "setelah_pendidikan" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Setelah Pendidikan
        </button>
        <button
          onClick={changeActive}
          id="tempat_tinggal"
          className={`btn btn-${
            active === "tempat_tinggal" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Tempat Tinggal
        </button>
        <button
          onClick={changeActive}
          id="wali"
          className={`btn btn-${
            active === "wali" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Wali
        </button>
        <button
          onClick={changeActive}
          id="hobi_siswa"
          className={`btn btn-${
            active === "hobi_siswa" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Hobi Siswa
        </button>
        <button
          onClick={changeActive}
          id="perkembangan_siswa"
          className={`btn btn-${
            active === "perkembangan_siswa" ? "primary" : "secondary"
          } btn-form-nav`}
        >
          Keterangan Perkembangan Siswa
        </button>
      </div> */}

      {/* Pebaikan */}
      <div className="nav-form-cont">
        <div className="nav-tabs">
          <button
            onClick={changeActive}
            id="data_diri"
            className={`tab ${active === "data_diri" ? "active-tab" : ""}`}
          >
            Biodata
          </button>
          <button
            onClick={changeActive}
            id="tempat_tinggal"
            className={`tab ${active === "tempat_tinggal" ? "active-tab" : ""}`}
          >
            Tempat Tinggal
          </button>
          <button
            onClick={changeActive}
            id="kesehatan"
            className={`tab ${active === "kesehatan" ? "active-tab" : ""}`}
          >
            Kesehatan
          </button>
          <button
            onClick={changeActive}
            id="pendidikan"
            className={`tab ${active === "pendidikan" ? "active-tab" : ""}`}
          >
            Pendidikan
          </button>
          <button
            onClick={changeActive}
            id="wali"
            className={`tab ${active === "wali" ? "active-tab" : ""}`}
          >
            Ket. Wali
          </button>
          <button
            onClick={changeActive}
            id="ibu_kandung"
            className={`tab ${active === "ibu_kandung" ? "active-tab" : ""}`}
          >
            Ket. Ibu
          </button>
          <button
            onClick={changeActive}
            id="ayah_kandung"
            className={`tab ${active === "ayah_kandung" ? "active-tab" : ""}`}
          >
            Ket. Ayah
          </button>
          <button
            onClick={changeActive}
            id="hobi_siswa"
            className={`tab ${active === "hobi_siswa" ? "active-tab" : ""}`}
          >
            Hobi
          </button>
          <button
            onClick={changeActive}
            id="perkembangan_siswa"
            className={`tab ${
              active === "perkembangan_siswa" ? "active-tab" : ""
            }`}
          >
            Perkembangan Siswa
          </button>
        </div>
      </div>

      {/* Pebaikan */}

      <div className="mt-5">
        <FormArea buttonId="data_diri" active={active}>
          <InputText
            editMode={editMode}
            name="data_diri nama_lengkap"
            defaultValue={siswaData?.data_diri?.nama_lengkap}
            changeData={changeData}
          />
          <InputText
            name="data_diri nama_panggilan"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.nama_panggilan}
            changeData={changeData}
          />
          <RadioComponent
            options={["laki-laki", "perempuan"]}
            editMode={editMode}
            name="data_diri jenis_kelamin"
            defaultValue={siswaData?.data_diri?.jenis_kelamin}
            changeData={changeData}
          />
          <InputText
            name="data_diri tempat_lahir"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.tempat_lahir}
            changeData={changeData}
          />
          <InputText
            name="data_diri agama"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.agama}
            changeData={changeData}
          />
          <InputText
            name="data_diri kewarganegaraan"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.kewarganegaraan}
            changeData={changeData}
          />
          <IntegerInput
            name="data_diri anak_ke"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.anak_ke?.toString()}
            changeData={changeData}
          />
          <IntegerInput
            name="data_diri jml_saudara_kandung"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.jml_saudara_kandung?.toString()}
            changeData={changeData}
          />
          <IntegerInput
            name="data_diri jml_saudara_tiri"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.jml_saudara_tiri?.toString()}
            changeData={changeData}
          />
          <IntegerInput
            name="data_diri jml_saudara_angkat"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.jml_saudara_angkat?.toString()}
            changeData={changeData}
          />
          <SelectInput
            name="data_diri kelengkapan_ortu"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.kelengkapan_ortu}
            changeData={changeData}
            options={["yatim", "piatu", "yatim piatu", "lengkap"]}
          />
          <InputText
            name="data_diri bahasa_sehari_hari"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.bahasa_sehari_hari}
            changeData={changeData}
          />
          <DateInput
            name="data_diri tanggal_lahir"
            editMode={editMode}
            defaultValue={siswaData?.data_diri?.tanggal_lahir}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="ayah_kandung" active={active}>
          <InputText
            name="ayah_kandung nama"
            editMode={editMode}
            defaultValue={siswaData?.ayah_kandung?.nama}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung tempat_lahir"
            editMode={editMode}
            defaultValue={siswaData?.ayah_kandung?.tempat_lahir}
            changeData={changeData}
          />
          <DateInput
            name="ayah_kandung tanggal_lahir"
            editMode={editMode}
            defaultValue={siswaData?.ayah_kandung?.tanggal_lahir}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung agama"
            editMode={editMode}
            defaultValue={siswaData?.ayah_kandung?.agama}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung kewarganegaraan"
            editMode={editMode}
            defaultValue={siswaData?.ayah_kandung?.kewarganegaraan}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung pendidikan"
            editMode={editMode}
            defaultValue={siswaData?.ayah_kandung?.pendidikan}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung pekerjaan"
            editMode={editMode}
            defaultValue={siswaData?.ayah_kandung?.pekerjaan}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung pengeluaran_per_bulan"
            editMode={editMode}
            defaultValue={siswaData?.ayah_kandung?.pengeluaran_per_bulan}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung alamat_dan_no_telepon"
            editMode={editMode}
            defaultValue={siswaData?.ayah_kandung?.alamat_dan_no_telepon}
            changeData={changeData}
          />
          <SelectInput
            name="ibu_kandung status"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.status}
            changeData={changeData}
            options={["masih hidup", "meninggal"]}
          />
        </FormArea>

        <FormArea buttonId="ibu_kandung" active={active}>
          <InputText
            name="ibu_kandung nama"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.nama}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung tempat_lahir"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.tempat_lahir}
            changeData={changeData}
          />
          <DateInput
            name="ibu_kandung tanggal_lahir"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.tanggal_lahir}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung agama"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.agama}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung kewarganegaraan"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.kewarganegaraan}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung pendidikan"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.pendidikan}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung pekerjaan"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.pekerjaan}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung pengeluaran_per_bulan"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.pengeluaran_per_bulan}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung alamat_dan_no_telepon"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.alamat_dan_no_telepon}
            changeData={changeData}
          />
          <SelectInput
            name="ibu_kandung status"
            editMode={editMode}
            defaultValue={siswaData?.ibu_kandung?.status}
            changeData={changeData}
            options={["masih hidup", "meninggal"]}
          />
        </FormArea>

        <FormArea buttonId="kesehatan" active={active}>
          <SelectInput
            options={["A", "B", "O", "AB"]}
            editMode={editMode}
            name="kesehatan gol_darah"
            defaultValue={siswaData?.kesehatan?.gol_darah}
            changeData={changeData}
          />
          <InputText
            name="kesehatan penyakit_pernah_diderita"
            editMode={editMode}
            defaultValue={siswaData?.kesehatan?.penyakit_pernah_diderita}
            changeData={changeData}
          />
          <InputText
            name="kesehatan kelainan_jasmani"
            editMode={editMode}
            defaultValue={siswaData?.kesehatan?.kelainan_jasmani}
            changeData={changeData}
          />
          <InputText
            name="kesehatan tinggi"
            editMode={editMode}
            defaultValue={siswaData?.kesehatan?.tinggi}
            changeData={changeData}
          />
          <InputText
            name="kesehatan berat_badan"
            editMode={editMode}
            defaultValue={siswaData?.kesehatan?.berat_badan}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="pendidikan" active={active}>
          <InputText
            name="pendidikan sebelumnya_tamatan_dari"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.sebelumnya_tamatan_dari}
            changeData={changeData}
          />
          <InputText
            name="pendidikan sebelumnya_tanggal_dan_ijazah"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.sebelumnya_tanggal_dan_ijazah}
            changeData={changeData}
          />
          <InputText
            name="pendidikan sebelumnya_tanggal_skhun_dan_"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.sebelumnya_tanggal_skhun_dan_}
            changeData={changeData}
          />
          <InputText
            name="pendidikan sebelumnya_lama_belajar"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.sebelumnya_lama_belajar}
            changeData={changeData}
          />
          <InputText
            name="pendidikan pindahan_dari_sekolah"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.pindahan_dari_sekolah}
            changeData={changeData}
          />
          <InputText
            name="pendidikan pindahan_alasan"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.pindahan_alasan}
            changeData={changeData}
          />
          <InputText
            name="pendidikan diterima_di_kelas"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.diterima_di_kelas?.toString()}
            changeData={changeData}
          />
          <InputText
            name="pendidikan diterima_di_bidang_keahlian"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.diterima_di_bidang_keahlian}
            changeData={changeData}
          />
          <InputText
            name="pendidikan diterima_di_program_keahlian"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.diterima_di_program_keahlian}
            changeData={changeData}
          />
          <InputText
            name="pendidikan diterima_di_paket_keahlian"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.diterima_di_paket_keahlian}
            changeData={changeData}
          />
          <DateInput
            name="pendidikan diterima_tanggal"
            editMode={editMode}
            defaultValue={siswaData?.pendidikan?.diterima_tanggal}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="setelah_pendidikan" active={active}>
          <InputText
            name="setelah_pendidikan melanjutkan_ke"
            editMode={editMode}
            defaultValue={siswaData?.setelah_pendidikan?.melanjutkan_ke}
            changeData={changeData}
          />
          <InputText
            name="setelah_pendidikan bekerja_nama_perusahaan"
            editMode={editMode}
            defaultValue={
              siswaData?.setelah_pendidikan?.bekerja_nama_perusahaan
            }
            changeData={changeData}
          />
          <InputText
            name="setelah_pendidikan bekerja_tanggal_mulai"
            editMode={editMode}
            defaultValue={siswaData?.setelah_pendidikan?.bekerja_tanggal_mulai}
            changeData={changeData}
          />
          <InputText
            name="setelah_pendidikan bekerja_penghasilan"
            editMode={editMode}
            defaultValue={siswaData?.setelah_pendidikan?.bekerja_penghasilan}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="tempat_tinggal" active={active}>
          <InputText
            name="tempat_tinggal alamat"
            editMode={editMode}
            defaultValue={siswaData?.tempat_tinggal?.alamat}
            changeData={changeData}
          />
          <InputText
            name="tempat_tinggal no_telepon"
            editMode={editMode}
            defaultValue={siswaData?.tempat_tinggal?.no_telepon}
            changeData={changeData}
          />
          <InputText
            name="tempat_tinggal tinggal_dengan"
            editMode={editMode}
            defaultValue={siswaData?.tempat_tinggal?.tinggal_dengan}
            changeData={changeData}
          />
          <InputText
            name="tempat_tinggal jarak_ke_sekolah"
            editMode={editMode}
            defaultValue={siswaData?.tempat_tinggal?.jarak_ke_sekolah}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="wali" active={active}>
          <InputText
            name="wali nama"
            editMode={editMode}
            defaultValue={siswaData?.wali?.nama}
            changeData={changeData}
          />
          <InputText
            name="wali tempat_lahir"
            editMode={editMode}
            defaultValue={siswaData?.wali?.tempat_lahir}
            changeData={changeData}
          />
          <DateInput
            name="wali tanggal_lahir"
            editMode={editMode}
            defaultValue={siswaData?.wali?.tanggal_lahir}
            changeData={changeData}
          />
          <InputText
            name="wali agama"
            editMode={editMode}
            defaultValue={siswaData?.wali?.agama}
            changeData={changeData}
          />
          <InputText
            name="wali kewarganegaraan"
            editMode={editMode}
            defaultValue={siswaData?.wali?.kewarganegaraan}
            changeData={changeData}
          />
          <InputText
            name="wali pendidikan"
            editMode={editMode}
            defaultValue={siswaData?.wali?.pendidikan}
            changeData={changeData}
          />
          <InputText
            name="wali pekerjaan"
            editMode={editMode}
            defaultValue={siswaData?.wali?.pekerjaan}
            changeData={changeData}
          />
          <InputText
            name="wali pengeluaran_per_bulan"
            editMode={editMode}
            defaultValue={siswaData?.wali?.pengeluaran_per_bulan}
            changeData={changeData}
          />
          <InputText
            name="wali alamat_dan_no_telepon"
            editMode={editMode}
            defaultValue={siswaData?.wali?.alamat_dan_no_telepon}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="hobi_siswa" active={active}>
          <InputText
            name="hobi_siswa kesenian"
            editMode={editMode}
            defaultValue={siswaData?.hobi_siswa?.kesenian}
            changeData={changeData}
          />
          <InputText
            name="hobi_siswa olahraga"
            editMode={editMode}
            defaultValue={siswaData?.hobi_siswa?.olahraga}
            changeData={changeData}
          />
          <InputText
            name="hobi_siswa organisasi"
            editMode={editMode}
            defaultValue={siswaData?.hobi_siswa?.organisasi}
            changeData={changeData}
          />
          <InputText
            name="hobi_siswa lain_lain"
            editMode={editMode}
            defaultValue={siswaData?.hobi_siswa?.lain_lain}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="perkembangan_siswa" active={active}>
          <InputText
            name="perkembangan menerima_bea_siswa_tahun_kelas_dari"
            editMode={editMode}
            defaultValue={
              siswaData?.perkembangan?.menerima_bea_siswa_tahun_kelas_dari
            }
            changeData={changeData}
          />
          <DateInput
            name="perkembangan meninggalkan_sekolah_ini_tanggal"
            editMode={editMode}
            defaultValue={
              siswaData?.perkembangan?.meninggalkan_sekolah_ini_tanggal
            }
            changeData={changeData}
          />
          <InputText
            name="perkembangan meninggalkan_sekolah_ini_alasan"
            editMode={editMode}
            defaultValue={
              siswaData?.perkembangan?.meninggalkan_sekolah_ini_alasan
            }
            changeData={changeData}
          />
          <InputText
            name="perkembangan akhir_pendidikan_tamat_belajar_lulus_tahun"
            editMode={editMode}
            defaultValue={
              siswaData?.perkembangan
                ?.akhir_pendidikan_tamat_belajar_lulus_tahun
            }
            changeData={changeData}
          />
          <InputText
            name="perkembangan akhir_pendidikan_no_tanggal_ijazah"
            editMode={editMode}
            defaultValue={
              siswaData?.perkembangan?.akhir_pendidikan_no_tanggal_ijazah
            }
            changeData={changeData}
          />
          <InputText
            name="perkembangan akhir_pendidikan_no_tanggal_skhun"
            editMode={editMode}
            defaultValue={
              siswaData?.perkembangan?.akhir_pendidikan_no_tanggal_skhun
            }
            changeData={changeData}
          />
        </FormArea>
      </div>
    </div>
  );
};

function FormArea({ buttonId, active, field, children, editMode }) {
  return (
    <div className={`${active === buttonId ? "active" : ""} form-area`}>
      <form
        action=""
        style={{ width: "100%" }}
        className="d-flex align-items-center flex-column row-gap-3 justify-content-center"
      >
        {children}
      </form>
    </div>
  );
}

function InputText({ name, changeData, defaultValue, editMode }) {
  const [parentKey, childValue] = name.split(" ");
  return (
    <div className="d-flex align-items-center " style={{ width: "90%" }}>
      <label htmlFor="" className="col-3">
        {childValue[0].toUpperCase() + childValue.slice(1).replaceAll("_", " ")}
      </label>
      <input
        placeholder=""
        disabled={!editMode}
        type="text"
        className="input-dataDiri col-8"
        style={{ maxHeight: 40, height: 40 }}
        name={name}
        onChange={changeData}
        id=""
        defaultValue={defaultValue}
      />
    </div>
  );
}

function IntegerInput({ name, changeData, defaultValue, editMode }) {
  const [parentKey, childValue] = name.split(" ");
  return (
    <div className="d-flex align-items-center " style={{ width: "90%" }}>
      <label htmlFor="" className="col-3">
        {childValue[0].toUpperCase() + childValue.slice(1).replaceAll("_", " ")}
      </label>
      <input
        placeholder=""
        type="number"
        className="input-dataDiri col-8"
        disabled={!editMode}
        style={{ maxHeight: 40, height: 40 }}
        name={name}
        onChange={changeData}
        id=""
        defaultValue={defaultValue}
      />
    </div>
  );
}

function RadioComponent({ name, changeData, defaultValue, options, editMode }) {
  const [parentKey, childKey] = name.split(" ");
  options = ["laki-laki", "perempuan"];
  console.log(defaultValue);

  return (
    <div className="d-flex align-items-center" style={{ width: "90%" }}>
      <label className="col-3">
        {childKey[0].toUpperCase() + childKey.slice(1).replaceAll("_", " ")}
      </label>
      {defaultValue && (
        <div className="col-8 d-flex flex-wrap g-3">
          {options.map((option, index) => (
            <div key={index} className="d-flex g-3 w-100">
              <input
                type="radio"
                disabled={!editMode}
                className="input-dataDiri form-check-input border-black border-2"
                name={name}
                value={option}
                onChange={changeData}
                defaultChecked={defaultValue == option}
                id={`${parentKey}_${option}`}
              />
              <label htmlFor={`${parentKey}_${option}`}>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DateInput({ name, changeData, defaultValue, editMode }) {
  const [parentKey, childValue] = name.split(" ");
  return (
    <div className="d-flex align-items-center " style={{ width: "90%" }}>
      <label htmlFor="" className="col-3">
        {childValue[0].toUpperCase() + childValue.slice(1).replaceAll("_", " ")}
      </label>
      <input
        placeholder=""
        type="date"
        disabled={!editMode}
        className="input-dataDiri col-3"
        style={{ maxHeight: 40, height: 40 }}
        name={name}
        onChange={function (e) {
          console.log(e.target.name);
          console.log(e.target.value);
          changeData(e);
        }}
        id=""
        defaultValue={defaultValue}
      />
    </div>
  );
}

function SelectInput({ name, changeData, options, defaultValue, editMode }) {
  const [parentKey, childValue] = name.split(" ");
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  return (
    <div className="d-flex align-items-center " style={{ width: "90%" }}>
      <label htmlFor="" className="col-3">
        {childValue[0].toUpperCase() + childValue.slice(1).replaceAll("_", " ")}
      </label>
      {defaultValue && (
        <select
          name={name}
          id=""
          disabled={!editMode}
          onChange={changeData}
          className="col-3 input-dataDiri"
          defaultValue={defaultValue}
        >
          {options.map((option, index) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      )}
    </div>
  );
}

export default PagesSiswa;