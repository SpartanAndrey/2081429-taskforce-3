export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';


export const minTitleLength = 20;
export const maxTitleLength = 50;

export const minDescriptionLength = 100;
export const maxDescriptionLength = 1024;

export const minAddressLength = 10;
export const maxAddressLength = 255;

export const minTagLength = 3;
export const maxTagLength = 10;
export const taskTagNumber = 5;

export const TASK_TITLE_LENGTH = `Task title length shall be between ${minTitleLength} and ${maxTitleLength} chars.`
export const TASK_DESCRIPTION_LENGTH = `Task description length shall be between ${minDescriptionLength} and ${maxDescriptionLength} chars.`
export const TASK_ADDRESS_LENGTH = `Task address length shall be between ${minAddressLength} and ${maxAddressLength} chars.`
export const TASK_TAG_LENGTH = `Task tag length shall be between ${minTagLength} and ${maxTagLength} chars.`
export const TASK_TAGS_NUMBER = `Task tags number shall be no more than ${taskTagNumber}.`
export const TASK_DUEDATE_NOT_VALID = 'The due date is not valid.';
