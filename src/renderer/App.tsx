import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Configuration } from './pages/Configuration';
import { Home } from './pages/Home';
import { Rekognize } from './pages/Rekognize';
import { Rekognizing } from './pages/Rekognizing';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Rekognize />} />
            <Route path="rekognizing" element={<Rekognizing />} />
            <Route path="config" element={<Configuration />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
