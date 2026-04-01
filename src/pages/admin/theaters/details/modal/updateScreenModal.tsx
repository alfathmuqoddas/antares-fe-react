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
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { useApiMutation } from "@/hooks/useApiMutation";
import type { TScreenDto, TScreenResponseDto } from "./newScreenModal";

const UpdateScreenModal = ({
  screen,
}: {
  screen: TScreenDto & { id: string };
}) => {
  const [screenData, setScreenData] = useState(screen);

  const [open, setOpen] = useState(false);

  const { trigger, isMutating } = useApiMutation<
    TScreenResponseDto,
    any,
    TScreenDto
  >(`/screens/${screen.id}`, {
    method: "PATCH",
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (err) => {
      console.error("Screen data error:", err);
      alert("Error updating movie");
    },
  });

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    trigger(screenData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="underline underline-offset-2 font-semibold text-orange-500 hover:cursor-pointer">
          <PencilLine size={16} />
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
          <Button type="submit" onClick={handleUpdate} disabled={isMutating}>
            {isMutating ? "Processing..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateScreenModal;
