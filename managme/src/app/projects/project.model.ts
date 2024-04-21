//TO DO: unc when adjusted to the rysiu project model

// export interface Project {
//     id?: string;
//     title?: string;
//     priority?: number;
//     stories?: Story[];
// }

// export interface Story {
//     id?: string;
//     title?: string;
//     label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
//     description?: string;
//     priority?: 'low' | 'medium' | 'high';
//     creationDate?: Date;
//     status?: 'todo' | 'inProgress' | 'done';
//     owner?: string;
// }

export interface Project {
    id?: string;
    title?: string;
    priority?: number;
    stories?: Story[];
  }

export interface Story {
    description?: string;
    label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}