import type { AxiosErrorType, ApiError } from "./api-error-types";

export const handleApiError = (errorData: ApiError): string => {
  // Handle Validation Errors
  if (errorData.errors && Array.isArray(errorData.errors)) {
    const validationMessages = errorData.errors
      .map((error) => error.message)
      .join(", ");

    return validationMessages;
  }

  // Handle General Errors Messages
  return errorData.message || "Terjadi kesalahan. Silahkan coba lagi.";
};

export const parseApiError = async (response: Response): Promise<string> => {
  try {
    const errorData: ApiError = await response.json();
    return handleApiError(errorData);
  } catch {
    return "Terjadi kesalahan. Silahkan coba lagi.";
  }
};

// for axios errors handling
export const handleAxiosError = (error: AxiosErrorType): string => {
  // handle errors response
  if (error.response?.data) {
    const errorData: ApiError = error.response.data;
    return handleApiError(errorData);
  }

  // handle network errors
  if (error.code === "ECONNABORTED") {
    return "Request timed out. Silahkan coba lagi.";
  }

  if (error.message === "Network Error") {
    return "Tidak dapat terhubung ke server. Silahkan cek kembali koneksi internet anda.";
  }

  // fallback
  return error.message || "Terjadi kesalahan. Silahkan coba lagi.";
};
