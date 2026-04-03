export function normalizeResidentUser(user) {
  if (!user) {
    return null;
  }

  const fullName = user.fullName || user.name || "";
  const purok = user.purok || user.purokNumber || "";
  const mobile = user.mobile || user.contactNumber || "";

  return {
    ...user,
    fullName,
    name: user.name || fullName,
    purok,
    purokNumber: user.purokNumber || purok,
    mobile,
    contactNumber: user.contactNumber || mobile,
  };
}
