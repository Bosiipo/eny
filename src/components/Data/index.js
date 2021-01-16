import React from 'react';
import './data.css';

const Data = ({user}) => {
    return (
        <div className="card-container">
            <h3>{user.FirstName} {user.LastName}</h3>
            <p><i>username: {user.UserName}</i></p>
            <h6><strong>Email: </strong> <i>{user.Email}</i></h6>
            <p><strong>Phone Number: </strong> {user.PhoneNumber}</p>
            <p><strong>Gender:</strong> {user.Gender}</p>
            <p className="url"><strong>URL:</strong> {user.URL}</p>
            <div className="details">
                <h6>Card Details</h6>
                <ul>
                    <li><strong>Type:</strong> {user.CreditCardType}</li>
                    <li><strong>Number:</strong>{user.CreditCardNumber}</li>
                    <li><strong>Payment method:</strong> {user.PaymentMethod}</li>
                </ul>
            </div>
        </div>
    )
}

export default Data;


