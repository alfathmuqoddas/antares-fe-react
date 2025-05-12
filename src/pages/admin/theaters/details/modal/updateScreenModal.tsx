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

const UpdateScreenModal = ({ screen }: { screen: any }) => {
  const [screenData, setScreenData] = useState(screen);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setIsLoadingUpdate(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/screens/${screen.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...screenData,
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
          <DialogTitle>Edit Screen Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="theaterName" className="text-right mr-4">
              Name
            </Label>
            <Input
              id="screenName"
              placeholder="insert name"
              value={screenData.name}
              onChange={(e) =>
                setScreenData({ ...screenData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="screenType" className="text-right mr-4">
              Type
            </Label>
            <Input
              id="screenType"
              placeholder="insert screen type"
              value={screenData.screenType}
              onChange={(e) =>
                setScreenData({ ...screenData, screenType: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="screenCapacity" className="text-right mr-4">
              Capacity
            </Label>
            <Input
              id="screenCapacity"
              type="number"
              placeholder="insert capacity"
              value={screenData.capacity}
              onChange={(e) =>
                setScreenData({
                  ...screenData,
                  capacity: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="screenTicketPrice" className="text-right mr-4">
              Ticket Price
            </Label>
            <Input
              id="theaterZip"
              placeholder="insert ticket price"
              type="number"
              value={screenData.ticketPrice}
              onChange={(e) =>
                setScreenData({
                  ...screenData,
                  ticketPrice: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="screenLayoutDescription"
              className="text-right mr-4"
            >
              Layout Description
            </Label>
            <Textarea
              id="screenLayoutDescription"
              placeholder="insert layout description"
              value={screenData.layoutDescription}
              onChange={(e) =>
                setScreenData({
                  ...screenData,
                  layoutDescription: e.target.value,
                })
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

export default UpdateScreenModal;
