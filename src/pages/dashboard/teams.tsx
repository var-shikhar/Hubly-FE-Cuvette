import PLUS_ICON from "../../assets/circle-plus.svg"
import DELETE_ICON from "../../assets/delete.svg"
import EDIT_ICON from "../../assets/edit-1.svg"
import SORT_ICON from "../../assets/sort.svg"
import Button from "../../components/button"
import "../../components/css/team.css"
import Modal from "../../components/dialog"
import MemberForm from "../../components/form/member"
import Header from "../../components/header"
import LoadingSpinner from "../../components/spinner"
import useTeamHook from "../../hooks/team/use-team"
import { getRandomImage } from "../../lib/utils"

const Teams = () => {
  const {
    handleDelete,
    handleNavigate,
    handleToggle,
    filteredList,
    isLoading,
    handleSort,
    handleSelectUser,
    isDeleting,
    modalToggle,
    setModalToggle,
    mode,
    user,
  } = useTeamHook()

  if (isLoading || isDeleting) return <LoadingSpinner />
  return (
    <div>
      <Header title="Team Members" />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <div className="d-flex align-items-center gap-2">
                  <span>Full Name</span>
                  <img
                    src={SORT_ICON}
                    alt="sort"
                    width={15}
                    height={15}
                    className="pointer"
                    onClick={handleSort}
                  />
                </div>
              </th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList?.length > 0 ? (
              filteredList.map((item) => (
                <tr key={item.userId}>
                  <td>
                    <img
                      src={getRandomImage()}
                      alt="userProfile"
                      width={35}
                      height={35}
                    />
                  </td>
                  <td>{item.userName}</td>
                  <td>{item.userPhone}</td>
                  <td>{item.userEmail}</td>
                  <td>{item.userRole}</td>
                  {item.userRole !== "Admin" ? (
                    <td>
                      <span className="edit-btn">
                        <img
                          src={EDIT_ICON}
                          alt={"edit-profile"}
                          width={15}
                          height={15}
                          onClick={() => handleNavigate(item.userId)}
                        />
                        <img
                          src={DELETE_ICON}
                          alt={"delete-profile"}
                          width={15}
                          height={15}
                          onClick={() =>
                            handleSelectUser(item.userId, "Delete")
                          }
                        />
                      </span>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {user?.isAdmin && (
        <Button
          type="button"
          onClick={() => handleSelectUser("", "Create")}
          icon={PLUS_ICON}
          className="add-btn"
        >
          Add New Member
        </Button>
      )}
      <Modal
        open={modalToggle}
        onClose={() => setModalToggle(false)}
        title={mode === "Delete" ? "Delete Member" : "Create New Member"}
        size={mode === "Delete" ? "small" : "medium"}
      >
        {mode === "Delete" ? (
          <div className="delete-wrapper">
            <div>This team member will get deleted permanently.</div>
            <span>
              <Button
                type="button"
                size="sm"
                color="secondary"
                onClick={handleToggle}
              >
                Close
              </Button>
              <Button type="button" size="sm" onClick={handleDelete}>
                Confirm
              </Button>
            </span>
          </div>
        ) : (
          <MemberForm handleConfirmation={handleToggle} />
        )}
      </Modal>
    </div>
  )
}

export default Teams
