import './App.css';
import Layout from './layouts/layout.component';
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
function App() {
    // const stripePromise = loadStripe("pk_test_51LaaebE1y6QIfNeVvqujr2elcO1UYRMW3DhHwN89YV7MXtH1uNUKLf2l16DjGSu09s2ujcmB3dTdQEIOTaMITM7y00AWQ9TJVI");
  return (
    <div className="App">
        {/*<Elements stripe={stripePromise}>*/}
      <Layout/>
        {/*</Elements>*/}
    </div>
  );
}

export default App;
