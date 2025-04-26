import { createApi } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../lib/route"
import { baseQueryWithInterceptor } from "../../services/rtkService"

export type TUserSetting = {
  userID: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export type TMember = {
  userId: string
  userName: string
  userPhone: string
  userEmail: string
  userRole: string
}

export type TMemberForm = {
  name: string
  email: string
  designation: string
}

const memberAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "member",
  tagTypes: ["MemberDetail", "MemberList", "AssigneeList"],
  endpoints: (builder) => ({
    // Get Members Listc
    getMemberList: builder.query<TMember[], void>({
      query: () => ROUTES.MemberRoute,
      providesTags: ["MemberList"],
    }),

    // Get Member Details by ID
    getMemberDetail: builder.query<TUserSetting, { id: string }>({
      query: (data) => `${ROUTES.MemberRoute}/${data.id}`,
      providesTags: ["MemberDetail"],
    }),

    // Add New Member
    addMember: builder.mutation<{ message: string }, TMemberForm>({
      query: (data) => ({
        url: ROUTES.MemberRoute,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MemberList"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID()

        const addResult = dispatch(
          memberAPI.util.updateQueryData(
            "getMemberList",
            undefined,
            (draft) => {
              draft.unshift({
                userId: tempId, // temp ID
                userName: data.name,
                userPhone: "N/A",
                userEmail: data.email,
                userRole: data.designation,
              })
            }
          )
        )

        try {
          await queryFulfilled
          // Force Refetch
          dispatch(
            memberAPI.endpoints.getMemberList.initiate(undefined, {
              forceRefetch: true,
            })
          )
        } catch {
          addResult.undo()
        }
      },
    }),

    // Update Member Details
    updateMember: builder.mutation<{ message: string }, TUserSetting>({
      query: (data) => ({
        url: `${ROUTES.MemberRoute}/${data.userID}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["MemberDetail"],
    }),

    // Delete Member By ID
    deleteMember: builder.mutation<{ message: string }, { id: string }>({
      query: (data) => ({
        url: `${ROUTES.MemberRoute}/${data.id}`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["MemberList"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          memberAPI.util.updateQueryData(
            "getMemberList",
            undefined,
            (draft) => {
              const foundIdx = draft.findIndex((el) => el.userId === data.id)
              if (foundIdx !== -1) draft.splice(foundIdx, 1)
            }
          )
        )
        try {
          await queryFulfilled
          // Force Refetch
          dispatch(
            memberAPI.endpoints.getMemberList.initiate(undefined, {
              forceRefetch: true,
            })
          )
        } catch {
          deleteResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetMemberListQuery,
  useGetMemberDetailQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = memberAPI

export default memberAPI
