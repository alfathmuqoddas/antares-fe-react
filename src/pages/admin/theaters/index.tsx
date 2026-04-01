import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewTheaterModal from "./modal/newTheaterModal";
import UpdateTheaterModal from "./modal/updateTheaterModal";
import { useApi } from "@/hooks/useApi";
import { TTheaterDto } from "./types";

const AdminTheatersPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useApi<TTheaterDto[]>("/theaters", {
    useAuth: true,
  });

  if (error) {
    console.error("Error fetching theaters data:", error);
    return <p>Sorry, there was an error fetching the theaters.</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No data found.</p>;
  }
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black tracking-widest text-neutral-700">
          MANAGE THEATERS
        </h1>
        <div>
          <NewTheaterModal />
        </div>
      </header>
      <section
        className="rounded-lg p-4 shadow bg-white"
        aria-label="admin-theaters-page"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>State</TableHead>
              <TableHead>City</TableHead>
              <TableHead>ZIP</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((theater) => (
              <TableRow key={theater.id}>
                <TableCell>
                  <span
                    onClick={() => navigate(`${theater.id}`)}
                    className="underline text-blue-500 underline-offset-2 hover:cursor-pointer"
                  >
                    {theater.name}
                  </span>
                </TableCell>
                <TableCell>{theater.state}</TableCell>
                <TableCell>{theater.city}</TableCell>
                <TableCell>{theater.zip}</TableCell>
                <TableCell>{theater.address}</TableCell>
                <TableCell>
                  <UpdateTheaterModal theater={theater} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default AdminTheatersPage;
