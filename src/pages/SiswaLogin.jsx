import React, { useState } from "react";
import background from "../Resource/background.png";
import logo from "../Resource/logo-smkn.png";
// import "../css/loginSiswa.css";
import client from "../utils/client";
import { useNavigate } from "react-router-dom";

function SiswaLogin() {
  const navigate = useNavigate();

  // const handleLoginSiswa = () => {
  //   navigate("/pagesSiswa");
  // };

  const handleLogin = () => {
    navigate("/pagesSiswa");
  };

  return (
    <div>
      {/* <img src={background} alt="" id="background" /> */}
      <div className="main-cont d-flex justify-content-center">
        <div className="col-6 d-flex justify-content-center align-items-center flex-column h-100">
          <img src={logo} alt="" style={{ width: 350, height: 350 }} />
          <h1>Buku Induk</h1>
        </div>
        <div className="login-cont col-6">
          <div className="login-card p-5 d-flex flex-column">
            <div className="login-card-title ">
              <h1 className="text-center">Masuk Sebagai Siswa</h1>
            </div>
            <hr />
            <div
              className=" d-flex flex-column w-100 mb-4"
              style={{ marginTop: "70px" }}
            >
              <label htmlFor="nisn" className="fs-5 mb-2">
                NISN
              </label>
              <input
                type="number"
                name="nisn"
                placeholder="Masukkan NISN anda"
                onChange={""}
                id="nisn"
                className="fs-5 input-login"
              />
            </div>

            {/* <div className="mt-2 d-flex flex-column w-100">
              <label htmlFor="ttl" className="fs-5 mb-2">
                Tanggal Lahir
              </label>
              <input
                type="text"
                name="ttl"
                onChange={""}
                id="ttl"
                placeholder="Masukkan Tanggal lahir anda"
                className="input-login fs-5"
              />
            </div> */}

            <div className="mt-2 d-flex flex-column w-100">
              <label htmlFor="ttl" className="fs-5 mb-2">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="ttl"
                id="ttl"
                className="input-login fs-5"
                placeholder="Masukkan Tanggal"
              />
            </div>

            <div
              className=""
              style={{
                width: "100%",
                display: "flex",
                flexGrow: "1",
                alignItems: "end",
                justifyContent: "center",
              }}
            >
              <button className="btn btn-primary" onClick={handleLogin}>
                Masuk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiswaLogin;