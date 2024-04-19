export interface Project {
    id?: string;
    title?: string;
    priority?: number;
    stories?: Story[];
}

export interface Story {
    id?: string;
    title?: string;
    label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    creationDate?: Date;
    status?: 'todo' | 'inProgress' | 'done';
    owner?: string;
}