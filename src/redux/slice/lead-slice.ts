import { createApi } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../lib/route"
import { baseQueryWithInterceptor } from "../../services/rtkService"

// Dashboard Page Types
export type TLead = {
  leadID: string
  ticketID: string
  latestMessage: string
  postedAt: string
  senderDetails: {
    name: string
    email: string
    phone: string
  }
  status: string
}
export type TLeadResponse = {
  totalLeads: number
  totalPages: number
  currentPage: number
  limit: number
  leadsList: TLead[]
}

// End User Conversation Types
export type TUserConversation = {
  leadID: string
  userName: string
  userPhone: string
  userEmail: string
  isFirstMessageShared: boolean
  detailsShared: boolean
  status: string
  conversation: {
    id: string
    message: string
    sendBy: "Lead" | "Member"
  }[]
}
export type TUserForm = {
  leadID: string
  name: string
  email: string
  phone: string
}

// Chat Page Types
export type TChatList = {
  leadID: string
  ticketID: string
  latestMessage: string
  userName: string
  userPhone: string
  userEmail: string
  status: string
  isMissedChat: boolean
  isCurrentAssignee: boolean
  assigneeName: string
  postedAt: string
  assigneeList: {
    userID: string
    userName: string
  }[]
}

export type TConversation = {
  id: string
  message: string
  sendBy: string
  senderName: string
}

export type TAssignee = {
  userID: string
  userName: string
}

// Lead Analytics
export type TLeadAnalytics = {
  totalLeads: number
  totalResolvedLeads: number
  averateResponseTime: number
  leadGraph: number[]
}

const leadAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "lead",
  tagTypes: [
    "LeadList",
    "LeadDetails",
    "UserConversation",
    "ChatList",
    "ChatDetails",
    "AssigneeList",
    "LeadAnalytics",
  ],
  endpoints: (builder) => ({
    // Get Chatbot Settings
    getLeadList: builder.query<
      TLeadResponse,
      { page?: number; limit?: number; status: string }
    >({
      query: ({ page = 1, limit = 10, status }) => ({
        url: `${ROUTES.ChatRoute}`,
        params: { page, limit, status },
      }),
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.status !== previousArg?.status ||
          currentArg?.page !== previousArg?.page ||
          currentArg?.limit !== previousArg?.limit
        )
      },
      providesTags: ["LeadList"],
    }),

    // Get Conversation For End User
    getUserConversation: builder.query<TUserConversation, string>({
      query: (id) => `${ROUTES.LeadRoute}/${id}`,
      providesTags: ["UserConversation"],
    }),

    // Post New Conversation
    postNewConversation: builder.mutation<
      { leadID: string },
      { message: string }
    >({
      query: (data) => ({
        url: ROUTES.LeadRoute,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["UserConversation"],
    }),

    // Post User Details Form
    postUserForm: builder.mutation<{ message: string }, TUserForm>({
      query: (data) => ({
        url: ROUTES.LeadFormRoute,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["UserConversation"],
    }),

    // Put User Messages
    putUserMessage: builder.mutation<
      { message: string },
      {
        leadID: string
        message: string
      }
    >({
      query: (data) => ({
        url: ROUTES.LeadRoute,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["UserConversation"],
    }),

    // Chat Page Endpoints
    getChatList: builder.query<TChatList[], void>({
      query: () => ROUTES.TicketRoute,
      providesTags: ["ChatList"],
    }),

    // Get Chat Conversations
    getChatDetail: builder.query<TConversation[], string>({
      query: (leadID) => `${ROUTES.TicketRoute}/${leadID}`,
      providesTags: ["ChatDetails"],
    }),

    // Get Assignee List
    getAssigneeList: builder.query<TAssignee[], string>({
      query: (leadID) => `${ROUTES.TicketAssigneeRoute}/${leadID}`,
      providesTags: ["AssigneeList"],
    }),

    // Put Status Update
    putChatStatus: builder.mutation<
      { message: string },
      { leadID: string; status: string }
    >({
      query: (data) => ({
        url: ROUTES.TicketStatusRoute,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ChatList"],
    }),

    // Assignee Update
    putAssignee: builder.mutation<
      { message: string },
      { leadID: string; assigneeID: string }
    >({
      query: (data) => ({
        url: ROUTES.TicketAssigneeRoute,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ChatList", "AssigneeList"],
    }),

    // Post Message
    putMessage: builder.mutation<
      { message: string },
      { leadID: string; message: string }
    >({
      query: (data) => ({
        url: ROUTES.TicketRoute,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ChatDetails"],
    }),

    // Analytics Data
    getLeadAnalytics: builder.query<TLeadAnalytics, void>({
      query: () => ROUTES.AnalyticsRoute,
      providesTags: ["LeadAnalytics"],
    }),
  }),
})

export const {
  useGetLeadListQuery,
  useGetUserConversationQuery,
  usePostNewConversationMutation,
  usePostUserFormMutation,
  usePutUserMessageMutation,
  // Chat Page Endpoints
  useGetChatListQuery,
  useGetChatDetailQuery,
  useGetAssigneeListQuery,
  usePutChatStatusMutation,
  usePutAssigneeMutation,
  usePutMessageMutation,

  // Analytics
  useGetLeadAnalyticsQuery,
} = leadAPI

export default leadAPI
