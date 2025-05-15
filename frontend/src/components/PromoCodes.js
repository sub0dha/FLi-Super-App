import { useEffect, useState } from "react";

export default function PromoCodes() {
  const [promoCodes, setPromoCodes] = useState([]);

  useEffect(() => {
    fetch("/promocodes/active")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch promo codes");
        }
        return res.json();
      })
      .then((data) => setPromoCodes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Promo Codes</h2>
      <ul>
        {promoCodes.map((p) => (
          <li key={p.id}>
            <strong>{p.code}</strong> - {p.description} ({p.discountPercentage}% off)
            <button onClick={() => navigator.clipboard.writeText(p.code)}>Copy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
