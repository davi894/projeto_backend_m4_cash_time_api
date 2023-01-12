interface ICheckinRequest {
  entry: string;
  exit?: string;
  date: string;
  user_id: string;
  project_id: string;
}

interface ICheckinRequestUpdate {
  entry?: string;
  exit?: string;
  date?: string;
}

export { ICheckinRequest, ICheckinRequestUpdate };
