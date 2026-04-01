import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router";
import NewScreenModal from "./modal/newScreenModal";
import UpdateScreenModal from "./modal/updateScreenModal";
import ManageShowtimes from "./showtimes";
import NewSeatLayoutModal from "./modal/newSeatLayoutModal";
import ViewSeatLayoutModal from "./modal/viewSeatLayoutModal";
import { Trash2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApiMutation } from "@/hooks/useApiMutation";
import type { TTheaterDto, TScreenResponseDto } from "../types";

const AdminTheatersDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const { data, error, isLoading, mutate } = useApi<TTheaterDto>(
    `/theaters/${id}`,
  );

  const { trigger } = useApiMutation<TScreenResponseDto, any, any>("/screens", {
    method: "DELETE",
    onSuccess: (data) => {
      alert(data.message);
      mutate();
    },
    onError: (err) => {
      console.error("Screen data error:", err);
      alert("Error deleting screen");
    },
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
  const { screens } = data;

  const handleDeleteScreen = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this screen?")) {
      return;
    }
    await trigger(`/screens/${id}`);
  };

  return (
    <>
      <section className="" aria-label="admin-theaters-details-page">
        <h1 className="text-xl font-bold mb-4">Theater Details</h1>
        <section className="rounded-lg shadow bg-white p-6 mb-8">
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
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Manage Screens</h1>
            <div>
              <NewScreenModal theaterId={id || ""} />
            </div>
          </div>
          <section className="rounded-lg p-4 shadow bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Screen Type</TableHead>
                  <TableHead>Capacity</TableHead>
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
                      <TableCell>
                        {screen.hasSeats ? (
                          <ViewSeatLayoutModal screenId={screen.id} />
                        ) : (
                          <NewSeatLayoutModal screenId={screen.id} />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <UpdateScreenModal screen={screen} />

                          <Trash2
                            color="red"
                            size={16}
                            className="cursor-pointer"
                            onClick={() => handleDeleteScreen(screen.id)}
                          />
                        </div>
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
        <ManageShowtimes theaterId={id} screens={screens} />
      </section>
    </>
  );
};

export default AdminTheatersDetailsPage;
