import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Toaster } from "react-hot-toast";

export const Layout = () => {
  return (
    <div className="min-h-full">
      <Header/>
      <div className="flex flex-col items-stretch min-h-full">
      <Outlet />
      </div>
      <Toaster
      position="top-right"
        toastOptions={{
            success: {
              style: {
                background: 'green',
              },
            },
            error: {
              style: {
                background: 'red',
              },
            },
          }}
      />
    </div>
  );
};
