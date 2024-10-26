export interface Column<T> {
  key: Extract<keyof T, string>;
  display: string;
}
