import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Ebook } from "../../../types/EbookType";
import Loader from "../../../components/Common/Loader";
import EbookApi from "../../../api/EbookApi";
import PdfReader from "../../../components/EBook/PdfReader";

const EbookDetailPage = () => {
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchListEbook = async () => {
      if (!id) {
        setError("sách không tồn tại!");
        return;
      }
      try {
        const response = await EbookApi.getEbookById(id);
        setEbook(response.data as Ebook);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Lỗi khi tải dữ liệu sách.");
        }
        setEbook(null);
      } finally {
        setLoading(false);
      }
    };

    handleFetchListEbook();
  }, []);

  if (loading) return <Loader />;

  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="ebook-detail-page bg-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Tiêu đề trang */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {ebook?.title}
        </h1>
        <p className="text-xl text-indigo-600 mb-8">Tác giả: {ebook?.author}</p>

        {/* Component xem PDF */}
        <PdfReader pdfUrl={ebook?.pdfUrl as string} />
      </div>
    </div>
  );
};

export default EbookDetailPage;
