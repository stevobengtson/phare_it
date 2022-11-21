const allRoles = {
  ROLE_USER: ['createLibrary'],
  ROLE_ADMIN: ['getUsers', 'manageUsers', 'getLibraries', 'manageLibraries'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
