import { listImages } from "@/api/uploads";
import type { Images } from "@/types/image-type";
import { useQuery } from "@tanstack/react-query";

export const ListImages = () => {
  const { data: images, isLoading } = useQuery({
    queryKey: ["list-images"],
    queryFn: async () => {
      const response = await listImages<Images[]>();
      if (!response[0].id) {
        throw new Error("Failed to fetch images");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 w-full max-w-7xl px-4">
      <div className="text-center mb-4 text-4xl font-bold text-gray-800">
        Listagem de Fotos do S3
      </div>

      {images && images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="w-full aspect-[4/3] border rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={image.url}
                alt="Imagem do Drop"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-gray-500">Nenhuma imagem encontrada</h1>
      )}
    </div>
  );
};
