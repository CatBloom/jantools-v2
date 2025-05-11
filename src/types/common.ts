export interface Column<T> {
  key: Extract<keyof T, string>;
  display: string;
}

export interface JWT {
  sub: string;
  exp: number;
}

export type TokenStorage = {
  [id: string]: string;
};
