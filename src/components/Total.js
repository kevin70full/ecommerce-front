import accounting from 'accounting'
import React, { useState } from 'react'
import './Pagina.css'
import { getBasketTotal } from '../Reducer';
import { useStateValue } from '../StateProvider'
import { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const Total = () => {
  const [{ basket,  }, dispatch] = useStateValue();
  const amount = getBasketTotal(basket);
  const currency = "USD";
  const style = { "layout": "vertical" };
  const [showButton, setShowButton] = useState(true);

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      
      if (basket.length === 0) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    }, [basket]);


    return (
      <>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
      style={style}
      disabled={false}
      forceReRender={[amount, currency, style]}
      fundingSource={undefined}
      createOrder={(data, actions) => {
          return actions.order
            .create({
                  purchase_units: [
                    {
                        amount: {
                            currency_code: currency,
                            value: amount,
                        },
                    },
                  ],
              })
              .then((orderId) => {
                  // Your code here after create the order
                  return orderId;
              });
      }}
      onApprove={(data, actions) => {
          actions.order.capture().then((details) => {
              // Show a success message to the buyer
              alert(`Transaccion realizada con exito`);
              // Your code here when the payment is approved
          });
      }}
      onError={(err) => {
          console.log(err);
      }}
  />

      </>
    );
  }

  return (
    <div className='total'>
      <h5> Total item: {basket?.length}</h5>
      <h5> {accounting.formatMoney(amount, "$")}</h5>
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
        
          <ButtonWrapper
            currency={currency}
            showSpinner={false}
          />
      
      </div>
    </div>
  )
}
