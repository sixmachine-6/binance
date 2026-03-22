import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { WatchlistProvider } from "./context/WatchlistContext";
=======
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Trade from "./pages/Trade";
import Watchlist from "./pages/Watchlist";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
<<<<<<< HEAD
import { TradeProvider } from "./context/TradeContext";
import Portfolio from "./pages/Portfolio";
import { Toaster } from "react-hot-toast";
=======
import Portfolio from "./pages/Portfolio";
import { Toaster } from "react-hot-toast";
import Reports from "./pages/Reports";
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8

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
<<<<<<< HEAD
      <TradeProvider>
        <WatchlistProvider>
          <BrowserRouter>
            {/* ✅ Toast container */}
            <Toaster position="top-right" reverseOrder={false} />

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
=======
      <BrowserRouter>
        {/* ✅ Toast container */}
        <Toaster position="top-right" reverseOrder={false} />

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
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
