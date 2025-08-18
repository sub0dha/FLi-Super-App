import React, { useEffect, useState } from 'react';
import './ViewPromoCodes.css';
import PromoCodeForm from './PromoCodeForm';

const ViewPromoCodes = () => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingPromoCode, setEditingPromoCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPromoCodes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/promocodes');
            if (!response.ok) throw new Error('Failed to fetch promo codes');
            const data = await response.json();
            setPromoCodes(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this promo code?')) return;

        try {
            const response = await fetch(`http://localhost:8080/promocodes/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete promo code');

            setPromoCodes(promoCodes.filter(promo => promo.id !== id));
            alert('Promo code deleted successfully!');
        } catch (err) {
            setError(err.message);
            alert('Error deleting promo code: ' + err.message);
        }
    };

    const handleEdit = (promo) => {
        setEditingPromoCode(promo);
        setShowForm(true);
    };

    const handleAddPromoCode = () => {
        setEditingPromoCode(null);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            const url = editingPromoCode
                ? `http://localhost:8080/promocodes/${editingPromoCode.id}`
                : 'http://localhost:8080/promocodes';

            const method = editingPromoCode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Failed to ${editingPromoCode ? 'update' : 'create'} promo code`);

            const result = await response.json();

            if (editingPromoCode) {
                setPromoCodes(promoCodes.map(p => p.id === result.id ? result : p));
            } else {
                setPromoCodes([...promoCodes, result]);
            }

            setShowForm(false);
            alert(`Promo code ${editingPromoCode ? 'updated' : 'created'} successfully!`);
        } catch (err) {
            setError(err.message);
            alert(`Error: ${err.message}`);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const getStatus = (startDate, endDate, isActive) => {
        if (!isActive) return 'Inactive';

        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (today < start) return 'Upcoming';
        if (today > end) return 'Expired';
        return 'Active';
    };

    if (isLoading) return <div className="loading">Loading promo codes...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="promo-codes-container">
            <h1>Promo Code Management</h1>
            <div className="top-bar">
                <button className="add-promo-button" onClick={handleAddPromoCode}>
                    Add Promo Code
                </button>
            </div>

            {showForm && (
                <PromoCodeForm
                    promoCode={editingPromoCode}
                    onClose={() => setShowForm(false)}
                    onSubmit={handleFormSubmit}
                />
            )}

            <table className="promo-codes-table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Discount</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {promoCodes.length > 0 ? (
                        promoCodes.map(promo => (
                            <tr key={promo.id}>
                                <td className="code-cell">{promo.code}</td>
                                <td>{promo.title}</td>
                                <td className="description-cell">{promo.description}</td>
                                <td className="discount-cell">{promo.discountPercentage}%</td>
                                <td>{formatDate(promo.startDate)}</td>
                                <td>{formatDate(promo.endDate)}</td>
                                <td className={`status-cell ${getStatus(promo.startDate, promo.endDate, promo.active).toLowerCase()}`}>
                                    {getStatus(promo.startDate, promo.endDate, promo.active)}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="action-button edit"
                                            onClick={() => handleEdit(promo)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="action-button delete"
                                            onClick={() => handleDelete(promo.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="no-results">
                                No promo codes found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewPromoCodes;
