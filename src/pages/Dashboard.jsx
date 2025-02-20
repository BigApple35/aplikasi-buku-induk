import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import { GrDocumentStore } from "react-icons/gr";
import { FaUserGroup } from "react-icons/fa6";
import { FaMale, FaFemale, FaSearch } from "react-icons/fa";
import TableSiswa from "../Component/Dashboard/TableSiswa";
import client from "../utils/client";
import Chart from "react-apexcharts";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [angkatan, setAngkatan] = useState([]);

  // useEffect(() => {
  //   client.get("/admin/dashboard").then(({ data }) => {
  //     console.log("Dashboard Data:", data);
  //     setDashboard(data);
  //   });

  //   client.get("/admin/angkatan").then(({ data }) => {
  //     console.log("Angkatan Data:", data);
  //     setAngkatan(data);
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data dashboard
        const dashboardRes = await client.get("/admin/dashboard");
        console.log("Dashboard Data:", dashboardRes.data);
        setDashboard(dashboardRes.data);

        // Ambil data angkatan dan hitung jumlah siswa berdasarkan angkatan
        const angkatanRes = await client.get("/admin/angkatan");
        console.log("Angkatan Data:", angkatanRes.data);

        // Gabungkan data angkatan dengan jumlah siswa dari dashboard
        const angkatanWithData = angkatanRes.data.map((a) => ({
          tahun: a.tahun,
          count_siswa: dashboardRes.data[a.tahun]?.count_siswa || 0,
          count_laki: dashboardRes.data[a.tahun]?.count_laki || 0,
          count_perempuan: dashboardRes.data[a.tahun]?.count_perempuan || 0,
        }));

        setAngkatan(angkatanWithData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const chartOptions = {
    chart: {
      type: "bar",
      stacked: false,
    },
    xaxis: {
      categories: angkatan.map((a) => a.tahun) || [],
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    colors: ["#00C853", "#2979FF", "#FFA000"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: "normal",
      },
    },
    legend: {
      position: "bottom",
    },
  };

  const chartSeries = [
    {
      name: "Total Siswa",
      data: angkatan.map(() => dashboard?.count_siswa ?? 0),
    },
    {
      name: "Siswa Laki-laki",
      data: angkatan.map(() => dashboard?.count_laki ?? 0),
    },
    {
      name: "Siswa Perempuan",
      data: angkatan.map(() => dashboard?.count_perempuan ?? 0),
    },
  ];

  const areaChartOptions = {
    chart: {
      type: "area",
    },
    xaxis: {
      categories: angkatan.map((a) => a.tahun) || [],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#00C853", "#2979FF", "#FFA000"],
    legend: {
      position: "bottom",
    },
  };

  const areaChartSeries = [
    {
      name: "Total Siswa",
      data: angkatan.map(() => dashboard?.count_siswa ?? 0),
    },
    {
      name: "Siswa Laki-laki",
      data: angkatan.map(() => dashboard?.count_laki ?? 0),
    },
    {
      name: "Siswa Perempuan",
      data: angkatan.map(() => dashboard?.count_perempuan ?? 0),
    },
  ];

  return (
    <div className="w-100 container">
      <h1 className="title col-12">Halaman Utama</h1>
      <div className="card-container col-12 row m-0 mt-4 p-3 ">
        <DashboardCard
          bg={"#DCF2FF"}
          icon={<FaUserGroup size={50} />}
          text={"Data Di Input"}
          desc={"Data Siswa"}
          value={dashboard?.count_datainputed}
        />
        <DashboardCard
          bg={"#0C7FDA80"}
          icon={<FaMale size={50} />}
          text={"Siswa Laki"}
          desc={"Data Siswa"}
          value={dashboard?.count_laki}
        />
        <DashboardCard
          bg={"#DCF2FF"}
          icon={<FaFemale size={50} />}
          text={"Siswa Perempuan"}
          desc={"Data Siswa"}
          value={dashboard?.count_perempuan}
        />
        <DashboardCard
          bg={"#0C7FDA80"}
          icon={<GrDocumentStore size={50} />}
          text={"Total Siswa"}
          desc={"Data Siswa"}
          value={dashboard?.count_siswa}
        />
      </div>

      <div
        className={`d-flex flex-row justify-content-between mt-4 border border-dashed border-2 rounded p-3 gap-3`}
        style={{ borderColor: "#9747FF" }}
      >
        <div className="chart-container border border-2 rounded">
          <h3 className="p-2 text-center">Statistik Siswa per Angkatan</h3>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={320}
            width={600}
          />
        </div>
        <div className="chart-container border border-2 rounded">
          <h3 className="p-2 text-center">Tren Siswa per Angkatan</h3>
          <Chart
            options={areaChartOptions}
            series={areaChartSeries}
            type="area"
            height={320}
            width={600}
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ bg, icon, text, desc, value }) {
  return (
    <div
      className={`card col-3 px-5 justify-content-center border-0`}
      style={{ backgroundColor: bg }}
    >
      {icon}
      <div
        style={{ fontFamily: "Inter", fontWeight: "bold", fontSize: "20px" }}
      >
        {text}
      </div>
      <div style={{ fontFamily: "Inter", fontWeight: "200", fontSize: "14px" }}>
        {desc}
      </div>
      <div
        style={{ fontFamily: "Inter", fontWeight: "bold", fontSize: "32px" }}
      >
        {value}
      </div>
    </div>
  );
}

export default Dashboard;
