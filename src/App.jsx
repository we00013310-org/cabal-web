import { Provider } from "react-redux";

import Toaster from "./components/Helpers/Toaster";
import Routers from "./Routers";
import Default from "./components/Partials/Default";
import store from "./store/store";
import WalletContextProvider from "./providers/WalletContext";

function App() {
  return (
    <Default>
      <WalletContextProvider>
        <Provider store={store}>
          <Routers />
          <Toaster />
        </Provider>
      </WalletContextProvider>
    </Default>
  );
}

export default App;
