import dayjs from "dayjs";
import { useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DateSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Get current date from URL or default to today
  const selectedDate = searchParams.get("date") || dayjs().format("DD-MM-YYYY");

  // 2. Generate the next 7 days
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = dayjs().add(i, "day");
    return {
      label: date.format("ddd, D MMM YYYY"),
      value: date.format("DD-MM-YYYY"),
    };
  });

  // 3. Update the URL when a new date is selected
  const handleSelect = (value: string) => {
    searchParams.set("date", value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-2 w-[240px] mb-8">
      <Select value={selectedDate} onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a date" />
        </SelectTrigger>
        <SelectContent>
          {days.map((day) => (
            <SelectItem key={day.value} value={day.value}>
              {day.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
