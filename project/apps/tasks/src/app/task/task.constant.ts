import { SortType } from "@project/shared/app-types";

export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;
export const MAX_TASK_TAG_NUMBER = 5;

export const enum FieldLength {
  MinTitle = 20,
  MaxTitle = 50,
  MinDescription = 100,
  MaxDescription = 1024,
  MinAddress = 10,
  MaxAddress = 255,
  MinTag = 3,
  MaxTag = 10
}

export const enum TaskValidation {
  TaskTitleLength = `Task title length shall be between ${FieldLength.MinTitle} and ${FieldLength.MaxTitle} chars.`,
  TaskDescriptionLength = `Task description length shall be between ${FieldLength.MinDescription} and ${FieldLength.MaxDescription} chars.`,
  TaskAddressLength = `Task address length shall be between ${FieldLength.MinAddress} and ${FieldLength.MaxAddress} chars.`,
  TaskTagLength = `Task tag length shall be between ${FieldLength.MinTag} and ${FieldLength.MinTag} chars.`,
  TaskTagsNumber = `Task tags number shall be no more than ${MAX_TASK_TAG_NUMBER}.`,
  TaskDuedateNotValid = 'The due date is not valid.'
}

export const enum TaskException {
  TaskForbidden = 'Access is denied.',
  TaskStatusConditionsWrong = 'Update status conditions are wrong.',
  TaskNotFound = 'Task is not found.',
  TaskCantTake = 'You\'re not contractor.',
  TaskResponseExist = 'You have already responsed this task.',
  TaskContractorExist = 'The contractor has been already appointed.'
}