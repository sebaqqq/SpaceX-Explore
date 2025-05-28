import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import UpcomingLaunchesPage from './pages/UpcomingLaunchesPage';
import PastLaunchesPage from './pages/PastLaunchesPage';
import LatestLaunchPage from './pages/LatestLaunchPage';
import NotFoundPage from './pages/NotFoundPage';
import Stars from './components/Stars';

function App() {
  return (
    <>
      <Stars />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upcoming" element={<UpcomingLaunchesPage />} />
          <Route path="/past" element={<PastLaunchesPage />} />
          <Route path="/latest" element={<LatestLaunchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;