import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./app/routes/AppRouter";
import { ErrorBoundary } from "./app/components/ErrorBoundary";
import { AlertProvider } from "./app/context/AlertContext";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AlertProvider>
          <AppRouter />
        </AlertProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;