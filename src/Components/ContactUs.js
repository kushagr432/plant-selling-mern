import React, { useState } from 'react';

const ContactUs = () => {
    document.title = "Contact Us";

    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        customerMessage: '',
        termsAndConditions: false
    });
    const [submissionResult, setSubmissionResult] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://formspree.io/f/xleqnvwv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            setSubmissionResult(result);
            if (response.ok) {
                // Clear form fields upon successful submission
                setFormData({
                    customerName: '',
                    customerPhone: '',
                    customerEmail: '',
                    customerMessage: '',
                    termsAndConditions: false
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <section className='bg-section'>
            <div className="container p-2">
                <div className="row d-flex justify-content-center border rounded shadow bg-secondary text-white">
                    <div className="col-12 p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Name" name="customerName" value={formData.customerName} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="number" className="form-label">Phone:</label>
                                <input type="number" className="form-control" id="number" placeholder="Enter Number" name="customerPhone" value={formData.customerPhone} onChange={handleChange} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} />
                            </div>
                            <div className='mb-3 mt-3'>
                                <label htmlFor="comment" className="form-label">Message:</label>
                                <textarea className="form-control" rows="5" id="message" name="customerMessage" value={formData.customerMessage} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" name="termsAndConditions" checked={formData.termsAndConditions} onChange={handleChange} /> terms and conditions
                                </label>
                            </div>
                            <div className='d-flex flex-row-reverse'>
                                <button type="submit" className='btn btn-primary' >Submit</button>
                            </div>
                        </form>
                        {submissionResult && <p>{submissionResult.message}</p>}
                        {submissionResult && submissionResult.ok && (
                            <div  className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm rounded-lg mt-2 bg-main font-medium text-white border-2">
                                We Will Contact You Soon.
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
