import React, { useState, useEffect } from 'react';
import './PromoCodeForm.css';

const PromoCodeForm = ({ promoCode, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        code: '',
        title: '',
        description: '',
        discountPercentage: 10,
        startDate: '',
        endDate: '',
        active: true
    });

    useEffect(() => {
        if (promoCode) {
            setFormData({
                code: promoCode.code,
                title: promoCode.title,
                description: promoCode.description,
                discountPercentage: promoCode.discountPercentage,
                startDate: promoCode.startDate ? promoCode.startDate.split('T')[0] : '',
                endDate: promoCode.endDate ? promoCode.endDate.split('T')[0] : '',
                active: promoCode.active
            });
        }
    }, [promoCode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-overlay">
            <div className="promo-code-form">
                <h2>{promoCode ? 'Edit Promo Code' : 'Add New Promo Code'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Code*</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Title*</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Discount Percentage*</label>
                        <input
                            type="number"
                            name="discountPercentage"
                            min="1"
                            max="100"
                            value={formData.discountPercentage}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Start Date*</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date*</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active}
                                onChange={handleChange}
                            />
                            Active
                        </label>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            {promoCode ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PromoCodeForm;