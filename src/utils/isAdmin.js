const adminAccount = "0xb78b8053B701a8e83bE191431533090A51fbF7ED";

export function isAdmin(currentAccount) {
  if (adminAccount === currentAccount) {
    return true;
  } else {
    return false;
  }
}
