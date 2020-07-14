import React, { Component } from "react";
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
 
const config = {
  txref: "rave-123456",
  customer_email: "user@example.com",
  customer_phone: "234099940409",
  amount: 2000,
  PBFPubKey: "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXX-X",
  production: false,
  onSuccess: () => {},
  onClose: () => {}
};

const RavePayment = () => {
  return (
    <div>
      <RaveProvider {...config}>
        <RavePaymentButton>Pay 2000</RavePaymentButton>
      </RaveProvider>
    </div>
  );
};

export default RavePayment