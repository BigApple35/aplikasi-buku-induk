import React, { useEffect, useState } from "react";
import "../css/addSiswa.css";
import { FaDownload, FaPrint } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import client from "../utils/client";

const DataDiriSiswa = () => {
  const [active, setActive] = useState("data_diri");
  const [formData, setFormData] = useState({});
  const [siswaData, setSiswaData] = useState({});
  const { id } = useParams();

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

  useEffect(() => {
    client.get("/siswa/data/" + id).then(({ data }) => {
      setSiswaData(data);
      console.log(siswaData);
    });
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function changeActive(e) {
    setActive(e.target.id);
  }

  function SaveButton(e) {
    e.preventDefault();
    client.put("admin/data-diri/" + id, formData).then(({ data }) => {
      alert("Successfully Updated");
      console.log(formData);
    });
  }

  function downloadPdf() {
    client
      .get("/admin/export-pdf/" + id, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "example.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
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

  return (
    <div className="w-100 container d-flex flex-column ">
      <div className="col-12 d-flex title mb-2 justify-content-between align-items-center">
        <h1 className=" ">Data Diri</h1>
        <div className="d-flex gap-5">
          <button
            className="fs-5 btn-header"
            onClick={downloadPdf}
            style={{
              fontSize: "24px",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <FaDownload />
            Download
          </button>
          <button
            style={{ display: "flex", gap: 10, alignItems: "center" }}
            onClick={printFormData}
            className="fs-5 btn-header"
          >
            <FaPrint />
            Print
          </button>
          <button className=" btn btn-primary btn-lg" onClick={SaveButton}>
            Simpan
          </button>
        </div>
      </div>
      <div className="nav-form-cont flex-grow-0">
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
      </div>

      <div className="mt-5">
        <FormArea buttonId="data_diri" active={active}>
          <InputText
            name="data_diri nama_lengkap"
            defaultValue={siswaData?.data_diri?.nama_lengkap}
            changeData={changeData}
          />
          <InputText
            name="data_diri nama_panggilan"
            defaultValue={siswaData?.data_diri?.nama_panggilan}
            changeData={changeData}
          />
          <RadioComponent
            options={["laki-laki", "perempuan"]}
            name="data_diri jenis_kelamin"
            defaultValue={siswaData?.data_diri?.jenis_kelamin}
            changeData={changeData}
          />
          <InputText
            name="data_diri tempat_lahir"
            defaultValue={siswaData?.data_diri?.tempat_lahir}
            changeData={changeData}
          />
          <InputText
            name="data_diri agama"
            defaultValue={siswaData?.data_diri?.agama}
            changeData={changeData}
          />
          <InputText
            name="data_diri kewarganegaraan"
            defaultValue={siswaData?.data_diri?.kewarganegaraan}
            changeData={changeData}
          />
          <IntegerInput
            name="data_diri anak_ke"
            defaultValue={siswaData?.data_diri?.anak_ke?.toString()}
            changeData={changeData}
          />
          <IntegerInput
            name="data_diri jml_saudara_kandung"
            defaultValue={siswaData?.data_diri?.jml_saudara_kandung?.toString()}
            changeData={changeData}
          />
          <IntegerInput
            name="data_diri jml_saudara_tiri"
            defaultValue={siswaData?.data_diri?.jml_saudara_tiri?.toString()}
            changeData={changeData}
          />
          <IntegerInput
            name="data_diri jml_saudara_angkat"
            defaultValue={siswaData?.data_diri?.jml_saudara_angkat?.toString()}
            changeData={changeData}
          />
          <SelectInput
            name="data_diri kelengkapan_ortu"
            defaultValue={siswaData?.data_diri?.kelengkapan_ortu}
            changeData={changeData}
            options={["yatim", "piatu", "yatim piatu", "lengkap"]}
          />
          <InputText
            name="data_diri bahasa_sehari_hari"
            defaultValue={siswaData?.data_diri?.bahasa_sehari_hari}
            changeData={changeData}
          />
          <DateInput
            name="data_diri tanggal_lahir"
            defaultValue={siswaData?.data_diri?.tanggal_lahir}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="ayah_kandung" active={active}>
          <InputText
            name="ayah_kandung nama"
            defaultValue={siswaData?.ayah_kandung?.nama}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung tempat_lahir"
            defaultValue={siswaData?.ayah_kandung?.tempat_lahir}
            changeData={changeData}
          />
          <DateInput
            name="ayah_kandung tanggal_lahir"
            defaultValue={siswaData?.ayah_kandung?.tanggal_lahir}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung agama"
            defaultValue={siswaData?.ayah_kandung?.agama}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung kewarganegaraan"
            defaultValue={siswaData?.ayah_kandung?.kewarganegaraan}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung pendidikan"
            defaultValue={siswaData?.ayah_kandung?.pendidikan}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung pekerjaan"
            defaultValue={siswaData?.ayah_kandung?.pekerjaan}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung pengeluaran_per_bulan"
            defaultValue={siswaData?.ayah_kandung?.pengeluaran_per_bulan}
            changeData={changeData}
          />
          <InputText
            name="ayah_kandung alamat_dan_no_telepon"
            defaultValue={siswaData?.ayah_kandung?.alamat_dan_no_telepon}
            changeData={changeData}
          />
          <SelectInput
            name="ibu_kandung status"
            defaultValue={siswaData?.ibu_kandung?.status}
            changeData={changeData}
            options={["masih hidup", "meninggal"]}
          />
        </FormArea>

        <FormArea buttonId="ibu_kandung" active={active}>
          <InputText
            name="ibu_kandung nama"
            defaultValue={siswaData?.ibu_kandung?.nama}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung tempat_lahir"
            defaultValue={siswaData?.ibu_kandung?.tempat_lahir}
            changeData={changeData}
          />
          <DateInput
            name="ibu_kandung tanggal_lahir"
            defaultValue={siswaData?.ibu_kandung?.tanggal_lahir}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung agama"
            defaultValue={siswaData?.ibu_kandung?.agama}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung kewarganegaraan"
            defaultValue={siswaData?.ibu_kandung?.kewarganegaraan}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung pendidikan"
            defaultValue={siswaData?.ibu_kandung?.pendidikan}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung pekerjaan"
            defaultValue={siswaData?.ibu_kandung?.pekerjaan}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung pengeluaran_per_bulan"
            defaultValue={siswaData?.ibu_kandung?.pengeluaran_per_bulan}
            changeData={changeData}
          />
          <InputText
            name="ibu_kandung alamat_dan_no_telepon"
            defaultValue={siswaData?.ibu_kandung?.alamat_dan_no_telepon}
            changeData={changeData}
          />
          <SelectInput
            name="ibu_kandung status"
            defaultValue={siswaData?.ibu_kandung?.status}
            changeData={changeData}
            options={["masih hidup", "meninggal"]}
          />
        </FormArea>

        <FormArea buttonId="kesehatan" active={active}>
          <SelectInput
            options={["A", "B", "O", "AB"]}
            name="kesehatan gol_darah"
            defaultValue={siswaData?.kesehatan?.gol_darah}
            changeData={changeData}
          />
          <InputText
            name="kesehatan penyakit_pernah_diderita"
            defaultValue={siswaData?.kesehatan?.penyakit_pernah_diderita}
            changeData={changeData}
          />
          <InputText
            name="kesehatan kelainan_jasmani"
            defaultValue={siswaData?.kesehatan?.kelainan_jasmani}
            changeData={changeData}
          />
          <InputText
            name="kesehatan tinggi"
            defaultValue={siswaData?.kesehatan?.tinggi}
            changeData={changeData}
          />
          <InputText
            name="kesehatan berat_badan"
            defaultValue={siswaData?.kesehatan?.berat_badan}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="pendidikan" active={active}>
          <InputText
            name="pendidikan sebelumnya_tamatan_dari"
            defaultValue={siswaData?.pendidikan?.sebelumnya_tamatan_dari}
            changeData={changeData}
          />
          <InputText
            name="pendidikan sebelumnya_tanggal_dan_ijazah"
            defaultValue={siswaData?.pendidikan?.sebelumnya_tanggal_dan_ijazah}
            changeData={changeData}
          />
          <InputText
            name="pendidikan sebelumnya_tanggal_skhun_dan_"
            defaultValue={siswaData?.pendidikan?.sebelumnya_tanggal_skhun_dan_}
            changeData={changeData}
          />
          <InputText
            name="pendidikan sebelumnya_lama_belajar"
            defaultValue={siswaData?.pendidikan?.sebelumnya_lama_belajar}
            changeData={changeData}
          />
          <InputText
            name="pendidikan pindahan_dari_sekolah"
            defaultValue={siswaData?.pendidikan?.pindahan_dari_sekolah}
            changeData={changeData}
          />
          <InputText
            name="pendidikan pindahan_alasan"
            defaultValue={siswaData?.pendidikan?.pindahan_alasan}
            changeData={changeData}
          />
          <InputText
            name="pendidikan diterima_di_kelas"
            defaultValue={siswaData?.pendidikan?.diterima_di_kelas?.toString()}
            changeData={changeData}
          />
          <InputText
            name="pendidikan diterima_di_bidang_keahlian"
            defaultValue={siswaData?.pendidikan?.diterima_di_bidang_keahlian}
            changeData={changeData}
          />
          <InputText
            name="pendidikan diterima_di_program_keahlian"
            defaultValue={siswaData?.pendidikan?.diterima_di_program_keahlian}
            changeData={changeData}
          />
          <InputText
            name="pendidikan diterima_di_paket_keahlian"
            defaultValue={siswaData?.pendidikan?.diterima_di_paket_keahlian}
            changeData={changeData}
          />
          <DateInput
            name="pendidikan diterima_tanggal"
            defaultValue={siswaData?.pendidikan?.diterima_tanggal}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="setelah_pendidikan" active={active}>
          <InputText
            name="setelah_pendidikan melanjutkan_ke"
            defaultValue={siswaData?.setelah_pendidikan?.melanjutkan_ke}
            changeData={changeData}
          />
          <InputText
            name="setelah_pendidikan bekerja_nama_perusahaan"
            defaultValue={
              siswaData?.setelah_pendidikan?.bekerja_nama_perusahaan
            }
            changeData={changeData}
          />
          <InputText
            name="setelah_pendidikan bekerja_tanggal_mulai"
            defaultValue={siswaData?.setelah_pendidikan?.bekerja_tanggal_mulai}
            changeData={changeData}
          />
          <InputText
            name="setelah_pendidikan bekerja_penghasilan"
            defaultValue={siswaData?.setelah_pendidikan?.bekerja_penghasilan}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="tempat_tinggal" active={active}>
          <InputText
            name="tempat_tinggal alamat"
            defaultValue={siswaData?.tempat_tinggal?.alamat}
            changeData={changeData}
          />
          <InputText
            name="tempat_tinggal no_telepon"
            defaultValue={siswaData?.tempat_tinggal?.no_telepon}
            changeData={changeData}
          />
          <InputText
            name="tempat_tinggal tinggal_dengan"
            defaultValue={siswaData?.tempat_tinggal?.tinggal_dengan}
            changeData={changeData}
          />
          <InputText
            name="tempat_tinggal jarak_ke_sekolah"
            defaultValue={siswaData?.tempat_tinggal?.jarak_ke_sekolah}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="wali" active={active}>
          <InputText
            name="wali nama"
            defaultValue={siswaData?.wali?.nama}
            changeData={changeData}
          />
          <InputText
            name="wali tempat_lahir"
            defaultValue={siswaData?.wali?.tempat_lahir}
            changeData={changeData}
          />
          <DateInput
            name="wali tanggal_lahir"
            defaultValue={siswaData?.wali?.tanggal_lahir}
            changeData={changeData}
          />
          <InputText
            name="wali agama"
            defaultValue={siswaData?.wali?.agama}
            changeData={changeData}
          />
          <InputText
            name="wali kewarganegaraan"
            defaultValue={siswaData?.wali?.kewarganegaraan}
            changeData={changeData}
          />
          <InputText
            name="wali pendidikan"
            defaultValue={siswaData?.wali?.pendidikan}
            changeData={changeData}
          />
          <InputText
            name="wali pekerjaan"
            defaultValue={siswaData?.wali?.pekerjaan}
            changeData={changeData}
          />
          <InputText
            name="wali pengeluaran_per_bulan"
            defaultValue={siswaData?.wali?.pengeluaran_per_bulan}
            changeData={changeData}
          />
          <InputText
            name="wali alamat_dan_no_telepon"
            defaultValue={siswaData?.wali?.alamat_dan_no_telepon}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="hobi_siswa" active={active}>
          <InputText
            name="hobi_siswa kesenian"
            defaultValue={siswaData?.hobi_siswa?.kesenian}
            changeData={changeData}
          />
          <InputText
            name="hobi_siswa olahraga"
            defaultValue={siswaData?.hobi_siswa?.olahraga}
            changeData={changeData}
          />
          <InputText
            name="hobi_siswa organisasi"
            defaultValue={siswaData?.hobi_siswa?.organisasi}
            changeData={changeData}
          />
          <InputText
            name="hobi_siswa lain_lain"
            defaultValue={siswaData?.hobi_siswa?.lain_lain}
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="perkembangan_siswa" active={active}>
          <InputText
            name="perkembangan menerima_bea_siswa_tahun_kelas_dari"
            defaultValue={
              siswaData?.perkembangan?.menerima_bea_siswa_tahun_kelas_dari
            }
            changeData={changeData}
          />
          <DateInput
            name="perkembangan meninggalkan_sekolah_ini_tanggal"
            defaultValue={
              siswaData?.perkembangan?.meninggalkan_sekolah_ini_tanggal
            }
            changeData={changeData}
          />
          <InputText
            name="perkembangan meninggalkan_sekolah_ini_alasan"
            defaultValue={
              siswaData?.perkembangan?.meninggalkan_sekolah_ini_alasan
            }
            changeData={changeData}
          />
          <InputText
            name="perkembangan akhir_pendidikan_tamat_belajar_lulus_tahun"
            defaultValue={
              siswaData?.perkembangan
                ?.akhir_pendidikan_tamat_belajar_lulus_tahun
            }
            changeData={changeData}
          />
          <InputText
            name="perkembangan akhir_pendidikan_no_tanggal_ijazah"
            defaultValue={
              siswaData?.perkembangan?.akhir_pendidikan_no_tanggal_ijazah
            }
            changeData={changeData}
          />
          <InputText
            name="perkembangan akhir_pendidikan_no_tanggal_skhun"
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

function FormArea({ buttonId, active, field, children }) {
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

function InputText({ name, changeData, defaultValue }) {
  const [parentKey, childValue] = name.split(" ");
  return (
    <div className="d-flex align-items-center " style={{ width: "90%" }}>
      <label htmlFor="" className="col-3">
        {childValue[0].toUpperCase() + childValue.slice(1).replaceAll("_", " ")}
      </label>
      <input
        placeholder=""
        type="text"
        className="input-dataDiri col-8"
        style={{ maxHeight: 40, height: 40 }}
        name={name}
        onChange={changeData}
        id=""
        value={defaultValue}
      />
    </div>
  );
}

function IntegerInput({ name, changeData, defaultValue }) {
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
        style={{ maxHeight: 40, height: 40 }}
        name={name}
        onChange={changeData}
        id=""
        value={defaultValue}
      />
    </div>
  );
}

function RadioComponent({ name, changeData, defaultValue, options }) {
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
            <div key={index} className="d-flex gap-3 w-100">
              <input
                type="radio"
                className="input-dataDiri form-check-input border-black"
                name={name}
                value={option}
                onChange={changeData}
                checked={defaultValue == option}
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

function DateInput({ name, changeData, defaultValue }) {
  const [parentKey, childValue] = name.split(" ");
  return (
    <div className="d-flex align-items-center " style={{ width: "90%" }}>
      <label htmlFor="" className="col-3">
        {childValue[0].toUpperCase() + childValue.slice(1).replaceAll("_", " ")}
      </label>
      <input
        placeholder=""
        type="date"
        className="input-dataDiri col-8"
        style={{ maxHeight: 40, height: 40 }}
        name={name}
        onChange={function (e) {
          console.log(e.target.name);
          console.log(e.target.value);
          changeData(e);
        }}
        id=""
        value={defaultValue}
      />
    </div>
  );
}

function SelectInput({ name, changeData, options, defaultValue }) {
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
          onChange={changeData}
          className="col-8 input-dataDiri"
          value={defaultValue}
        >
          {options.map((option, index) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      )}
    </div>
  );
}

export default DataDiriSiswa;
