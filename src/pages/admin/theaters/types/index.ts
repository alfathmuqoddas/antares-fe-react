export type TScreenDto = {
  id: string;
  name: string;
  screenType: string;
  capacity: number;
  layoutDescription: string;
  hasSeats: boolean;
};

export type TTheaterDto = {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  screens: TScreenDto[];
};

export type TScreenResponseDto = {
  message: string;
};
