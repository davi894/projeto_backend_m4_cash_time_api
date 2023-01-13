import * as yup from "yup";
import { SchemaOf, ArraySchema, object } from "yup";

import { ICheckpointPost, ICheckpointGEtId } from "../../interfaces/checkpoint";

const serializerReqCheckinPost: SchemaOf<ICheckpointPost> = object({
  project_id: yup.string().required(),
  user_id: yup.string().required(),
  entry: yup.string().required(),
  output: yup.string().notRequired(),
  date: yup.string().required(),
});

const serializerReqCheckinGetId: SchemaOf<ICheckpointGEtId> = object({
  project_id: yup.string().required(),
  user_id: yup.string().required(),
  checkpoint_id: yup.string().required(),
});

export { serializerReqCheckinGetId, serializerReqCheckinPost };
