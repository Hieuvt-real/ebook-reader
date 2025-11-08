import React, { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfReader = ({ pdfUrl }: { pdfUrl: string }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  function onDocumentLoadSuccess(numPages: number) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const nextPage = useCallback(() => {
    setPageNumber((prev) =>
      numPages ? Math.min(prev + 1, numPages) : prev + 1
    );
    // scroll to top of container
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [numPages]);

  const prevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const zoomIn = () => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(2)));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextPage, prevPage]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {/* control bar*/}
      <div
        className="pdf-controls flex items-center justify-center 
                      bg-white p-3 rounded-lg shadow-md mb-6 
                      space-x-4 border border-gray-200"
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={prevPage}
            disabled={pageNumber <= 1}
            className="p-2 bg-indigo-600 text-white rounded-full transition duration-150 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-sm font-semibold"
          >
            &larr; Prev
          </button>

          {/* HIỂN THỊ SỐ TRANG */}
          <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Trang {pageNumber} / {numPages || "--"}
          </p>

          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className="p-2 bg-indigo-600 text-white rounded-full transition duration-150 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-sm font-semibold"
          >
            Next &rarr;
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-3"></div>

        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-2 text-gray-600 rounded-full border border-gray-300 transition duration-150 hover:bg-gray-100 disabled:opacity-50 text-base font-semibold"
          >
            -
          </button>

          <p className="w-16 text-center text-sm font-semibold text-gray-800">
            {Math.round(scale * 100)}%
          </p>

          <button
            onClick={zoomIn}
            disabled={scale >= 3.0}
            className="p-2 text-gray-600 rounded-full border border-gray-300 transition duration-150 hover:bg-gray-100 disabled:opacity-50 text-base font-semibold"
          >
            +
          </button>
        </div>
      </div>
      {/* content */}
      <div
        ref={containerRef}
        className="pdf-page-wrapper 
                      border-4 border-gray-300/50 rounded-lg overflow-hidden 
                      shadow-2xl shadow-gray-500/50 
                      max-w-full"
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => onDocumentLoadSuccess(numPages)}
          loading={
            <div className="p-10 text-xl text-gray-500">Đang tải Ebook...</div>
          }
          error={
            <div className="p-10 text-xl text-red-500">
              Lỗi: Không thể tải file PDF.
            </div>
          }
        >
          <div className="overflow-auto">
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        </Document>
      </div>
    </div>
  );
};

export default PdfReader;
