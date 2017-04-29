export interface IModelNode {
  id?: number;
  name: string;
  type: string;
  enum?: string[];
  min_length?: number;
  max_length?: number;
  pattern?: string;
  format?: string;
  multiple_of?: number;
  minimum?: number;
  maximum?: number;
  exclusive_minimum?: boolean;
  exclusive_maximum?: boolean;
  minimum_items?: number;
  maximum_items?: number;
  uniqueness?: boolean;
  required?: boolean;
  readonly?: boolean;

  children?: IModelNode[];
}
