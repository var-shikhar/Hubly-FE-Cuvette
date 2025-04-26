import axios from "axios"
import axiosInstance from "./axiosInstance"

type TAxiosService = {
  route: string
  data: Record<string, unknown> | FormData
  isFormData?: boolean
}

export const apiService = {
  get: async (route: string) => {
    try {
      const response = await axiosInstance.get(route)
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        )
      }
      return Promise.reject({ message: "An unexpected error occurred" })
    }
  },

  post: async <T>(route: string, data: T, isFormData = false) => {
    try {
      const headers = isFormData
        ? { "Content-Type": "multipart/form-data" }
        : {}

      const response = await axiosInstance.post(route, data, { headers })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        )
      }
      return Promise.reject({ message: "An unexpected error occurred" })
    }
  },

  put: async ({ route, data, isFormData = false }: TAxiosService) => {
    try {
      const headers = isFormData
        ? { "Content-Type": "multipart/form-data" }
        : {}

      const response = await axiosInstance.put(route, data, { headers })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        )
      }
      return Promise.reject({ message: "An unexpected error occurred" })
    }
  },

  patch: async ({ route, data, isFormData = false }: TAxiosService) => {
    try {
      const headers = isFormData
        ? { "Content-Type": "multipart/form-data" }
        : {}

      const response = await axiosInstance.patch(route, data, { headers })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        )
      }
      return Promise.reject({ message: "An unexpected error occurred" })
    }
  },

  delete: async (route: string) => {
    try {
      const response = await axiosInstance.delete(route)
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(
          error.response?.data || { message: "Unknown error" }
        )
      }
      return Promise.reject({ message: "An unexpected error occurred" })
    }
  },
}
