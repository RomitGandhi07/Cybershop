import { NotificationTypesEnum } from '@/enums/notification-types.enum';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Notification } from '../notification/notification';
import { ApiErrorResponse, ApiSuccessResponse, NotificationMessageSettings } from '@/interfaces';

// Create Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Refresh token function
const refreshToken = async (): Promise<string | null> => {
  try {
    const response: AxiosResponse<{ accessToken: string }> = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`);
    return response.data.accessToken;
  } catch (error) {
    Notification({
      type: NotificationTypesEnum.ERROR,
      message: 'Session expired, please log in again.',
    });
    return null;
  }
};

// API request function with retry on 401
const apiRequest = async <T = any>(
  config: AxiosRequestConfig,
  messageSettings?: NotificationMessageSettings
): Promise<ApiSuccessResponse | ApiErrorResponse> => {
  let originalRequest = config;

  try {
    const response: AxiosResponse<ApiSuccessResponse> = await api(originalRequest);

    if (response.data && response.data.success) {
      if (!messageSettings?.hideSuccessMessage) {
        Notification({
          type: NotificationTypesEnum.SUCCESS,
          message: messageSettings?.successMessage || response.data.message,
        });
      }
      return response.data;
    }

    throw new Error('Unexpected success response structure');
  } catch (error: any) {
    if (error.response?.status === 401) {
      const newToken = await refreshToken();

      if (newToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        //originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        try {
          const retryResponse: AxiosResponse<ApiSuccessResponse> = await api(originalRequest);

          if (retryResponse.data && retryResponse.data.success) {
            if (!messageSettings?.hideSuccessMessage) {
              Notification({
                type: NotificationTypesEnum.SUCCESS,
                message: messageSettings?.successMessage || retryResponse.data.message,
              });
            }
            return retryResponse.data;
          }
        } catch (retryError) {
          return handleApiError(retryError, messageSettings);
        }
      } else {
        return {
          success: false,
          statusCode: 401,
          message: 'Session expired, please log in again.',
        };
      }
    }

    return handleApiError(error, messageSettings);
  }
};

// Handle API errors
const handleApiError = (error: any, messageSettings?: NotificationMessageSettings): ApiErrorResponse => {
  const defaultErrorMessage = 'An error occurred';

  if (error.response) {
    const { data } = error.response;
    const errorMessage = messageSettings?.errorMessage || data?.message || defaultErrorMessage;

    if (!messageSettings?.hideErrorMessage) {
      Notification({
        type: NotificationTypesEnum.ERROR,
        message: errorMessage,
      });
    }

    data.message = errorMessage;

    return data;
  } else {
    const networkErrorMessage = messageSettings?.errorMessage || 'Network error or unexpected issue';

    if (!messageSettings?.hideErrorMessage) {
      Notification({
        type: NotificationTypesEnum.ERROR,
        message: networkErrorMessage,
      });
    }

    return {
      success: false,
      statusCode: 500,
      message: networkErrorMessage,
    };
  }
};

// GET method
const get = async <T = any>(
  {url, messageSettings}: {
    url: string,
    messageSettings?: NotificationMessageSettings
  }
  
) => {
  return apiRequest<T>({
    method: 'GET',
    url
  }, messageSettings);
};

// POST method
const post = async <T = any>( {url, data, messageSettings}: {
  url: string,
  data?: any,
  messageSettings?: NotificationMessageSettings
}
) => {
  return apiRequest<T>({
    method: 'POST',
    url,
    data: data ?? {},
  }, messageSettings);
};

// PUT method
const put = async <T = any>( {url, data, messageSettings}: {
  url: string,
  data?: any,
  messageSettings?: NotificationMessageSettings
}
) => {
  return apiRequest<T>({
    method: 'PUT',
    url,
    data: data ?? {},
  }, messageSettings);
};

// DELETE method
const del = async <T = any>( {url, messageSettings}: {
  url: string,
  messageSettings?: NotificationMessageSettings
}
) => {
  return apiRequest<T>({
    method: 'DELETE',
    url,
  }, messageSettings);
};

// Create http object with prefixed methods
const http = {
  get,
  post,
  put,
  delete: del,
};

export default http;
