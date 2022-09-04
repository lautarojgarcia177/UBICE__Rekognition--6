import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Home } from './pages/Home';
import { Rekognize } from './pages/Rekognize';
import { Rekognizing } from './pages/Rekognizing';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="rekognize" element={<Rekognize />} />
            <Route path="rekognizing" element={<Rekognizing />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
