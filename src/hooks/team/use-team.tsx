import { startTransition, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { showToast } from "../../lib/utils"
import {
  useDeleteMemberMutation,
  useGetMemberListQuery,
} from "../../redux/slice/member-slice"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

type TModeType = "Edit" | "Delete" | "Create"

const useTeamHook = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.user)
  const { data: memberList, isLoading } = useGetMemberListQuery()
  const [deleteFunction, { isLoading: isDeleting }] = useDeleteMemberMutation()

  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc")
  const [modalToggle, setModalToggle] = useState(false)
  const [mode, setMode] = useState<TModeType | null>(null)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const filteredList = useMemo(() => {
    let tempList = [...(memberList ?? [])]

    tempList = tempList?.sort((a, b) => {
      if (sortBy === "asc") {
        return a.userName.localeCompare(b.userName)
      }
      return b.userName.localeCompare(a.userName)
    })

    return tempList
  }, [memberList, sortBy])

  // Handle Sorting
  function handleSort() {
    startTransition(() => {
      setSortBy((prev) => (prev === "asc" ? "desc" : "asc"))
    })
  }

  // Handle Profile Navigation
  function handleNavigate(id: string) {
    navigate(`./${id}`)
  }

  // Handle User Selection
  function handleSelectUser(id: string, mode: TModeType) {
    startTransition(() => {
      setSelectedUser(id)
      setMode(mode)
      mode !== "Edit" && setModalToggle(true)
    })
  }

  // Handle Toggle
  function handleToggle() {
    setModalToggle((prev) => !prev)
  }

  // Handle Deletion
  async function handleDelete() {
    try {
      if (!selectedUser) {
        showToast("Member not selected", "warning")
        return
      }
      await deleteFunction({ id: selectedUser }).unwrap()
      showToast("Member deleted successfully", "success")
    } catch (error) {
      console.error("Error deleting member:", error)
    } finally {
      setModalToggle(false)
    }
  }

  return {
    filteredList,
    handleSort,
    handleNavigate,
    handleSelectUser,
    handleToggle,
    handleDelete,
    isLoading,
    isDeleting,
    modalToggle,
    setModalToggle,
    mode,
    user,
  }
}

export default useTeamHook
