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
import NewShowtimesModal from "./modal/newShowtimesModal";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const ManageShowtimes = ({
  theaterId,
  screens,
}: {
  theaterId: string;
  screens: any;
}) => {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/theaters/${theaterId}/showtimes`,
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
  console.log({ showtimes: data });
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Showtimes</h1>
        <NewShowtimesModal screens={screens} />
      </div>
      <section className="rounded-lg p-4 shadow bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Screen Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Ticket Price</TableHead>
              <TableHead>Layout</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>
      </section>
    </section>
  );
};

export default ManageShowtimes;
