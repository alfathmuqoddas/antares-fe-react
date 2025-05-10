export const formatTime = (dateString: string) => {
  //convert from utc to local time
  const date = new Date(dateString);
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60 * 1000
  );

  //format the date to display the hh:mm
  const formattedDate = localDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedDate;
};
