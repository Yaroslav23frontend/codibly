import { Route, Routes } from 'react-router-dom';
import Pages from '../pages/Pages.tsx';
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Pages />} />
      <Route path="/:id" element={<Pages />} />
    </Routes>
  );
}
