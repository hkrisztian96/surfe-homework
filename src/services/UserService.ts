import axios from 'axios'
import { User } from '../types/user'
import { GET_MOST_MENTIONED_USERS_URL, GET_USERS_URL } from '../utils/urls'

/**
 * Service that handles Challenge API user related actions.
 */
export class UserService {
  /**
   * Loads all users from the Challenge API.
   * @returns all users.
   */
  public getUsers = async () => {
    return await axios.get<User[]>(GET_USERS_URL)
  }

  /**
   * Loads the most mentioned users from the Challenge API.
   * @returns most mentioned users.
   */
  public getMostMentionedUsers = async () => {
    return await axios.get<User[]>(GET_MOST_MENTIONED_USERS_URL)
  }
}
