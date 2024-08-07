import { getInventory, updateInventory } from '../../../api/inventoryApi';
import Item from './Item';
import Header from './Header';
import { useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { TItem, TForm, TProduct } from '../../../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '../../utils/useToast';
import { getAllProducts } from '../../../api/productApi';
import Footer from './Footer';

const Inventory = () => {
	const { show } = useToast();
	const {
		data: inventory,
		isError: isInventoryError,
		refetch,
	} = useQuery({
		queryKey: ['getInventory'],
		queryFn: getInventory,
		networkMode: 'always',
	});
	const { data: products, isError: isProductsError } = useQuery({
		queryKey: ['allProducts'],
		queryFn: getAllProducts,
	});
	const { mutate } = useMutation({
		mutationFn: updateInventory,
		onSuccess: () =>
			show({
				severity: 'success',
				summary: 'Success',
				detail: 'Inventory saved',
			}),
		onError: error =>
			show({
				severity: 'error',
				summary: 'Error',
				detail: error.message,
			}),
	});
	const methods = useForm<TForm>();
	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: 'items',
	});

	useEffect(() => methods.reset({ items: inventory }), [methods, inventory]);

	const onSubmit = ({ items }: { items: TItem[] }) => mutate(items);
	const onChoseProduct = (product: TProduct) => append({ ...product, quantity: 1 });
	const productsToExclude = fields?.map(item => item.name);
	const updatedProducts = products?.filter(product => !productsToExclude.includes(product.name)) || [];

	return isInventoryError || isProductsError ? (
		<div>Something goes wrong</div>
	) : (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Panel
					header={<Header products={updatedProducts} onChose={onChoseProduct} />}
					footer={<Footer onRefresh={refetch} />}
					pt={{
						title: { className: 'w-full flex' },
						footer: { className: 'flex justify-content-between' },
					}}
				>
					{fields?.map((item, index) => (
						<div key={item.id} className="mb-2">
							<Item index={index} onRemove={remove} />
						</div>
					))}
				</Panel>
			</form>
		</FormProvider>
	);
};

export default Inventory;
