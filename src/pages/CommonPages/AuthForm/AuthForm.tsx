import { useEffect, useState } from 'react';
import { AuthFormProps } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { loginUser } from '../../../redux/features/authSlice';

const inputClasses = 'flex flex-col justify-between w-full';

console.log('api endpoint', import.meta.env.VITE_BACKEND_API_URL);

const AuthForm = ({ name, form }: AuthFormProps) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleForgotPassword = () => {
    console.log('forgot password will handle!');
  };
  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await dispatch(
        loginUser({ email, password, firstName, lastName, name })
      ).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      setLoading(false);
      console.log('error in creating user', error);
    }
  };
  return (
    <div className='max-w-lg w-full mx-auto flex flex-col items-center justify-start h-[520px]'>
      <h1>{form}</h1>
      {errorMessage && (
        <p className='bg-red-400 px-3 py-2 text-center rounded-md text-white'>
          {errorMessage}
        </p>
      )}

      <form
        id={name}
        name={name}
        className='flex flex-col items-center justify-center w-full'
        onSubmit={onFormSubmit}
      >
        {name === 'signup' && (
          <>
            <div className={inputClasses}>
              <label htmlFor='fistName'>First name</label>
              <input
                id='fistName'
                type='text'
                className='border-black border-2'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={inputClasses}>
              <label htmlFor='lastName'>Last name</label>
              <input
                id='lastName'
                type='text'
                className='border-black border-2'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}
        <div className={inputClasses}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            className='border-black border-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={inputClasses}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            className='border-black border-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' disabled={loading}>
          Enter
        </button>
      </form>
      {name === 'login' && (
        <p>
          Forgot password? Reset password{' '}
          <span onClick={handleForgotPassword}>
            <button> here </button>{' '}
          </span>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
