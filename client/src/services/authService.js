const USER_KEY = 'talentforge_current_user';
const USERS_KEY = 'talentforge_users';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUsers() {
  return loadUsers();
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function saveUser(user) {
  if (!user) return;

  const normalizedEmail = user.email.trim().toLowerCase();
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  const users = loadUsers();
  const existing = users.find((item) => item.id === user.id || item.email.toLowerCase() === normalizedEmail);
  const updated = existing
    ? users.map((item) => (item.id === existing.id ? user : item))
    : [user, ...users];

  saveUsers(updated);
}

export function updateUser(user) {
  saveUser(user);
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}

export async function register({ fullName, email, password, role, companyName }) {
  const users = loadUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((item) => item.email.toLowerCase() === normalizedEmail)) {
    throw new Error('An account with this email already exists.');
  }

  const newUser = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
    companyName: role === 'recruiter' ? (companyName?.trim() || '') : null,
    role,
    profileCompleted: false,
    token: `mock-jwt-${Date.now()}`,
    profile: {
      picture: '',
      coverPhoto: '',
      mobile: '',
      location: '',
      dob: '',
      gender: '',
      college: '',
      degree: '',
      branch: '',
      cgpa: '',
      graduationYear: '',
      skills: [],
      linkedIn: '',
      github: '',
      portfolio: '',
      resume: '',
      hobbies: '',
      interests: '',
      certifications: '',
      projects: '',
      experience: '',
      about: ''
    }
  };

  saveUsers([newUser, ...users]);
  saveUser(newUser);
  return newUser;
}

export async function login({ email, password }) {
  const users = loadUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((item) => item.email.toLowerCase() === normalizedEmail);

  if (!user) {
    throw new Error('No account found for that email.');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password.');
  }

  saveUser(user);
  return user;
}
