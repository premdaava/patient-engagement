export interface SessionPayload {
  userId: string;
  email: string;
  role: "admin" | "staff" | "viewer";
}

export interface FormActionState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[] | string | undefined>;
  fields?: Record<string, string | boolean | undefined>;
}

