import DataLoader from 'dataloader';
import { User } from '../entities/User';

// Create loader for every request
// Pass in batch load function that takes in keys and returns data for keys
// keys: ["uuid1", "uuid2", "uuid3", "uuid3"] (userids)
// return [{id: "uuid1", ...rest},{id: "uuid2", ...rest}, {id: "uuid3", ...rest}] (userobjects)
// Also caches, so on 20 problems made by only two users, will only
// batch two creator queries
export const createUserLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await User.findByIds(userIds as string[]);
    const userIdToUser: Record<string, User> = {};
    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });

    // Return array of users
    return userIds.map((userId) => userIdToUser[userId]);
  });
