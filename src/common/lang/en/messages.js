import error from './errors';
import validate from './validates';
import menu from './menu';

export default {
  error,
  validate,
  menu,
  app: {
    title: 'App',
    account: 'My account',
    settings: 'Settings',
    logOut: 'Logout'
  },
  login: {
    title: 'Login',
    user: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPass: 'Forgot password?',
    login: 'Login',
    noAccount: 'Dont have an account?',
    signUp: 'Signup here'
  },
  common: {
    add: 'Add',
    required: 'Required',
    cancel: 'Cancel',
    save: 'Save',
    rowsPage: 'Rows per page',
    updateList: 'Update list',
    filters: 'Filters/Search',
    of: 'of',
    active: 'Active',
    edit: 'Edit',
    status: 'State',
    actions: 'Actions'
  },
  entity: {
    title: 'Entities',
    add: 'Add new entity',
    crud: {
      edit: 'Edit',
      code: 'Code',
      acronym: 'Acronym',
      description: 'Description',
      status: 'Status',
      addEnt: 'Add entity',
      editEnt: 'Edit entity'
    }
  },
  account: {
    title: 'Accounts',
    add: 'Add new account',
    select: 'Choose an entity to see its accounts',
    crud: {
      edit: 'Edit',
      accountNumber: 'Account number',
      status: 'Status',
      entity: 'Entity',
      addAc: 'Add account',
      editAc: 'Edit account'
    }
  },
  user: {
    title: 'Users',
    add: 'Add new user',
    crud: {
      edit: 'Edit',
      user: 'User',
      userData: 'User info',
      entity: 'Entity',
      role: 'Role',
      status: 'Status',
      addUser: 'Add user',
      editUser: 'Edit user'
    }
  }
};
