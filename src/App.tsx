import { Search } from "lucide-react";

function App() {
  return (
    <>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div>
          <div className="mb-8">
            <h1 className="text-5xl font-bold">Project Antares</h1>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for movies or theaters"
              className="w-full bg-white p-4 rounded-l-2xl min-w-[50vw] hover:shadow"
            />
            <div className="p-4 bg-blue-500 text-white rounded-r-2xl">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
