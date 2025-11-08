import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { StoryDetail } from './components/StoryDetail';
import { UserProfile } from './components/UserProfile';
import { TopStories } from './pages/TopStories';
import { NewStories } from './pages/NewStories';
import { BestStories } from './pages/BestStories';
import { AskStories } from './pages/AskStories';
import { ShowStories } from './pages/ShowStories';
import { JobStories } from './pages/JobStories';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<TopStories />} />
            <Route path="/new" element={<NewStories />} />
            <Route path="/best" element={<BestStories />} />
            <Route path="/ask" element={<AskStories />} />
            <Route path="/show" element={<ShowStories />} />
            <Route path="/jobs" element={<JobStories />} />
            <Route path="/story/:id" element={<StoryDetail />} />
            <Route path="/user/:username" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
