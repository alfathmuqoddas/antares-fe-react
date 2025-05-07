const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 w-full max-w-md">
        <h1 className="text-xl font-semibold text-center text-gray-700 mb-8">
          Not Found
        </h1>
        <p className="text-center text-sm text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
      <footer className="mt-12 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFoundPage;
