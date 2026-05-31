export type JobStatus = "OPEN" | "CLOSED";

export type ApplicationStage = "APPLIED" | "INTERVIEW" | "HIRED";

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  status: JobStatus;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}
