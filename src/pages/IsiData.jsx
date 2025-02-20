import React, { useEffect, useState } from "react";
import "../css/addSiswa.css";
import { FaDownload, FaPrint } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import client from "../utils/client";
import dataKeahlian from "./paket_keahlian (1).json";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IsiData = () => {
  const [active, setActive] = useState("siswa");
  const [formData, setFormData] = useState({});
  const [siswaData, setSiswaData] = useState({});
  const [jurusan, setJurusan] = useState([]);
  const [angkatan, setAngkatan] = useState([]);
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("");
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

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
    client.get("/siswa/jurusan").then(({ data }) => {
      setJurusan(data);
      console.log(siswaData);
    });

    client.get("/siswa/angkatan").then(({ data }) => {
      setAngkatan(data);
      console.log(siswaData);
    });
  }, []);

  function changeActive(e) {
    setActive(e.target.id);
  }

  function getSelectDataBidangKeahlian() {
    const find = dataKeahlian.find(
      (obj) =>
        obj.bidang_keahlian ===
        formData?.pendidikan?.diterima_di_bidang_keahlian
    )?.program_keahlian;

    if (find) {
      return find.map((val, index) => {
        return val.nama_program;
      });
    }
    return [];
  }

  function getSelectDataPaketKeahlian() {
    const find = dataKeahlian.find(
      (obj) =>
        obj.bidang_keahlian ===
        formData?.pendidikan?.diterima_di_bidang_keahlian
    )?.program_keahlian;

    if (find) {
      const paket = find.find(
        (obj) =>
          obj.nama_program ===
          formData?.pendidikan?.diterima_di_program_keahlian
      )?.paket_keahlian;

      if (paket) {
        return paket;
      }
    }
    return [];
  }

  // function SaveButton(e) {
  //   e.preventDefault();
  //   client
  //     .post("siswa/data-diri/", formData)
  //     .then(({ data }) => {
  //       toast.success("Data berhasil ditambahkan");
  //       setTimeout(() => {
  //         navigate("/dashboard/siswa");
  //       }, 2000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Gagal menambahkan data");
  //     });
  // };

  function SaveButton(e) {
    e.preventDefault();
    console.log("Data yang dikirim:", formData); // Debugging

    client
      .post("siswa/data-diri/", formData)
      .then(({ data }) => {
        toast.success("Data berhasil ditambahkan");
        setTimeout(() => {
          navigate("/dashboard/siswa");
        }, 2000);
      })
      .catch((err) => {
        console.error("Error saat menambahkan data:", err);
        toast.error("Gagal menambahkan data");
      });
  }

  const handleBack = () => {
    navigate("/dashboard/siswa");
  };

  return (
    <div className="w-100 container d-flex flex-column ">
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Section Keterangan Data Diri */}
      {/* <div className="container">
        <div className="form-section">
          <h2>Informasi Siswa</h2>
          <div className="form-group-row">
            <div className="form-group">
              <label>Nama Siswa</label>
              <input type="text" placeholder="Nama Siswa" />
            </div>
            <div className="form-group">
              <label>Kelas</label>
              <select>
                <option value="">Pilih Kelas</option>
                <option value="kelas1">Kelas 1</option>
                <option value="kelas2">Kelas 2</option>
                <option value="kelas3">Kelas 3</option>
              </select>
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>NISN Siswa</label>
              <input type="text" placeholder="NISN Siswa" />
            </div>
            <div className="form-group">
              <label>Jurusan</label>
              <select>
                <option value="">Pilih Jurusan</option>
                <option value="jurusan1">Jurusan 1</option>
                <option value="jurusan2">Jurusan 2</option>
                <option value="jurusan3">Jurusan 3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="button-section">
          <button
            className={activeButton === "halamanDepan" ? "active" : ""}
            onClick={() => handleButtonClick("halamanDepan")}
          >
            Halaman Depan
          </button>
          <button
            className={activeButton === "halamanBelakang" ? "active" : ""}
            onClick={() => handleButtonClick("halamanBelakang")}
          >
            Halaman Belakang
          </button>
        </div>
      </div> */}
      {/* Section Keterangan Data Diri */}

      <div className="col-12 d-flex title mb-2 justify-content-between align-items-center">
        <h1 className=" ">Tambah Data Siswa</h1>
        <div className="d-flex gap-2">
          <button className=" btn btn-primary btn-md" onClick={handleBack}>
            Kembali
          </button>
          <button className=" btn btn-primary btn-md" onClick={SaveButton}>
            Tambah Data
          </button>
        </div>
      </div>
      {/* <div className='nav-form-cont flex-grow-0'>
            <button onClick={changeActive} id='siswa' className={`btn btn-${active === "siswa" ? "primary" : "secondary"} btn-form-nav`}>Siswa</button>
            <button onClick={changeActive} id='data_diri' className={`btn btn-${active === "data_diri" ? "primary" : "secondary"} btn-form-nav`}>Keterangan Data Diri</button>
            <button onClick={changeActive} id='ayah_kandung' className={`btn btn-${active === "ayah_kandung" ? "primary" : "secondary"} btn-form-nav`}>Keterangan Ayah Kandung</button>
            <button onClick={changeActive} id='ibu_kandung' className={`btn btn-${active === "ibu_kandung" ? "primary" : "secondary"} btn-form-nav`}>Keterangan Ibu Kandung</button>
            <button onClick={changeActive} id='kesehatan' className={`btn btn-${active === "kesehatan" ? "primary" : "secondary"} btn-form-nav`}>Keterangan Kesehatan</button>
            <button onClick={changeActive} id='pendidikan' className={`btn btn-${active === "pendidikan" ? "primary" : "secondary"} btn-form-nav`}>Keterangan Pendidikan</button>
            <button onClick={changeActive} id='tempat_tinggal' className={`btn btn-${active === "tempat_tinggal" ? "primary" : "secondary"} btn-form-nav`}>Keterangan Tempat Tinggal</button>
            <button onClick={changeActive} id='wali' className={`btn btn-${active === "wali" ? "primary" : "secondary"} btn-form-nav`}>Keterangan Wali</button>
            <button onClick={changeActive} id='hobi_siswa' className={`btn btn-${active === "hobi_siswa" ? "primary" : "secondary"} btn-form-nav`}>Keterangan Hobi Siswa</button>
        </div> */}

      {/* Perbaikan */}
      <div className="nav-form-cont flex-grow-0">
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
      </div>

      {/* Perbaikan */}

      <div className="mt-5">
        <FormArea buttonId="siswa" active={active}>
          <InputText name="siswa nisn" changeData={changeData} />
          <SelectInput
            options={angkatan.map((val, index) => {
              return val.id;
            })}
            label={angkatan.map((val, index) => {
              return val.tahun;
            })}
            changeData={changeData}
            name="siswa angkatan_id"
          />

          <SelectInput
            options={jurusan.map((val, index) => {
              return val.id;
            })}
            label={jurusan.map((val, index) => {
              return val.nama;
            })}
            changeData={changeData}
            name="siswa jurusan_id"
          />
        </FormArea>

        <FormArea buttonId="data_diri" active={active}>
          <InputText
            name="data_diri nama_lengkap"
            changeData={changeData}
            required={true}
          />
          <InputText
            name="data_diri nama_panggilan"
            changeData={changeData}
            required={true}
          />
          <RadioComponent
            options={["laki-laki", "perempuan"]}
            name="data_diri jenis_kelamin"
            changeData={changeData}
            required={true}
          />
          <InputText
            name="data_diri tempat_lahir"
            changeData={changeData}
            required={true}
          />
          <InputText
            name="data_diri agama"
            changeData={changeData}
            required={true}
          />
          <InputText
            name="data_diri kewarganegaraan"
            changeData={changeData}
            required={true}
          />
          <IntegerInput
            name="data_diri anak_ke"
            changeData={changeData}
            required={true}
          />
          <IntegerInput
            name="data_diri jml_saudara_kandung"
            changeData={changeData}
            required={true}
          />
          <IntegerInput
            name="data_diri jml_saudara_tiri"
            changeData={changeData}
            required={true}
          />
          <IntegerInput
            name="data_diri jml_saudara_angkat"
            changeData={changeData}
            required={true}
          />
          <SelectInput
            name="data_diri kelengkapan_ortu"
            changeData={changeData}
            options={["yatim", "piatu", "yatim piatu", "lengkap"]}
            required={true}
          />
          <InputText
            name="data_diri bahasa_sehari_hari"
            changeData={changeData}
            required={true}
          />
          <DateInput
            name="data_diri tanggal_lahir"
            maxToday
            changeData={changeData}
            required={true}
          />
        </FormArea>

        <FormArea buttonId="ayah_kandung" active={active}>
          <InputText
            name="ayah_kandung nama"
            changeData={changeData}
            required
          />
          <InputText
            name="ayah_kandung tempat_lahir"
            changeData={changeData}
            required
          />
          <DateInput
            name="ayah_kandung tanggal_lahir"
            maxToday
            changeData={changeData}
            required
          />
          <InputText
            name="ayah_kandung agama"
            changeData={changeData}
            required
          />
          <InputText
            name="ayah_kandung kewarganegaraan"
            changeData={changeData}
            required
          />
          <InputText
            name="ayah_kandung pendidikan"
            changeData={changeData}
            required
          />
          <InputText
            name="ayah_kandung pekerjaan"
            changeData={changeData}
            required
          />
          <InputText
            name="ayah_kandung pengeluaran_per_bulan"
            changeData={changeData}
            required
          />
          <InputText
            name="ayah_kandung alamat_dan_no_telepon"
            changeData={changeData}
            required
          />
          <SelectInput
            name="ayah_kandung status"
            changeData={changeData}
            options={["masih hidup", "meninggal"]}
            required
          />
        </FormArea>

        <FormArea buttonId="ibu_kandung" active={active}>
          <InputText name="ibu_kandung nama" changeData={changeData} required />
          <InputText
            name="ibu_kandung tempat_lahir"
            changeData={changeData}
            required
          />
          <DateInput
            name="ibu_kandung tanggal_lahir"
            maxToday
            changeData={changeData}
            required
          />
          <InputText
            name="ibu_kandung agama"
            changeData={changeData}
            required
          />
          <InputText
            name="ibu_kandung kewarganegaraan"
            changeData={changeData}
            required
          />
          <InputText
            name="ibu_kandung pendidikan"
            changeData={changeData}
            required
          />
          <InputText
            name="ibu_kandung pekerjaan"
            changeData={changeData}
            required
          />
          <InputText
            name="ibu_kandung pengeluaran_per_bulan"
            changeData={changeData}
            required
          />
          <InputText
            name="ibu_kandung alamat_dan_no_telepon"
            changeData={changeData}
            required
          />
          <SelectInput
            name="ibu_kandung status"
            changeData={changeData}
            options={["masih hidup", "meninggal"]}
            required
          />
        </FormArea>

        <FormArea buttonId="kesehatan" active={active}>
          <SelectInput
            options={["A", "B", "O", "AB", "lainya"]}
            name="kesehatan gol_darah"
            changeData={changeData}
            required
          />
          <InputText
            name="kesehatan penyakit_pernah_diderita"
            changeData={changeData}
          />
          <InputText
            name="kesehatan kelainan_jasmani"
            changeData={changeData}
          />
          <InputText name="kesehatan tinggi" changeData={changeData} required />
          <InputText
            name="kesehatan berat_badan"
            changeData={changeData}
            required
          />
        </FormArea>

        <FormArea buttonId="pendidikan" active={active}>
          <InputText
            name="pendidikan sebelumnya_tamatan_dari"
            changeData={changeData}
            required
          />
          <InputText
            name="pendidikan sebelumnya_tanggal_dan_ijazah"
            changeData={changeData}
            required
          />
          <InputText
            name="pendidikan sebelumnya_tanggal_skhun_dan_"
            changeData={changeData}
            required
          />
          <InputText
            name="pendidikan sebelumnya_lama_belajar"
            changeData={changeData}
            required
          />
          <InputText
            name="pendidikan pindahan_dari_sekolah"
            changeData={changeData}
          />
          <InputText
            name="pendidikan pindahan_alasan"
            changeData={changeData}
          />
          <IntegerInput
            name="pendidikan diterima_di_kelas"
            changeData={changeData}
            required
          />

          <SelectInput
            options={dataKeahlian.map((val, index) => {
              return val.bidang_keahlian;
            })}
            name="pendidikan diterima_di_bidang_keahlian"
            changeData={changeData}
            required
          />

          <SelectInput
            options={getSelectDataBidangKeahlian()}
            name="pendidikan diterima_di_program_keahlian"
            changeData={changeData}
            required
          />

          <SelectInput
            options={getSelectDataPaketKeahlian()}
            name="pendidikan diterima_di_paket_keahlian"
            changeData={changeData}
            required
          />
          <DateInput
            name="pendidikan diterima_tanggal"
            changeData={changeData}
            required
          />
        </FormArea>

        <FormArea buttonId="tempat_tinggal" active={active}>
          <InputText
            name="tempat_tinggal alamat"
            changeData={changeData}
            required
          />
          <InputText
            name="tempat_tinggal no_telepon"
            changeData={changeData}
            required
          />
          <SelectInput
            options={["ortu", "saudara", "wali", "lainya"]}
            name="tempat_tinggal tinggal_dengan"
            changeData={changeData}
            required
          />
          <InputText
            name="tempat_tinggal jarak_ke_sekolah"
            changeData={changeData}
            required
          />
        </FormArea>

        <FormArea buttonId="wali" active={active}>
          <InputText name="wali nama" changeData={changeData} />
          <InputText name="wali tempat_lahir" changeData={changeData} />
          <DateInput name="wali tanggal_lahir" changeData={changeData} />
          <InputText name="wali agama" changeData={changeData} />
          <InputText name="wali kewarganegaraan" changeData={changeData} />
          <InputText name="wali pendidikan" changeData={changeData} />
          <InputText name="wali pekerjaan" changeData={changeData} />
          <InputText
            name="wali pengeluaran_per_bulan"
            changeData={changeData}
          />
          <InputText
            name="wali alamat_dan_no_telepon"
            changeData={changeData}
          />
        </FormArea>

        <FormArea buttonId="hobi_siswa" active={active}>
          <InputText name="hobi_siswa kesenian" changeData={changeData} />
          <InputText name="hobi_siswa olahraga" changeData={changeData} />
          <InputText name="hobi_siswa organisasi" changeData={changeData} />
          <InputText name="hobi_siswa lain_lain" changeData={changeData} />
        </FormArea>
      </div>
    </div>
  );
};

