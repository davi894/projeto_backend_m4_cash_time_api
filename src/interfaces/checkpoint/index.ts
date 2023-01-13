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
