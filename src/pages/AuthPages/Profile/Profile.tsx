import { RootState, useAppSelector } from '../../../redux/store';

const Profile = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleResetPassword = () => {
    console.log('reset password');
  };

  return (
    <div>
      <h1> My Profile </h1>
      <section>
        <p>Name: {user?.displayName}</p>
        <p>Email: {user?.email}</p>
        <button onClick={handleResetPassword}> Reset Password </button>
        {user?.isAdmin && <p>Admin</p>}
      </section>
    </div>
  );
};

export default Profile;
