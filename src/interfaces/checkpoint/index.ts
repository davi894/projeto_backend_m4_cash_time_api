interface ICheckpointPost {
  project_id: string;
  user_id: string;
  entry: string;
  output?: string;
  date: string;
}

interface ICheckpointGEtId {
  checkpoint_id: string;
}

interface ICheckPointInterval {
  initialRange: string;
  finalInterval: string;
  project_id: string;
  user_id: string;
}

interface ICheckinRequest {
  entry: string;
  output?: string;
  date: string;
}

interface ICheckinRequestUpdate {
  project_id?: string;
  output?: string;
  checkpoint_id?: string;
}

export {
  ICheckpointPost,
  ICheckpointGEtId,
  ICheckPointInterval,
  ICheckinRequest,
  ICheckinRequestUpdate,
};
