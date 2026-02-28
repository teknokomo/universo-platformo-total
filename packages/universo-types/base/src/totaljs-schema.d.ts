// Type definitions for Total.js v5 Schema
export interface SchemaDefinition {
  [field: string]: SchemaFieldType;
}

export type SchemaFieldType =
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Date'
  | 'UID'
  | 'Email'
  | string;

export interface SchemaValidationResult {
  isValid: boolean;
  errors: string[];
  data: Record<string, unknown>;
}
