import { createContext, useContext, useRef, ReactNode, FC } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';

const ToastContext = createContext<
	| {
			show: (message: ToastMessage) => void;
	  }
	| undefined
>(undefined);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const toastRef = useRef<Toast>(null);

	const show = (message: ToastMessage) => {
		toastRef.current?.show(message);
	};

	return (
		<ToastContext.Provider value={{ show }}>
			<Toast ref={toastRef} />
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};
