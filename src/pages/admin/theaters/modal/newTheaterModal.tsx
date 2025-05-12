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

const NewTheaterModal = () => {
  const [theaterForm, setTheaterForm] = useState({
    name: "",
    state: "",
    city: "",
    zip: "",
    address: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/theaters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...theaterForm,
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
          <Plus /> New Theater
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Theater</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="theaterName" className="text-right mr-4">
              Name
            </Label>
            <Input
              id="theaterName"
              className="col-span-3"
              placeholder="insert name"
              onChange={(e) =>
                setTheaterForm({ ...theaterForm, name: e.target.value })
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
              placeholder="insert state"
              onChange={(e) =>
                setTheaterForm({ ...theaterForm, state: e.target.value })
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
              placeholder="insert city"
              onChange={(e) =>
                setTheaterForm({ ...theaterForm, city: e.target.value })
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
              placeholder="insert zip code"
              onChange={(e) =>
                setTheaterForm({ ...theaterForm, zip: e.target.value })
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
              onChange={(e) =>
                setTheaterForm({ ...theaterForm, address: e.target.value })
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

export default NewTheaterModal;
