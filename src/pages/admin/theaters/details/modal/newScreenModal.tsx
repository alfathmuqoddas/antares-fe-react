import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";

const NewScreenModal = ({ theaterId }: { theaterId: string }) => {
  const [screenForm, setScreenForm] = useState({
    name: "",
    capacity: 0,
    screenType: "",
    ticketPrice: 0,
    layoutDescription: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/screens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...screenForm,
          theaterId: theaterId,
        }),
      });
      const data = await res.json();
      setLoadingSubmit(false);
      alert(data.message);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setLoadingSubmit(false);
      alert("Error submitting movie");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus /> New Screen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Screen</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="theaterName" className="text-right mr-4">
              Name
            </Label>
            <Input
              id="screenName"
              placeholder="insert name"
              onChange={(e) =>
                setScreenForm({ ...screenForm, name: e.target.value })
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
              onChange={(e) =>
                setScreenForm({ ...screenForm, screenType: e.target.value })
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
              onChange={(e) =>
                setScreenForm({
                  ...screenForm,
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
              onChange={(e) =>
                setScreenForm({
                  ...screenForm,
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
              className="col-span-3"
              placeholder="insert address"
              onChange={(e) =>
                setScreenForm({
                  ...screenForm,
                  layoutDescription: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={loadingSubmit}>
            {loadingSubmit ? "Processing..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewScreenModal;
