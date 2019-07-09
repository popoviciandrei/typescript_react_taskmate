/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTaskMutation
// ====================================================

export interface CreateTaskMutation_createTask {
  __typename: "Task";
  id: number | null;
  title: string | null;
  status: TaskStatus | null;
}

export interface CreateTaskMutation {
  createTask: CreateTaskMutation_createTask | null;
}

export interface CreateTaskMutationVariables {
  input: CreateTaskInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TASKS_QUERY
// ====================================================

export interface TASKS_QUERY_tasks {
  __typename: "Task";
  id: number | null;
  title: string | null;
  status: TaskStatus | null;
}

export interface TASKS_QUERY {
  tasks: (TASKS_QUERY_tasks | null)[] | null;
}

export interface TASKS_QUERYVariables {
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

export interface CreateTaskInput {
  title?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
