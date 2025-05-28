export interface CountDTO {
  id: number;
  value: number;
  updatedAt: Date;
}

export interface CreateCountDTO {
  value: number;
}

export interface UpdateCountDTO {
  value: number;
}

export interface CountResponse {
  success: boolean;
  data?: CountDTO;
  error?: string;
}

export interface CountsResponse {
  success: boolean;
  data?: CountDTO[];
  error?: string;
}

