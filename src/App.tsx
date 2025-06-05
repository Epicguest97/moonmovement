
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Submit from '@/pages/Submit';
import PostDetail from '@/pages/PostDetail';
import Profile from '@/pages/Profile';
import UserProfile from '@/pages/UserProfile';
import Community from '@/pages/Community';
import ManageCommunities from '@/pages/ManageCommunities';
import News from '@/pages/News';
import NewsDetail from '@/pages/NewsDetail';
import StartupNews from '@/pages/StartupNews';
import UnicornsIndia from '@/pages/UnicornsIndia';
import StartupDetail from '@/pages/StartupDetail';
import IndianDistricts from '@/pages/IndianDistricts';
import Search from '@/pages/Search';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/r/:subreddit" element={<Community />} />
          <Route path="/r/create" element={<ManageCommunities />} />
          <Route path="/communities" element={<ManageCommunities />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/unicorns-india" element={<UnicornsIndia />} />
          <Route path="/startup/:id" element={<StartupDetail />} />
          <Route path="/startup-news" element={<StartupNews />} />
          <Route path="/districts" element={<IndianDistricts />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
