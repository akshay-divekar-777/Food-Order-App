import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";
import UserPrpgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserPrpgressContext);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="FoodOrder" />
        <h1>FoodOrder</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          {" "}
          Cart({totalCartItems}){" "}
        </Button>
      </nav>
    </header>
  );
}
