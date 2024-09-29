export interface Column<T> {
  key: keyof T;
  display: string;
}
