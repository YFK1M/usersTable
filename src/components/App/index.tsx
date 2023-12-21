import UserTable from '../UserTable'
import ky from 'ky'
import { setUsers, User } from '../../store/usersSlice.ts'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import s from './index.module.sass'

const App = () => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ky.get('http://localhost:5173/users.json')
        const data: User[] = await response.json()
        dispatch(setUsers(data))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    
    fetchData()
  }, [dispatch])

  return (
    <main className={s.main}>
      <UserTable/>
    </main>
  )
}

export default App
