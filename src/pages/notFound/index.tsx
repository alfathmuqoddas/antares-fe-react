import { TicketX } from "lucide-react";

const NotFoundPage = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <TicketX className="w-32 h-32" />
        <h1 className="text-xl font-semibold text-center text-gray-700">
          Page Not Found
        </h1>
        <p className="text-center text-sm text-gray-600">
          Sorry we couldn't find the page you're looking for.
        </p>
      </section>
    </>
  );
};

export default NotFoundPage;
