import * as SC from "./styled";

type StatusMessageProps = {
	message: string;
	type?: "info" | "success" | "warning" | "error";
};

export const StatusMessage = ({
	message,
	type = "info"
}: StatusMessageProps) => {
	if (!message) return null;

	return (
		<SC.StatusMessageContainer $type={type}>
			{message}
		</SC.StatusMessageContainer>
	);
};
