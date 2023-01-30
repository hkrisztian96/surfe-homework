import axios from 'axios'
import { User } from '../types/user'
import { GET_MOST_MENTIONED_USERS_URL, GET_USERS_URL } from '../utils/urls'

export class UserService {
  public getUsers = async () => {
    return await axios.get<User[]>(GET_USERS_URL)
  }

  public getMostMentionedUsers = async () => {
    return await axios.get<User[]>(GET_MOST_MENTIONED_USERS_URL)
  }
}
