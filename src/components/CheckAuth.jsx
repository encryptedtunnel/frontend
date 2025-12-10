import React, { useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const CheckAuth = () => {
  const nav = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const auth = await authService.isAuthenticated();
      if (!auth) {
        nav(`/login?redirect=${window.location.pathname}`);
      }
    }
    checkAuth();
  }, [nav]);
  return <div></div>;
};

export default CheckAuth;
