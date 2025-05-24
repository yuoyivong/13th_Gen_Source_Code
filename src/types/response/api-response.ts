// api response
interface APIResponse<T> {
  message: string;
  status: string;
  payload: T;
}

// expose interface type
export type { APIResponse };
