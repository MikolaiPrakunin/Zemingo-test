import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import { useMutation } from '@tanstack/react-query';
import { putNewProduct } from '../../../api/productApi';
import { useToast } from '../../utils/useToast';

const CreateProduct = () => {
	const [name, setName] = useState<string>();
	const { show } = useToast();
	const { mutate } = useMutation({
		mutationFn: putNewProduct,
		onSuccess: () => {
			show({
				severity: 'success',
				summary: 'Success',
				detail: `Product ${name} created`,
			});
			setName('');
		},
		onError: error =>
			show({
				severity: 'error',
				summary: 'Error',
				detail: error.message,
			}),
	});

	const createNewProduct = () => name && mutate(name);
	const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && createNewProduct();

	return (
		<div className="flex justify-content-center align-items-center h-full">
			<Card
				title="Create product"
				className="h-12rem w-30rem"
				pt={{
					content: { className: 'flex align-items-center flex-column' },
					title: { className: 'flex justify-content-center' },
				}}
			>
				<InputText
					className="mb-3 w-full"
					value={name}
					onKeyDown={handleEnter}
					onChange={e => setName(e.target.value)}
				/>
				<div className="flex justify-content-between w-full">
					<Link to={routes.root}>
						<Button>Return</Button>
					</Link>
					<Button onClick={createNewProduct}>Create</Button>
				</div>
			</Card>
		</div>
	);
};

export default CreateProduct;
