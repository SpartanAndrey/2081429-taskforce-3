export const MAX_USER_SPECIALIZATION_NUMBER = 5;

export const enum UserFieldLength {
  MinUser = 3,
  MaxUser = 50,
  MinPassword = 6,
  MaxPassword = 12,
  MaxUserInfo = 300,
}

export const enum UserValidation {
  AuthUserEmailNotValid = 'The email is not valid.',
  AuthUserDateBirthNotValid = 'The user date birth is not valid.',
  AuthUserNameLength = `User name length shall be between ${UserFieldLength.MinUser} and ${UserFieldLength.MaxUser} chars.`,
  AuthUserPasswordLength = `User password length shall be between ${UserFieldLength.MinPassword} and ${UserFieldLength.MaxPassword} chars.`,
  AuthUserInfoLength = `User info length shall no more than ${UserFieldLength.MaxUserInfo} chars.`,
  AuthUserMaxSpecializationNumber = `User specialization number shall no more than ${MAX_USER_SPECIALIZATION_NUMBER}.`
}

export const enum UserException {
  AuthUserForbidden = 'Access is denied.',
  AuthUserExist = 'User with this email exists.',
  AuthUserNotFound = 'User not found.',
  AuthUserPasswordWrong = 'User password is wrong.'
}
