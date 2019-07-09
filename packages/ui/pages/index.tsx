import { Layout } from '../components/Layout';
import TASKS_QUERY from '../graphql/tasks.graphql';
import { Query } from 'react-apollo';
import { TASKS_QUERY as ITasksQuery, TASKS_QUERYVariables, TASKS_QUERY_tasks } from '../resources/gql-types';
import { Task } from '../components/Task';
import { Loader } from '../components/Loader';
import { WrappedCreateTaskForm } from '../components/CreateTaskForm';


class TasksQuery extends Query<ITasksQuery, TASKS_QUERYVariables> {

}

export default () => (
    <Layout>
        <TasksQuery query={TASKS_QUERY}>{({ error, loading, data, refetch }) => {
            if (error) {
                return <p>SOmething wrong happened/</p>
            }

            const tasks = data ? data.tasks : [];
            return <div>
                <WrappedCreateTaskForm onCreateTask={refetch} />
                {loading ?
                    <Loader /> :
                    <ul>{tasks.map((task, i) => {
                        return <Task key={i} {...task} />;
                    })}</ul>
                }
            </div>
        }}</TasksQuery>
    </Layout>
);
