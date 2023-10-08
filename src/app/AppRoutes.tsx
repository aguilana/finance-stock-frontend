import { Routes, Route } from 'react-router-dom';
import { RootState, useAppSelector } from '../redux/store';
import ProtectedRoutes from './ProtectedRoutes';
import { AuthForm, Profile, Dashboard, StockList } from '../pages';

const AppRoutes = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  return (
    <Routes>
      <Route path='/' element={<h1>Home</h1>} />
      {!user && (
        <>
          <Route
            path='/login'
            element={<AuthForm name='login' form='Login' />}
          />
          <Route
            path='/signup'
            element={<AuthForm name='signup' form='Sign up' />}
          />
        </>
      )}
      <Route element={<ProtectedRoutes />}>
        <Route path='/my-profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route path='/stocks' element={<StockList />} />
      <Route path='*' element={<h1>404 Error - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
