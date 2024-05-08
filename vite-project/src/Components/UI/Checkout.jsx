import { useContext } from "react";
import CartContext from "../../store/CartContext.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import Button from "./Button.jsx";
import UserPrpgressContext from "../../store/UserProgressContext.jsx";
import Modal from "./Modal.jsx";
import Input from "./Input.jsx";
import useHttp from "../../hook/useHttp.js";

const requestConfig = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserPrpgressContext);

  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button tyep="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    return (actions = <span> sending order data...</span>);
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted succesfully</p>
        <p>
          We will get back to you with more details via email within next few
          minutes.
        </p>

        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>

        <Input lable="Full Name" type="text" id="full-name" />
        <Input lable="E-Mail" type="text" id="email" />
        <Input lable="Street" type="text" id="street" />
        <div className="control-row">
          <Input lable="Postal Code" type="number" id="postal-code" />
          <Input lable="CIty" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order..." message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
