import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./app/routes/AppRouter";
import { ErrorBoundary } from "./app/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;