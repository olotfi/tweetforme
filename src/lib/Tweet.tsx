// Represents a tweet in this app (simple domain model)
export interface Tweet {
  id: string;
  content: string;
  status: 'submitted' | 'approved';
  uid: string;
  created: Date;
}

export enum TweetStatus {
  SUBMITTED = 'submitted',
  APPROVED = 'approved'
}
