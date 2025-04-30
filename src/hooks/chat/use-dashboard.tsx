/**
 * useDashboard – Custom hook for managing the dashboard state, including ticket filtering, mode switching, and search functionality.
 *
 * - Fetches a list of leads with pagination, filtered by ticket status using RTK Query.
 * - Filters tickets based on a search input (ticketID).
 * - Allows switching between different ticket modes (All, Resolved, Unresolved).
 * - Provides a function to handle navigating to the detailed chat view of a ticket.
 */

import { ChangeEvent, useMemo, useState } from "react"
import { useGetLeadListQuery } from "../../redux/slice/lead-slice"
import { useNavigate } from "react-router-dom"

const mode = [
  {
    id: 1,
    title: "All Tickets",
    slug: "All",
  },
  {
    id: 2,
    title: "Resolved Tickets",
    slug: "Resolved",
  },
  {
    id: 3,
    title: "UnResolved Tickets",
    slug: "Unresolved",
  },
]

const useDashboard = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [inputText, setInputText] = useState<string>("")
  const [activeMode, setActiveMode] = useState(mode[0].slug)

  const { data, isLoading } = useGetLeadListQuery(
    {
      limit: 5,
      page: page,
      status: activeMode,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const filteredList = useMemo(() => {
    let tempList = [...(data?.leadsList ?? [])]

    if (inputText !== "") {
      tempList = tempList?.filter((item) =>
        item.ticketID.toLowerCase().includes(inputText.toLowerCase())
      )
    }

    return tempList
  }, [data, inputText])

  // Function to handle Active Tab
  const handleActiveTab = (slug: string) => setActiveMode(slug)

  // Handle Search Input
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInputText(e.target.value)

  // Handle Ticket Click
  const handleTicketClick = (id: string) => navigate(`../chat/${id}`)

  return {
    inputText,
    activeMode,
    handleActiveTab,
    handleSearchInput,
    handleTicketClick,
    mode,
    isLoading,
    filteredList,
    data,
    page,
    setPage,
  }
}

export default useDashboard
