export interface iTodo {
  uid: string;
  name: string;
  completed: boolean;
}

export type CompletedStatus = "All" | "Active" | "Completed";
