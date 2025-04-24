import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
