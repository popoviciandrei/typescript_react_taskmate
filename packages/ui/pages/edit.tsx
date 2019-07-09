import { NextStatelessComponent } from 'next';
import { Layout } from '../components/Layout';
import { WrappedUpdateTaskForm } from '../components/UpdateTaskForm';
import Error from 'next/error';
import { Query } from 'react-apollo';
import { TaskQuery, TaskQueryVariables } from '../resources/gql-types';
import TASK_QUERY from '../graphql/task-query.graphql';
import { Loader } from '../components/Loader';

class ApolloTaskQuery extends Query<TaskQuery, TaskQueryVariables> {

}


interface InitialProps {
    id: number;
}

interface Props extends InitialProps {
}

const Edit: NextStatelessComponent<Props, InitialProps> = ({ id }) => {
    if (!id) {
        return <Error statusCode={404} />;
    }
    return (
        <Layout>
            <ApolloTaskQuery query={TASK_QUERY} variables={{ id }}>{({ error, loading, data }) => {
                if (error) {
                    return <p>Something wrong happend</p>;
                }
                const task = data ? data.task : null;
                return loading ? <Loader /> : <WrappedUpdateTaskForm initialInput={task ? { id: task.id, title: task.title } : { id: 0 }} />
            }}</ApolloTaskQuery>

        </Layout>
    );
};

Edit.getInitialProps = async ctx => {
    const { id } = ctx.query;
    return {
        id: Number(Array.isArray(id) ? (id.length ? id[0] : undefined) : id)
    }
}

export default Edit;