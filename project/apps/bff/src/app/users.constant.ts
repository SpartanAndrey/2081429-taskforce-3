export const minUserLength = 3;
export const maxUserLength = 50;

export const minPasswordLength = 6;
export const maxPasswordLength = 12;

export const maxUserInfoLength = 300;

export const maxUserSpecializationNumber = 5;

export const AUTH_USER_FORBIDDEN = 'Access is denied.';
export const AUTH_USER_EXISTS = 'User with this email exists.';
export const AUTH_USER_NOT_FOUND = 'User not found.';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong.';
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid.';
export const AUTH_USER_DATE_BIRTH_NOT_VALID = 'The user date birth is not valid.';
export const AUTH_USER_NAME_LENGTH = `User name length shall be between ${minUserLength} and ${maxUserLength} chars.`;
export const AUTH_USER_PASSWORD_LENGTH = `User password length shall be between ${minPasswordLength} and ${maxPasswordLength} chars.`;
export const AUTH_USER_INFO_LENGTH = `User info length shall no more than ${maxUserInfoLength} chars.`;
export const AUTH_USER_SPECIALIZATION_NUMBER = `User specialization number shall no more than ${maxUserSpecializationNumber}.`;
