import { Hotel } from "../../domain/hotel.model";

export interface HotelsDto {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Hotel[];
}
