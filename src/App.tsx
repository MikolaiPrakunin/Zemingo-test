import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Inventory from './components/pages/Inventory';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { ToastProvider } from './components/utils/useToast';
import { routes } from './routes';
import CreateProduct from './components/pages/CreateProduct';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: routes.root,
		element: <Inventory />,
	},
	{
		path: routes.addProduct,
		element: <CreateProduct />,
	},
]);

const App = () => (
	<>
		<QueryClientProvider client={queryClient}>
			<PrimeReactProvider>
				<ToastProvider>
					<RouterProvider router={router} />
				</ToastProvider>
			</PrimeReactProvider>
		</QueryClientProvider>
	</>
);

export default App;
