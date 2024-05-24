import React from "react";
import axios from "axios";
import Razorpay from "razorpay";

const home = () => {
  const handlePayment = async () => {
    const { data } = await axios.post(
      "http://localhost:5233/api/v1/user/orders/checkout",
      {
        type: "shop",
        paymentType: "online",
        shopId: 1,
        servicesIds: [1],
        serviceProviderId: 1,
        bookingDate: "22/05/2024",
        bookingTime: "03:00 PM",
        discount: 0,
        qty: 1,
        totalPrice: 145,
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJwaG9uZSI6Ijk3MTg1NDMyMjEiLCJyb2xlIjoiVVNFUiIsImlzQXJ0aXN0IjpmYWxzZSwiaWF0IjoxNzE1ODkwMTg5LCJleHAiOjE3MTU5NzY1ODl9.wii-oVTDv0_-d1kdC8utRQM210KZhadXHrf0_0n893k",
        },
      }
    );
    const response = data.data;
    const razorpay = new Razorpay({
      key: "rzp_test_6gvcciC8Z6qAxB",
      amount: response.amount, // Amount in paise (1 INR = 100 paise)
      currency: "INR",
      name: "Your Company Name",
      description: "Payment for your service",
      order_id: response.id,
      handler: function (response) {
        console.log(response);
        // Handle successful payment
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "+919876543210",
      },
    });
    razorpay.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default home;
