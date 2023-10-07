import { Navigate, Outlet } from 'react-router-dom';
import { RootState, useAppSelector } from '../redux/store';

const ProtectedRoutes = () => {
  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!user) {
    return <Navigate to='/' />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutes;
