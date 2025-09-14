// components/CustomToaster.tsx
import React from "react";
import toast, { Toaster, ToastBar } from "react-hot-toast";

const CustomToaster: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          padding: "12px 16px",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 500,
        },
        success: {
          style: {
            background: "#22c55e",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#22c55e",
          },
        },
        error: {
          style: {
            background: "#ef4444",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ef4444",
          },
        },
        loading: {
          style: {
            background: "#3b82f6",
          },
        },
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
      )}
    </Toaster>
  );
};

export default CustomToaster;
