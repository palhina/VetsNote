import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./features/auth";
import { Navigation } from "./components/layout/Navigation";

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
