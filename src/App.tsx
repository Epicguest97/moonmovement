import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import PostDetail from "./pages/PostDetail";
import Community from "./pages/Community";
import Submit from "./pages/Submit";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import StartupNews from "./pages/StartupNews";
import UnicornsIndia from "./pages/UnicornsIndia";
import StartupDetail from "./pages/StartupDetail";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Index />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/r/:communityName" element={<Community />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/news" element={<StartupNews />} />
          <Route path="/news/:newsId" element={<NewsDetail />} />
          <Route path="/unicorns-india" element={<UnicornsIndia />} />
          <Route path="/startup/:startupId" element={<StartupDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
