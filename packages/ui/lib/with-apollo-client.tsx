import React from 'react'
import initApollo from './init-apollo'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'
import { MyApp, MyAppProps } from '../pages/_app';
import { NextAppContext, DefaultAppIProps, AppProps } from 'next/app';
import { ApolloClient } from 'apollo-boost';

interface ApolloInitialProps extends DefaultAppIProps {
    apolloState: any;
}

export interface ApolloProps extends MyAppProps, AppProps, ApolloInitialProps {
}

export default (App: typeof MyApp) => {
    return class Apollo extends React.Component<ApolloProps> {

        private apolloClient: ApolloClient<any>;
        static displayName = 'withApollo(App)'
        static async getInitialProps(ctx: NextAppContext): Promise<ApolloInitialProps> {
            const { Component, router } = ctx

            let appProps = { pageProps: {} }
            if (App.getInitialProps) {
                appProps = await App.getInitialProps(ctx)
            }

            // Run all GraphQL queries in the component tree
            // and extract the resulting data
            const apollo = initApollo()
            if (typeof window === 'undefined') {
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        <App
                            {...appProps}
                            Component={Component}
                            router={router}
                            apolloClient={apollo}
                        />
                    )
                } catch (error) {
                    // Prevent Apollo Client GraphQL errors from crashing SSR.
                    // Handle them in components via the data.error prop:
                    // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                    console.error('Error while running `getDataFromTree`', error)
                }

                // getDataFromTree does not call componentWillUnmount
                // head side effect therefore need to be cleared manually
                Head.rewind()
            }

            // Extract query data from the Apollo store
            const apolloState = apollo.cache.extract()

            return {
                ...appProps,
                apolloState
            }
        }

        constructor(props: ApolloProps) {
            super(props)
            this.apolloClient = initApollo(props.apolloState)
        }

        render() {
            return <App {...this.props} apolloClient={this.apolloClient} />
        }
    }
}