import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <header>
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Sair</button>
      </header>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
