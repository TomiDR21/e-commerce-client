import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const goToPurchases = () => {
    navigate('/mypurchases');
  };

  return (
    <>
      <Nav />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Welcome, {user?.username || 'User'}!</h2>
        <p>Your user ID is: {user?.userId}</p>

        <button
          onClick={goToPurchases}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white'
          }}
        >
          View My Purchases
        </button>
      </div>
    </>
  );
};

export default Profile;
