import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  //   TableCaption,
  TableCell,
  //   TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewTheaterModal from "./modal/newTheaterModal";
import UpdateTheaterModal from "./modal/updateTheaterModal";

const AdminTheatersPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/theaters`,
    fetcher
  );
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
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Theaters</h1>
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
            {data?.map((theater: any) => (
              <TableRow key={theater.id}>
                <TableCell>
                  <span
                    onClick={() => navigate(`${theater.id}`)}
                    className="hover:underline hover:underline-offset-2 font-semibold hover:cursor-pointer"
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
