/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TasksQuery
// ====================================================

export interface TasksQuery_tasks {
  __typename: "Task";
  id: number | null;
  title: string | null;
  status: TaskStatus | null;
}

export interface TasksQuery {
  tasks: (TasksQuery_tasks | null)[] | null;
}

export interface TasksQueryVariables {
  status?: TaskStatus | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum TaskStatus {
  active = "active",
  completed = "completed",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
