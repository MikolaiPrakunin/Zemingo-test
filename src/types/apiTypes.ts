export type TProduct = {
	name: string;
};

export type TItem = TProduct & {
	quantity: number;
};
