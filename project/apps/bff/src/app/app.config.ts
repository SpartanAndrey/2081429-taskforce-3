export enum ApplicationServiceURL {
  Users = 'http://localhost:3000/api/auth',
  Tasks = 'http://localhost:3100/api/tasks',
  Categories = 'http://localhost:3100/api/categories',
  Comments = 'http://localhost:3200/api/comments',
  Reviews = 'http://localhost:3300/api/reviews',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;