export type ITask = {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate?: number;
};
