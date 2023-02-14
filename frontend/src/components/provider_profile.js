import { useSelector } from 'react-redux';

const UserInfo = () => {
  const data = useSelector(state => state.data);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  if (!isLoggedIn) {
    return <div>You are not logged in</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {data.data.name}</p>
      <p>Email: {data.data.email}</p>
      <p>Score: {data.data.totalScore}</p>
    </div>
  );
};

export default UserInfo;
