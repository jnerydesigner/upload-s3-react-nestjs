import DropFile from "./components/drop-file";
import { ListImages } from "./components/list-images";

export default function App() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center gap-y-8 p-8 bg-[#65bb33]">
      <DropFile />
      <ListImages />
    </main>
  );
}
