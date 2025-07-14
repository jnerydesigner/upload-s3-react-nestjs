import { createUploadImage } from "@/api/uploads";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";

const fileSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size > 0, {
    message: "O arquivo deve ser maior que 0 bytes",
  }),
});

type fileType = z.infer<typeof fileSchema>;

export default function DropFile() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: async (file: File) => {
      const response = await createUploadImage(file);
      return response;
    },
    onSuccess: (data) => {
      toast(`Upload bem-sucedido: ${JSON.stringify(data)}`);
      console.log("Upload bem-sucedido:", data);
      queryClient.invalidateQueries({ queryKey: ["list-images"] });
      setPhoto("/no-photo.jpg");
    },
    onError: (error) => {
      console.error("Erro ao enviar o arquivo:", error);
    },
  });

  const [photo, setPhoto] = useState("/no-photo.jpg");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<fileType>({
    resolver: zodResolver(fileSchema),
  });

  const onDrop = useCallback(
    (file: File[]) => {
      if (file.length > 0) {
        const image = file[0];
        const urlTemp = URL.createObjectURL(image);
        setPhoto(urlTemp);
        setValue("file", image, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const onSubmitFile = async (data: fileType) => {
    mutation.mutate(data.file);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="flex items-center justify-center h-full">
          <div
            {...getRootProps()}
            className="bg-[#ecf0f1] w-full h-64 border-2 border-dashed border-gray-400 p-6 rounded-lg text-center flex justify-center items-center cursor-pointer transition hover:border-gray-600"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Solte o arquivo aqui ...</p>
            ) : (
              <p>Arraste e solte ou clique para selecionar um arquivo</p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-start items-center gap-4 w-full">
          <form
            onSubmit={handleSubmit(onSubmitFile)}
            className="w-full flex flex-col items-center"
          >
            <input type="hidden" {...register("file")} />
            {errors.file && (
              <span className="text-red-500 text-sm mb-2">
                {errors.file.message}
              </span>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-200"
            >
              Upload
            </button>
          </form>

          <div className="relative w-full aspect-[4/3] border rounded-lg shadow-md overflow-hidden">
            <img
              src={photo}
              alt="Preview da imagem"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
}
