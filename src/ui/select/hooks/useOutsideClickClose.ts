import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>; // Changed to HTMLElement for broader use
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		if (!isOpen) {
			return; // No handlers needed if closed
		}

		const handleClick = ({ target }: MouseEvent) => {
			if (
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target)
			) {
				onClose?.();
				onChange(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
				onChange(false);
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, rootRef, onClose, onChange]);
};
