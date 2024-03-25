export interface IData {
  id: string;
  title: string;
  created_at: string | Date;
  expiration_date: string | Date;
  isFavorite?: boolean;
  time_left?: string;
}
