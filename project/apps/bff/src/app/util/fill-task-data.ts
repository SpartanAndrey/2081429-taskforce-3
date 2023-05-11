import {ApplicationServiceURL} from '../app.config';
import {TaskRdo} from '../rdo/task.rdo';
import { HttpService } from '@nestjs/axios';


export async function fillTaskData(tasks: TaskRdo[], httpService: HttpService) {
    const userIds = tasks.map((task) => task.userId);

    const taskIds = tasks.map((task) => task.id);
    
    const users = (await httpService.axiosRef.post(`${ApplicationServiceURL.Users}/users-list`, { ids: userIds })).data
    
    const comments = (await httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/comments-list`, { ids: taskIds })).data
    
    const filledTasks = tasks.map((task) => {
      const user = users.find(({id}) => id === task.userId);
      
      const commentsNumber = comments.filter(({taskId}) => taskId === task.id).length;

      delete task.userId;

      return {...task, user: user, commentsCount: commentsNumber, responsesCount: task.responses.length};
    })

    return filledTasks;
}