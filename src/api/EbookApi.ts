import type { Ebook } from "../types/EbookType";
import { ebooks } from "./dummyData";

export type ResponseApi<T> = {
  data: T | undefined;
  status: number;
};

const EbookApi = {
  getAllEbook: (): Promise<ResponseApi<Ebook[]>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: ebooks,
          status: 200,
        });
      }, 500);
    });
  },

  getEbookById: (id: string): Promise<ResponseApi<Ebook>> => {
    const ebook = ebooks.find((item) => item.id === id);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: ebook,
          status: 200,
        });
      }, 500);
    });
  },
};

export default EbookApi;
