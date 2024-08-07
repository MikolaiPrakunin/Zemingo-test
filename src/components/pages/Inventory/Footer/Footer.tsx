import { Button } from 'primereact/button';
import { useToast } from '../../../utils/useToast';
import { useMutation } from '@tanstack/react-query';
import { resetInventory } from '../../../../api/inventoryApi';

const Footer = ({ onRefresh }: { onRefresh?: () => void }) => {
	const { show } = useToast();
	const { mutate } = useMutation({
		mutationFn: resetInventory,
		onSuccess: () =>
			show({
				severity: 'success',
				summary: 'Success',
				detail: 'Inventory refreshed',
			}),
		onError: error =>
			show({
				severity: 'error',
				summary: 'Error',
				detail: error.message,
			}),
	});
	return (
		<>
			{onRefresh && (
				<Button
					type="button"
					icon="pi pi-refresh"
					severity="secondary"
					onClick={() => {
						mutate();
						onRefresh && onRefresh();
					}}
				/>
			)}
			<Button type="submit">Save</Button>
		</>
	);
};

export default Footer;
