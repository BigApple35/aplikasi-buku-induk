import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import AllSiswa from "../pages/AllSiswa";
import IsiData from "../pages/IsiData";
import AllJurusan from "../pages/AllJurusan";
import AllAngkatan from "../pages/AllAngkatan";
import LandingUser from "../pages/LandingUser";
import AdminLogin from "../pages/AdminLogin";
import AdminOTP from "../pages/AdminOTP";
import UserLayout from "../Layout/UserLayout";
import EditDataDiri from "../pages/EditDataDiri";
import DataDiriSiswa from "../pages/DataDiriSiswa";
import PagesSiswa from "../pages/PagesSiswa";
import SiswaLogin from "../pages/SiswaLogin";

import AllMapel from "../pages/AllMapel";

import ERaport from "../pages/ERapot";
import ERaportSmtSatu from "../pages/ERapotSmtSatu";
import ERaportSmtDua from "../pages/ERapotSmtDua";
import ERaportSmtTiga from "../pages/ERapotSmtTiga";
import ERaportSmtEmpat from "../pages/ERapotSmtEmpat";
import ERaportSmtLima from "../pages/ERapotSmtLima";
import ERaportSmtEnam from "../pages/ERapotSmtEnam";

const route = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "siswa",
        element: <AllSiswa />,
      },
      {
        path: "siswa/:id",
        element: <EditDataDiri />,
      },
      {
        path: "add-siswa",
        element: <IsiData />,
      },
      {
        path: "jurusan",
        element: <AllJurusan />,
      },
      {
        path: "angkatan",
        element: <AllAngkatan />,
      },
      {
        path: "mapel",
        element: <AllMapel />,
      },
      {
        path: "isi-data",
        element: <IsiData />,
      },
      {
        path: "/dashboard/siswa/:id/rapot",
        element: <ERaportSmtSatu />,
      },
    ],
  },
  {
    path: "/admin",
    element: <UserLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminLogin />,
      },
      {
        path: "/admin/otp",
        element: <AdminOTP />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingUser />,
  },

  // {
  //   path: "/isi-data",
  //   element: <IsiData />,
  // },

  {
    path: "/data-diri/:id",
    element: <DataDiriSiswa />,
  },
  {
    path: "/eRapot",
    element: <ERaport />,
  },
  // {
  //   path: "/dashboard/siswa/:id/rapot",
  //   element: <ERaport />,
  // },

  // {
  //   path: "/dashboard/siswa/:id/rapot/rapot2",
  //   element: <ERaportSmtDua />,
  // },
  // {
  //   path: "/dashboard/siswa/:id/rapot/rapot3",
  //   element: <ERaportSmtTiga />,
  // },
  // {
  //   path: "/dashboard/siswa/:id/rapot/rapot4",
  //   element: <ERaportSmtEmpat />,
  // },
  // {
  //   path: "/dashboard/siswa/:id/rapot/rapot5",
  //   element: <ERaportSmtLima />,
  // },
  // {
  //   path: "/dashboard/siswa/:id/rapot/rapot6",
  //   element: <ERaportSmtEnam />,
  // },
  {
    path: "/eRapotS1",
    element: <ERaportSmtSatu />,
  },
  {
    path: "/eRapotS2",
    element: <ERaportSmtDua />,
  },
  {
    path: "/eRapotS3",
    element: <ERaportSmtTiga />,
  },
  {
    path: "/eRapotS4",
    element: <ERaportSmtEmpat />,
  },
  {
    path: "/eRapotS5",
    element: <ERaportSmtLima />,
  },
  {
    path: "/eRapotS6",
    element: <ERaportSmtEnam />,
  },
  {
    path: "/siswa-login",
    element: <SiswaLogin />,
  },
  // {
  //   path: "/all-mapel",
  //   element: <AllMapel />,
  // },
  {
    path: "/pagesSiswa",
    element: <PagesSiswa />,
  },
]);

export default route;