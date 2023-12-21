import Modal from 'react-modal'
import { updateUser, User } from '../../store/usersSlice.ts'
import { useDispatch } from 'react-redux'
import s from './index.module.sass'

interface UserModalProps {
	modalIsOpen: boolean
  setIsOpen: (modalIsOpen: boolean) => void
	editingUser: User | null
	setEditingUser: (editingUser: User | null) => void
}

const UserModal = ({ modalIsOpen, editingUser, setEditingUser, setIsOpen }: UserModalProps) => {
  const dispatch = useDispatch()
	
  const closeModal = () => {
    setIsOpen(false)
    setEditingUser(null)
  }
  const saveChanges = () => {
    if (editingUser) {
      dispatch(updateUser(editingUser))
      closeModal()
    }
  }
	
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Edit User Modal"
      className={s.modal}
    >
      {editingUser && (
        <div>
          <h2>Edit User</h2>
          <form>
            <label>
              {'Full Name:'}
              <input
                type="text"
                value={editingUser.fullName}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, fullName: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              {'Username:'}
              <input
                type="text"
                value={editingUser.username}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, username: e.target.value })
                }
              />
            </label>
            <br />
            <label className={s.blocked}>
              {'Blocked:'}
              <input
                type="checkbox"
                checked={editingUser.isBlocked}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, isBlocked: e.target.checked })
                }
              />
            </label>
            <br />
            <label>
              {'Registration Date:'}
              <input
                type="text"
                value={editingUser.registrationDate}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    registrationDate: e.target.value,
                  })
                }
              />
            </label>
            <br />
            <label>
              {'Last Login Date:'}
              <input
                type="text"
                value={editingUser.lastLoginDate}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, lastLoginDate: e.target.value })
                }
              />
            </label>
            <br />
            <button type="button" onClick={saveChanges}>
              {'Save'}
            </button>
            <button type="button" onClick={closeModal} className={s.cancel}>
              {'Cancel'}
            </button>
          </form>
        </div>
      )}
    </Modal>
  )
}

export default UserModal