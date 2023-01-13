<<<<<<< HEAD
interface ICheckpointPost {
  project_id: string;
  user_id: string;
  entry: string;
  output?: string;
  date: string;
}

interface ICheckpointGEtId {
  project_id: string;
  user_id: string;
  checkpoint_id: string;
}

interface ICheckPointInterval {
  initialRange: string;
  finalInterval: string;
  project_id: string;
  user_id: string;
}

export { ICheckpointPost, ICheckpointGEtId, ICheckPointInterval };
=======
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
>>>>>>> f0c7a43b5eb1667345dff08151fbec0c1e9441fc
