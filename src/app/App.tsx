import CommonAppContainer from './CommonContainer';
import AppRoutes from './AppRoutes';
import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import {
  checkAuthState,
  // checkFirebaseAuthState,
} from '../redux/features/authSlice';
import { Navbar } from '../components';

function App() {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuthState());
    // dispatch(checkFirebaseAuthState());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <CommonAppContainer>
        <AppRoutes />
      </CommonAppContainer>
      <footer> FOOTER </footer>
    </div>
  );
}

export default App;
