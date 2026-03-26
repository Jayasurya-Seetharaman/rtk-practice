export type PropertyType = "Boolean" | "String" | "Integer";

export type GroupName = "JAVA" | "DATABASE" | "UI";

export interface Property {
  id: string;
  key: string;
  type: PropertyType;
  value: string;
  defaultValue: string;
  groupName: GroupName;
  description: string;
  status: boolean;
}
