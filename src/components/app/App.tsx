import { CSSProperties, FormEvent, useState } from 'react';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from '../../constants/articleProps';

export const App = () => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [articleState, setArticleState] = useState(defaultArticleState);

	const changeState = (key: keyof ArticleStateType, select: OptionType) => {
		setFormState((prevState) => ({ ...prevState, [key]: select }));
	};

	const resetFormState = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const applyFormState = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(formState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamily={(select) => changeState('fontFamilyOption', select)}
				fontSize={(select) => changeState('fontSizeOption', select)}
				fontColor={(select) => changeState('fontColor', select)}
				backgroundColor={(select) => changeState('backgroundColor', select)}
				contentWidth={(select) => changeState('contentWidth', select)}
				resetButton={resetFormState}
				applyButton={applyFormState}
				sideBarState={formState}
			/>
			<Article />
		</main>
	);
};