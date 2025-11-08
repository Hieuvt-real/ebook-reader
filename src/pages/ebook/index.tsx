import React, { useEffect, useState } from "react";
import type { Ebook } from "../../types/EbookType";
import EbookApi from "../../api/EbookApi";
import EBookItem from "../../components/EBook/EBookItem";
import Loader from "../../components/Common/Loader";

const EbookPage = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchListEbook = async () => {
      try {
        const response = await EbookApi.getAllEbook();
        setEbooks(response.data as Ebook[]);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Lỗi khi tải dữ liệu sách.");
        }
        setEbooks([]);
      } finally {
        setLoading(false);
      }
    };

    handleFetchListEbook();
  }, []);

  if (loading) return <Loader />;

  if (error) return <p>{error}</p>;
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {ebooks.map((item) => (
          <EBookItem key={item.id} ebook={item} />
        ))}
      </div>
    </div>
  );
};

export default EbookPage;
