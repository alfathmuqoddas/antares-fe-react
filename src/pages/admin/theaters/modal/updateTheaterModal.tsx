import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const UpdateTheaterModal = ({ theater }: { theater: any }) => {
  const [theaterData, setTheaterData] = useState(theater);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setIsLoadingUpdate(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/theaters/${theater.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...theaterData,
          }),
        }
      );
      const data = await res.json();
      setIsLoadingUpdate(false);
      alert(data.message);
    } catch (error) {
      console.error("Error updating movie:", error);
      setIsLoadingUpdate(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="underline underline-offset-2 font-semibold text-orange-400 hover:cursor-pointer">
          edit
        </span>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Theater Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="theaterName" className="text-right mr-4">
              Name
            </Label>
            <Input
              id="theaterName"
              value={theaterData.name}
              className="col-span-3"
              placeholder="insert name"
              onChange={(e) =>
                setTheaterData({ ...theaterData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="theaterState" className="text-right mr-4">
              State
            </Label>
            <Input
              id="theaterState"
              className="col-span-3"
              value={theaterData.state}
              placeholder="insert state"
              onChange={(e) =>
                setTheaterData({ ...theaterData, state: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="theaterCity" className="text-right mr-4">
              City
            </Label>
            <Input
              id="theaterCity"
              className="col-span-3"
              value={theaterData.city}
              placeholder="insert city"
              onChange={(e) =>
                setTheaterData({ ...theaterData, city: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="theaterZip" className="text-right mr-4">
              Zip Code
            </Label>
            <Input
              id="theaterZip"
              className="col-span-3"
              value={theaterData.zip}
              placeholder="insert zip code"
              onChange={(e) =>
                setTheaterData({ ...theaterData, zip: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="theaterAddress" className="text-right mr-4">
              Address
            </Label>
            <Textarea
              id="theaterAddress"
              className="col-span-3"
              placeholder="insert address"
              value={theaterData.address}
              onChange={(e) =>
                setTheaterData({ ...theaterData, address: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleUpdate}
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate ? "Processing..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTheaterModal;
