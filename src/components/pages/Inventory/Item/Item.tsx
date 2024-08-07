import { Card } from 'primereact/card';
import { Controller } from 'react-hook-form';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { TItem } from '../../../../types';

const Item = ({ index, onRemove }: { index: number; onRemove: (name: number) => void }) => {
	const onValueChange = (name: string, onChange: (item: TItem) => void) => (event: InputNumberChangeEvent) => {
		if (event.value === 0) {
			onRemove(index);
		} else {
			onChange({ name, quantity: event.value || 1 });
		}
	};

	return (
		<Controller
			name={`items.${index}`}
			render={({
				field: {
					value: { name, quantity },
					onChange,
				},
			}) => (
				<Card pt={{ content: { className: 'flex flex-row justify-content-between' } }}>
					<div className="text-2xl">{name}</div>
					<InputNumber
						value={quantity}
						decrementButtonIcon={quantity === 1 ? `pi pi-trash` : 'pi pi-minus'}
						decrementButtonClassName={quantity === 1 ? 'p-button-danger' : 'p-button'}
						incrementButtonIcon="pi pi-plus"
						showButtons
						allowEmpty={false}
						size={2}
						min={0}
						buttonLayout="horizontal"
						onChange={onValueChange(name, onChange)}
					/>
				</Card>
			)}
		/>
	);
};

export default Item;
