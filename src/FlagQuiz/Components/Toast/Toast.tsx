import { useEffect } from "react";
import * as SC from "./styled";

type ToastProps = {
	message: string;
	onClose: () => void;
};

const TOAST_MS = 4000;

export const Toast = ({ message, onClose }: ToastProps) => {
	useEffect(() => {
		const timer = setTimeout(onClose, TOAST_MS);
		return () => clearTimeout(timer);
	}, [onClose]);

	return <SC.Toast role="alert">{message}</SC.Toast>;
};
