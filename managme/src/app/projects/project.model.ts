export interface Story {
  id?: string;
  title?: string;
  label?: 'green' | 'yellow' | 'grey';
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  creationDate?: Date;
  status?: 'todo' | 'doing' | 'done';
  owner?: string;
}

export interface Project {
  id?: string;
  title?: string;
  priority?: number;
  stories?: Story[];
}

