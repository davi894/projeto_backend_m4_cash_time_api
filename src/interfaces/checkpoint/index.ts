interface ICheckpointPost {
  project_id: string;
  user_id: string;
  entry: string;
  output: string;
  day: string;
}

interface ICheckpointGEtId {
  project_id: string;
  user_id: string;
  checkpoint_id: string;
}

export { ICheckpointPost, ICheckpointGEtId };
