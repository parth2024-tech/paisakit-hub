"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          // Successfully registered
        })
        .catch(() => {
          // Registration failed
        });
    }
  }, []);

  return null;
}

export default PwaRegister;
