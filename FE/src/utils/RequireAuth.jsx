import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function RequireAuth({ children }) {
  return localStorage.getItem('isLogged') ? (
    children
  ) : (
    <Navigate to="/home/login" />
  );
}

export default RequireAuth;
