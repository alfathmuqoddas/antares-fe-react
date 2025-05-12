import useSWR from "swr";
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
import { useParams } from "react-router";
import { fetcher } from "@/lib/fetcher";
import NewScreenModal from "./modal/newScreenModal";
import UpdateScreenModal from "./modal/updateScreenModal";

const AdminTheatersDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/theaters/${id}`,
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
  const { screens } = data;
  return (
    <>
      <section className="" aria-label="admin-theaters-details-page">
        <h1 className="text-xl font-bold mb-4">Theater Details</h1>
        <section className="rounded-lg bg-gray-100 p-4 mb-8">
          <div className="table">
            <div className="table-row">
              <div className="table-cell pr-16">Name</div>
              <div className="table-cell font-bold">: {data.name}</div>
            </div>
            <div className="table-row">
              <div className="table-cell pr-16">Address</div>
              <div className="table-cell font-bold">: {data.address}</div>
            </div>
            <div className="table-row">
              <div className="table-cell pr-16">City</div>
              <div className="table-cell font-bold">: {data.city}</div>
            </div>
            <div className="table-row">
              <div className="table-cell pr-16">State</div>
              <div className="table-cell font-bold">: {data.state}</div>
            </div>
            <div className="table-row">
              <div className="table-cell pr-16">Zip</div>
              <div className="table-cell font-bold">: {data.zip}</div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Manage Screens</h1>
            <div>
              <NewScreenModal theaterId={id || ""} />
            </div>
          </div>
          <section className="rounded-lg p-4 shadow">
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

              {screens.length > 0 ? (
                <TableBody>
                  {screens.map((screen: any) => (
                    <TableRow key={screen.id}>
                      <TableCell>{screen.name}</TableCell>
                      <TableCell>{screen.screenType}</TableCell>
                      <TableCell>{screen.capacity}</TableCell>
                      <TableCell>{screen.ticketPrice}</TableCell>
                      <TableCell>{screen.layoutDescription}</TableCell>
                      <TableCell>
                        <UpdateScreenModal screen={screen} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="text-center">
                        <p>No screens found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </section>
        </section>
      </section>
    </>
  );
};

export default AdminTheatersDetailsPage;
