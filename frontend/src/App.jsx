import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WatchlistProvider } from "./context/WatchlistContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Trade from "./pages/Trade";
import Watchlist from "./pages/Watchlist";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import { TradeProvider } from "./context/TradeContext";
import Portfolio from "./pages/Portfolio";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TradeProvider>
        <WatchlistProvider>
          <BrowserRouter>
            <Routes>
              {/* Redirect */}
              <Route path="/" element={<Navigate to="/dashboard" />} />

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/trade/:symbol" element={<Trade />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/portfolio" element={<Portfolio />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WatchlistProvider>
      </TradeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
