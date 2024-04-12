import {
	SyntheticEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
	ReactNode,
	FormEvent,
} from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import {
	OptionType,
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { Text } from '../text/Text';
import { useClose } from './hooks/useClose';

type ArticleParamsFormProps = {
	fontFamily: (select: OptionType) => void;
	fontSize: (select: OptionType) => void;
	fontColor: (select: OptionType) => void;
	backgroundColor: (select: OptionType) => void;
	contentWidth: (select: OptionType) => void;
	resetButton: () => void;
	applyButton: (event: FormEvent) => void;
	sideBarState: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [open, setOpen] = useState(false);

	useClose({
		isOpen: open,
		onClose: () => setOpen(false),
		rootRef: ref,
	});

	const toggleForm = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	const renderSelect = (
		selected: OptionType,
		options: OptionType[],
		onChange: (select: OptionType) => void,
		title: string
	) => (
		<Select
			selected={selected}
			options={options}
			onChange={onChange}
			title={title}
		/>
	);

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={open} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} ref={ref} onSubmit={props.applyButton}>
					<Text size={31} weight={800} uppercase as={'h3'} align='center'>
						Задайте параметры
					</Text>
					{renderSelect(
						props.sideBarState.fontFamilyOption,
						fontFamilyOptions,
						props.fontFamily,
						'Шрифт'
					)}
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={props.sideBarState.fontSizeOption}
						onChange={props.fontSize}
						title='Размер шрифта'
					/>
					{renderSelect(
						props.sideBarState.fontColor,
						fontColors,
						props.fontColor,
						'Цвет шрифта'
					)}
					<Separator />
					{renderSelect(
						props.sideBarState.backgroundColor,
						backgroundColors,
						props.backgroundColor,
						'Цвет фона'
					)}
					{renderSelect(
						props.sideBarState.contentWidth,
						contentWidthArr,
						props.contentWidth,
						'Ширина контента'
					)}
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' type='reset' onClick={props.resetButton} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
