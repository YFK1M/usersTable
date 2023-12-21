import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { deleteUser, User } from '../../store/usersSlice'
import UserFilter from '../UserFilter'
import UserModal from '../UserModal';
import s from './index.module.sass'

const UserTable = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: RootState) => state.user.users)
  const [filter, setFilter] = useState<string>('')
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [modalIsOpen, setIsOpen] = useState(false)
  
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(filter.toLowerCase()) ||
      user.username.toLowerCase().includes(filter.toLowerCase())
  );
  
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0
    const fieldA = a[sortField as keyof typeof a]
    const fieldB = b[sortField as keyof typeof b]
    
    if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1
    if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1
    return 0
  })
  
  const handleSort = (field: string) => {
    setSortField(field)
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'))
  }
  
  const handleEditUser = (user: User) => {
    setEditingUser(user)
    openModal()
  }
  
  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id))
  }
  
  const openModal = ()=> {
    setIsOpen(true)
  }
  
  return (
    <div>
      <UserFilter filter={filter} setFilter={setFilter} />
      <table className={s.userTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort('fullName')}>Full Name</th>
            <th onClick={() => handleSort('username')}>Username</th>
            <th onClick={() => handleSort('registrationDate')}>Registration Date</th>
            <th onClick={() => handleSort('lastLoginDate')}>Last Login Date</th>
            <th onClick={() => handleSort('isBlocked')}>Blocked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
              <td>{user.registrationDate}</td>
              <td>{user.lastLoginDate}</td>
              <td>{user.isBlocked ? 'Blocked' : 'Not Blocked'}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
    </div>
  )
}

export default UserTable