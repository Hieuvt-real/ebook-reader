import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import NotFound from "../components/Common/NotFound";
import EbookPage from "../pages/ebook";
import EbookDetailPage from "../pages/ebook/ebook-detail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/ebooks" replace />} />
        <Route path="/ebooks" element={<EbookPage />} />
        <Route path="ebooks/:id" element={<EbookDetailPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
