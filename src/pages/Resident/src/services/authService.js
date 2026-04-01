// Resident authentication service.
// This frontend-only version stores users and sessions in localStorage
// so the sign-in and sign-up screens already behave like a real app.

import { STORAGE_KEYS } from "../utils/constants.js";
import { normalizeText, uid } from "../utils/helpers.js";
import { readStorage, removeStorage, writeStorage } from "./storageService.js";

function getUsers() {
  return readStorage(STORAGE_KEYS.users, []);
}

function saveUsers(users) {
  writeStorage(STORAGE_KEYS.users, users);
}

function createSession(userId) {
  writeStorage(STORAGE_KEYS.session, {
    userId,
    createdAt: new Date().toISOString()
  });
}

export function getCurrentResident() {
  const session = readStorage(STORAGE_KEYS.session, null);
  if (!session?.userId) {
    return null;
  }

  return getUsers().find((user) => user.id === session.userId) || null;
}

export function isResidentEmailTaken(emailAddress) {
  const normalizedEmail = normalizeText(emailAddress).toLowerCase();
  return getUsers().some((user) => user.email.toLowerCase() === normalizedEmail);
}

export function signInResident({ email, password }) {
  const normalizedEmail = normalizeText(email).toLowerCase();

  const user = getUsers().find((entry) => entry.email.toLowerCase() === normalizedEmail);

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password.");
  }

  createSession(user.id);
  return user;
}

export function signUpResident({ fullName, purok, email, mobileNumber, password }) {
  const users = getUsers();
  const normalizedEmail = normalizeText(email).toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error("That email address is already registered.");
  }

  const newUser = {
    id: uid("resident"),
    fullName: normalizeText(fullName),
    purok,
    email: normalizedEmail,
    mobileNumber: normalizeText(mobileNumber),
    password,
    role: "resident",
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  createSession(newUser.id);
  return newUser;
}

export function signOutResident() {
  removeStorage(STORAGE_KEYS.session);
}
