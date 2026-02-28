export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface ResponseMeta {
  requestId?: string;
  duration?: number;
  pagination?: Omit<PaginatedResponse<unknown>, 'items'>;
}
