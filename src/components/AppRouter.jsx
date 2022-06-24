import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Pages from "../pages/Pages";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Pages />} />
      <Route path="/:id" element={<Pages />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
