export interface APIResponse<T> {
  message: string;
  status: string | number;
  payload: T;
}
