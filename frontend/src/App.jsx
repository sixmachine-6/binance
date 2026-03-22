import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Trade from "./pages/Trade";
import Watchlist from "./pages/Watchlist";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Portfolio from "./pages/Portfolio";
import { Toaster } from "react-hot-toast";
import Reports from "./pages/Reports";
import MarketOverview from "./pages/MarketOverview";
import Futures from "./pages/Futures";

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
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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
            <Route path="/reports" element={<Reports />} />
            <Route path="/markets" element={<MarketOverview />} />
            <Route path="/futures" element={<Futures />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;