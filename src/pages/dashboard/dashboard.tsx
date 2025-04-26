import Header from "../../components/header"
import useDashboard from "../../hooks/chat/use-dashboard"
import "../../components/css/dashboard.css"
import ICON from "../../assets/active-option.svg"
import { getPostedDate, getRandomImage, getTimeElapsed } from "../../lib/utils"
import Button from "../../components/button"

const Dashboard = () => {
  const {
    inputText,
    activeMode,
    filteredList,
    handleSearchInput,
    handleActiveTab,
    handleTicketClick,
    mode,
    data,
    page,
    setPage,
  } = useDashboard()
  return (
    <>
      <Header title="Dashboard" />
      <div>
        <input
          type="text"
          name="search"
          title="Search"
          value={inputText}
          className="search-input"
          placeholder="Search for ticket"
          onChange={handleSearchInput}
        />
      </div>
      <div className="mode-wrapper-container">
        {mode?.map((item) => (
          <div
            key={item.id}
            className={`mode-wrapper ${
              activeMode === item.slug ? "active-mode" : ""
            }`}
            onClick={() => handleActiveTab(item.slug)}
          >
            {activeMode === item.slug && (
              <img src={ICON} alt="active-option" width={25} />
            )}
            {item.title}
          </div>
        ))}
      </div>

      {/* Ticket List */}
      <div className="ticket-list">
        {filteredList?.length > 0 ? (
          filteredList.map((ticket) => (
            <div key={ticket.leadID} className="ticket-item">
              <div className="ticket-body">
                <span className="ticket-dot" />
                <div className="ticket-header">
                  <div className="ticket-content">
                    <span className="ticket-id">Ticket #{ticket.ticketID}</span>
                    <div className="posted_at">
                      Posted at {getPostedDate(ticket.postedAt)}
                    </div>
                  </div>
                  <div className="ticket-content">
                    <div className="latest_message">{ticket.latestMessage}</div>
                    <div className="elapsed_time">
                      {getTimeElapsed(ticket.postedAt)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ticket-footer">
                <div className="ticket-details">
                  <img
                    src={getRandomImage()}
                    alt="userProfile"
                    width={35}
                    height={35}
                  />
                  <div className="ticket-text">
                    <div>{ticket.senderDetails.name}</div>
                    <div>{ticket.senderDetails.phone}</div>
                    <div>{ticket.senderDetails.email}</div>
                  </div>
                </div>
                <div
                  className="ticket-link"
                  onClick={() => handleTicketClick(ticket.leadID)}
                >
                  Open Ticket
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="ticket-empty">
            <div className="empty-text">No Tickets Available</div>
          </div>
        )}
      </div>

      {/* Pagination Wrapper */}
      <div className="pagination-wrapper">
        <Button
          size="sm"
          color="primary"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} of {data?.totalPages}
        </span>
        <Button
          size="sm"
          color="primary"
          disabled={page === data?.totalPages || data?.totalPages === 0}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default Dashboard
