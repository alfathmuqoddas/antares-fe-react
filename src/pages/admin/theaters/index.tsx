import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useNavigate, Link } from "react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewTheaterModal from "./modal/newTheaterModal";
import UpdateTheaterModal from "./modal/updateTheaterModal";

const AdminTheatersPage = () => {
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
      <section className="" aria-label="admin-theaters-page">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold">Manage Theaters</h1>
          <div>
            <NewTheaterModal />
          </div>
        </div>
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
                <TableCell>{theater.name}</TableCell>
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
