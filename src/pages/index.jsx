import Head from "next/head";
import LoginCard from "../components/Login/LoginCard";


export default function Login() {
  return (
    <>
      <Head>
        <title>Portal de Supervisores</title>
        <meta name="description" content="Sistema de Control de Asistencia" />
      </Head>
      <div className="login-container">
        <LoginCard />
      </div>
    </>
  );
}
