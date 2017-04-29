import { IModelNode } from 'app/models/model-node';

export interface IMetadataModel {
  id: string;
  type: string;
  asset: IModelNode;
}

export interface IObject {
  timestamp: number;
  machine: number;
  pid: number;
  increment: number;
  creationTime: string;
}
