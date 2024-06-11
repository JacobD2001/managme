import { User } from "../user/user.model";

export interface Story {
  id?: string;
  title?: string;
  label?: 'green' | 'yellow' | 'grey';
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  creationDate?: Date;
  status?: 'todo' | 'doing' | 'done';
  owner?: string;
  tasks?: Task[];
}

export interface Project {
  id?: string;
  title?: string;
  priority?: number;
  stories?: Story[];
}

export interface Task {
  id?: string;
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  timeToComplete?: number;
  creationDate?: Date;
  startDate?: Date;
  endDate?: Date;
  status?: 'todo' | 'doing' | 'done';
  owner?: string;
  storyId?: string;
  assaignedUser?:  User[];
}

