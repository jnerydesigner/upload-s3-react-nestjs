import { Api } from ".";

export const createUploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await Api.post("/upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const listImages = async <T>() => {
  const { data } = await Api.get<T>("/upload/list");
  console.log("Response from listImages:", data);
  return data;
};
