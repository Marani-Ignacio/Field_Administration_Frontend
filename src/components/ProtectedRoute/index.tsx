import { User } from "firebase/auth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  user,
}: {
  children: JSX.Element;
  user: User | null;
}) => {
  const location = useLocation();
  
  return user ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
