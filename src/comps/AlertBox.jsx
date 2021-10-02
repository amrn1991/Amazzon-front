import React from "react";

export default function AlertBox({ children, variant = "danger" }) {
  return <div className={`alert alert-${variant}`}>{children}</div>;
}
