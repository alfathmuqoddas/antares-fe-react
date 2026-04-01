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
import { Plus } from "lucide-react";
import { useState } from "react";
import { useApiMutation } from "@/hooks/useApiMutation";
import type { TTheaterDto } from "../types";

const NewTheaterModal = () => {
  const [theaterForm, setTheaterForm] = useState<Partial<TTheaterDto>>({
    name: "",
    state: "",
    city: "",
    zip: "",
    address: "",
  });
  const { trigger, isMutating } = useApiMutation<
    { message: string },
    any,
    Partial<TTheaterDto>
  >(`/theaters`, {
    method: "POST",
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (err) => {
      console.error("Screen data error:", err);
      alert("Error submitting movie");
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    trigger(theaterForm);
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
          <Button type="submit" onClick={handleSubmit} disabled={isMutating}>
            {isMutating ? "Processing..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTheaterModal;
