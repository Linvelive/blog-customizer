import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import { useState, useEffect, useRef } from 'react';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { clsx } from 'clsx';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
	isOpen,
	setIsOpen,
}: ArticleParamsFormProps) => {
	// JS

	// local state of form
	const [tempState, setTempState] = useState(articleState);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setTempState(articleState);
	}, [articleState]);

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onClose: () => {},
		onChange: setIsOpen,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(tempState);
	};

	const handleReset = () => {
		setTempState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	//HTML + CSS
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
			/>

			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				onClick={(e) => e.stopPropagation}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
					onClick={(e) => e.stopPropagation()}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={tempState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option) =>
							setTempState((prev) => ({
								...prev,
								fontFamilyOption: option,
							}))
						}
					/>
					<RadioGroup
						name='fontSize'
						selected={tempState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(option) =>
							setTempState((prev) => ({
								...prev,
								fontSizeOption: option,
							}))
						}
					/>
					<Select
						selected={tempState.fontColor}
						options={fontColors}
						title='Цвет текста'
						onChange={(option) =>
							setTempState((prev) => ({
								...prev,
								fontColor: option,
							}))
						}
					/>
					<Separator />
					<Select
						selected={tempState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option) =>
							setTempState((prev) => ({
								...prev,
								backgroundColor: option,
							}))
						}></Select>
					<Select
						selected={tempState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option) =>
							setTempState((prev) => ({
								...prev,
								contentWidth: option,
							}))
						}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
