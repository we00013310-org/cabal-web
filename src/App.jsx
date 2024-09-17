import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Toaster from "./components/Helpers/Toaster";
import Routers from "./Routers";
import Default from "./components/Partials/Default";
import store from "./store/store";
import WalletContextProvider from "./providers/WalletContext";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <Default>
      <WalletContextProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Routers />
            <Toaster />
          </QueryClientProvider>
        </Provider>
      </WalletContextProvider>
    </Default>
  );
}

export default App;
