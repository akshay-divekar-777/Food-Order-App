import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserPrpgressContextProvider } from "./store/UserProgressContext.jsx";
import Cart from "./Components/Cart.jsx";
import Checkout from "./Components/UI/Checkout.jsx";

function App() {
  return (
    <>
      <UserPrpgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserPrpgressContextProvider>
    </>
  );
}

export default App;
