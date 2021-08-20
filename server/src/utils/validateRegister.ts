import { UsernamePasswordInput } from '../resolvers/types';

export const validateRegister = (options: UsernamePasswordInput) => {
  // Weak email validation, also validated on client
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'Invalid email'
      }
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'Length must be greater than 2'
      }
    ];
  }
  if (options.password.length <= 6) {
    return [
      {
        field: 'password',
        message: 'Length must be greater than 6'
      }
    ];
  }
  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'Username can not be email address'
      }
    ];
  }
  return null;
};
