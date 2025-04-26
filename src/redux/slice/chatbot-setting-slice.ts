import { createApi } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../lib/route"
import { baseQueryWithInterceptor } from "../../services/rtkService"

export type TChatBotSetting = {
  headerColor: string
  backgroundColor: string
  customizedMessages: string[]
  formPlaceholder: {
    name: string
    email: string
    phone: string
    submitButton: string
  }
  welcomeMessage: string
  missedChatTimer: {
    hour: string
    minute: string
    second: string
  }
}

const chatbotSettingAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "chatbot",
  tagTypes: ["ChatBotSetting"],
  endpoints: (builder) => ({
    // Get Chatbot Settings
    getChatBotDetails: builder.query<TChatBotSetting, void>({
      query: () => ROUTES.ChatBotSettingRoute,
      providesTags: ["ChatBotSetting"],
    }),

    // Update Chatbot Settings
    updateChatBot: builder.mutation<{ message: string }, TChatBotSetting>({
      query: (data) => ({
        url: ROUTES.ChatBotSettingRoute,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["ChatBotSetting"],
    }),
  }),
})

export const { useGetChatBotDetailsQuery, useUpdateChatBotMutation } =
  chatbotSettingAPI

export default chatbotSettingAPI
