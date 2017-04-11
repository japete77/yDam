export interface IAsset {
  id: {
    timestamp: number;
    machine: number;
    pid: number;
    increment: number;
    creationTime: string;
  };
  id_: string;
  creation_date: string;
  owner: string;
  group: string;
  permissions: number;
  asset_type: number;
  parent_folder: string[];
  model: any;
}
