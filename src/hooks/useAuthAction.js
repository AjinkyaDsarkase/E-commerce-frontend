import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export function useAuthAction() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  return function guard(action) {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    action();
  };
}
