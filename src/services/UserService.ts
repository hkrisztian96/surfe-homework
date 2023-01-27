import axios from 'axios'
import { User } from '../types/user'
import { GET_USERS_URL } from '../utils/urls'

export class UserService {
  public getUsers = async () => {
    return await axios.get<User[]>(GET_USERS_URL)
  }
}
