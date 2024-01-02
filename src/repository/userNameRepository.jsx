const USER_NAME = "useName";

export const userNameRepository = {
  getUserName() {
    return localStorage.getItem(USER_NAME);
  },

  setUserName(userName) {
    localStorage.setItem(USER_NAME, userName);
  },
};