// function FormArea({ buttonId, active, field, children, required }) {
//   return (
//     <div className={`${active === buttonId ? "active" : ""} mb-4 form-area`}>
//       <form
//         action=""
//         style={{ width: "100%" }}
//         className="d-flex align-items-center flex-column row-gap-3 justify-content-center"
//       >
//         {children}
//       </form>
//     </div>
//   );
// }

function FormArea({ buttonId, active, field, children, required, readOnly }) {
  return (
    <div className={`${active === buttonId ? "active" : ""} mb-4 form-area`}>
      <form
        action=""
        style={{ width: "100%" }}
        className="d-flex align-items-center flex-column row-gap-3 justify-content-center"
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { readOnly })
        )}
      </form>
    </div>
  );
}

function InputText({ name, changeData, defaultValue, required }) {
  const [parentKey, childValue] = name.split(" ");
  return (
    <div className="d-flex align-items-center " style={{ width: "90%" }}>
      <label htmlFor="" className="col-3">
        {childValue[0].toUpperCase() + childValue.slice(1).replaceAll("_", " ")}{" "}
        <span className={`text-danger ${required ? "" : "d-none"} `}>*</span>
      </label>
      <input
        placeholder=""
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

function IntegerInput({ name, changeData, defaultValue, required }) {
  const [parentKey, childValue] = name.split(" ");
  return (
    <div className="d-flex align-items-center " style={{ width: "90%" }}>
      <label htmlFor="" className="col-3">
        {childValue[0].toUpperCase() + childValue.slice(1).replaceAll("_", " ")}
        <span className={`text-danger ${required ? "" : "d-none"} `}>*</span>
      </label>
      <input
        placeholder=""
        type="number"
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

function RadioComponent({ name, changeData, defaultValue, options, required }) {
  const [parentKey, childKey] = name.split(" ");
  options = ["laki-laki", "perempuan"];
  console.log(defaultValue);

  return (
    <div className="d-flex align-items-center" style={{ width: "90%" }}>
      <label className="col-3">
        {childKey[0].toUpperCase() + childKey.slice(1).replaceAll("_", " ")}
        <span className={`text-danger ${required ? "" : "d-none"} `}>*</span>
      </label>
      {
        <div className="col-8 d-flex flex-wrap g-3 ">
          {options.map((option, index) => (
            <div key={index} className="d-flex gap-3 w-100">
              <input
                type="radio"
                className="input-dataDiri form-check-input border-black"
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
      }
    </div>
  );
}

// function DateInput({name, changeData, defaultValue, required, maxToday}){
//     const [parentKey, childValue] = name.split(" ")
//     const today = new Date().toISOString().split('T')[0];
//     return(
//         <div className='d-flex align-items-center ' style={{width : "90%"}}>
//             <label htmlFor="" className='col-3'>{childValue[0].toUpperCase() + childValue.slice(1).replaceAll("_", " ")}<span className={`text-danger ${required ? "" : "d-none"} `}>*</span></label>
//             <input placeholder='' max={maxToday ? today : undefined} type="date" className='input-dataDiri col-3' style={{maxHeight : 40, height : 40}}  name={name} onChange={function (e) {
//                 console.log(e.target.name)
//                 console.log(e.target.value)
//                 changeData(e)
//             }} id=""  defaultValue={defaultValue}/>
//         </div>
//     )
// }

function DateInput({ name, changeData, defaultValue, required, maxToday }) {
  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? new Date(defaultValue) : null
  );
  const today = new Date();

  return (
    <div className="d-flex align-items-center" style={{ width: "90%" }}>
      <label className="col-3">
        {name.split(" ")[1][0].toUpperCase() +
          name.split(" ")[1].slice(1).replaceAll("_", " ")}
        <span className={`text-danger ${required ? "" : "d-none"}`}>*</span>
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          changeData({
            target: {
              name,
              value: date ? date.toISOString().split("T")[0] : "",
            },
          });
        }}
        maxDate={maxToday ? today : null}
        dateFormat="yyyy-MM-dd"
        placeholderText="Pilih Tanggal"
        customInput={
          <input
            className="form-control col-3 custom-datepicker"
            style={{ maxHeight: 40, height: 40, cursor: "pointer" }}
            readOnly
          />
        }
      />
    </div>
  );
}

// function SelectInput({
//   name,
//   changeData,
//   options,
//   defaultValue,
//   label,
//   required,
// }) {
//   const [parentKey, childValue] = name.split(" ");
//   const [selectedValue, setSelectedValue] = useState(defaultValue);

//   return (
//     <>
//       <div className="d-flex align-items-center " style={{ width: "90%" }}>
//         <label htmlFor="" className="col-3">
//           {childValue[0].toUpperCase() +
//             childValue.slice(1).replaceAll("_", " ")}
//           <span className={`text-danger ${required ? "" : "d-none"} `}>*</span>
//         </label>
//         <select
//           name={name}
//           id=""
//           onChange={(e) => {
//             changeData(e);
//             setSelectedValue(e.target.value);
//           }}
//           className="col-3 input-dataDiri"
//           defaultValue={""}
//         >
//           return <option value={""}>Select Option</option>
//           {options.map((option, index) => {
//             return (
//               <option value={option}>{label ? label[index] : option}</option>
//             );
//           })}
//         </select>
//       </div>
//       {selectedValue === "lainya" && (
//         <InputText name={name} changeData={changeData} />
//       )}
//     </>
//   );
// }

function SelectInput({
  name,
  changeData,
  options,
  defaultValue,
  label,
  required,
}) {
  const [parentKey, childValue] = name.split(" ");
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  return (
    <>
      <div className="d-flex align-items-center" style={{ width: "90%" }}>
        <label htmlFor="" className="col-3">
          {childValue[0].toUpperCase() +
            childValue.slice(1).replaceAll("_", " ")}
          <span className={`text-danger ${required ? "" : "d-none"}`}>*</span>
        </label>
        <select
          name={name}
          onChange={(e) => {
            changeData(e);
            setSelectedValue(e.target.value);
          }}
          className="col-3 input-dataDiri"
          defaultValue={""}
        >
          <option value={""}>Pilih Opsi</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {label ? label[index] : option}
            </option>
          ))}
        </select>
      </div>
      {selectedValue === "lainya" && (
        <InputText name={name} changeData={changeData} />
      )}
    </>
  );
}

export default IsiData;
