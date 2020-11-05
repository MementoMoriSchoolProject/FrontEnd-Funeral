import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from './utils/theme';
import {
	BrowserRouter,
	Switch,
} from 'react-router-dom';
import { LoginPage } from './pages/login/login';
import { FuneralOverviewPage } from './pages/funeral-overview/overview';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthStateProvider, ConditionedRoute, NonPrivateRoute, PrivateRoute } from './utils/private-route';
import { SelectedFuneralProvider, useSelectedFuneral } from './utils/selected-funeral';
import { FuneralSpecificPage } from './pages/funeral-specific/specific';

const httpLink = createHttpLink({
	uri: 'http://localhost:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	}
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	defaultOptions: {
		mutate: {
			// prevent framework from taking over UI and showing error message
			errorPolicy: 'all'
		},
		query: {
			// prevent framework from taking over UI and showing error message
			errorPolicy: 'all'
		}
	}
});

const App: React.FC<{}> = () => {
	return (
		<ThemeProvider theme={theme}>
			<ApolloProvider client={client}>
				<AuthStateProvider>
					<SelectedFuneralProvider>
						<BrowserRouter>
							<Routes />
						</BrowserRouter>
					</SelectedFuneralProvider>
				</AuthStateProvider>
			</ApolloProvider>
		</ThemeProvider>
	);
}

const Routes: React.FC<{}> = () => {
	const [selectedFuneral] = useSelectedFuneral();
	return (
		<Switch>
			<NonPrivateRoute path='/login'>
				<LoginPage />
			</NonPrivateRoute>
			<ConditionedRoute path='/overview' condition={!!selectedFuneral}>
				<FuneralSpecificPage />
			</ConditionedRoute>
			<PrivateRoute path='/'>
				<FuneralOverviewPage />
			</PrivateRoute>
		</Switch>
	)
}

export default App;
