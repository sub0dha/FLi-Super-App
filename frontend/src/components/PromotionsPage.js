import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PromotionsPage.css";

function PromotionsPage() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch("http://localhost:8080/promocodes/active");
        if (!response.ok) throw new Error("Failed to fetch promotions");
        const data = await response.json();
        setPromotions(data);
      } catch (err) {
        setError("Could not load promotions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) return <div className="loading">Loading promotions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="promotions-page">
      <h1>Exclusive Offers and Promotions</h1>
      <img
        src="/Offer-1.jpg"
        alt="Special Offer Banner"
        className="offer-banner"
      />

      <div className="promotion-list">
        {promotions.length > 0 ? (
          promotions.map((promo) => (
            <div key={promo.id} className="promotion-card">
              <h2>{promo.title}</h2>
              <p>{promo.description}</p>
              <p className="promotion-date">
                Valid from {new Date(promo.startDate).toLocaleDateString()} to{" "}
                {new Date(promo.endDate).toLocaleDateString()}
              </p>

              {/* Displaying the promo code */}
              <div className="promo-code-box">
                <strong>Promo Code:</strong> {promo.code}
              </div>

              <button onClick={() => navigate("/productpage")}>Shop Now</button>
            </div>
          ))
        ) : (
          <p>No promotions available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default PromotionsPage;
