import React, { useEffect, useState } from 'react';
import styles from '../components/css/myPurchases.module.css';
import Nav from '../components/nav';

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const purchasesPerPage = 2;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.userId) {
      setError('User not logged in');
      return;
    }

    fetch(`http://localhost:5000/purchases/${user.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch purchases');
      });
  }, []);

  const indexOfLast = currentPage * purchasesPerPage;
  const indexOfFirst = indexOfLast - purchasesPerPage;
  const currentPurchases = purchases.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(purchases.length / purchasesPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
  <Nav />
  <div className={styles.centeredPage}>
    <div className={styles.wrapper}>
      <h2>My Purchases</h2>
      {error && <p className={styles.error}>{error}</p>}
      {purchases.length === 0 ? (
        <p>You haven't made any purchases yet.</p>
      ) : (
        <>
          {currentPurchases.map((purchase) => (
            <div key={purchase.purchaseId} className={styles.purchaseCard}>
              <p><strong>Date:</strong> {new Date(purchase.date).toLocaleString()}</p>
              <p><strong>Total:</strong> ${Number(purchase.total).toFixed(2)}</p>
              <ul>
                {purchase.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${Number(item.price).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.pagination}>
            <button 
              onClick={handlePrev} 
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={handleNext} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  </div>
</>

  );
};

export default MyPurchases;
