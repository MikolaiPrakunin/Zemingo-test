import { Dropdown } from 'primereact/dropdown';
import { TProduct } from '../../../../types';
import { Link } from 'react-router-dom';
import { routes } from '../../../../routes';
import { Button } from 'primereact/button';

const Header = ({ products, onChose }: { products: TProduct[]; onChose?: (name: TProduct) => void }) => {
	return (
		<>
			<Dropdown
				options={products}
				optionLabel="name"
				onChange={e => onChose && onChose(e.value)}
				className="flex-grow-1"
				placeholder="Add a product"
			/>
			<Link to={routes.addProduct}>
				<Button className="ml-3 h-full" type="button">
					Create new product
				</Button>
			</Link>
		</>
	);
};

export default Header;
