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
	const [sideBarState, setSideBarState] =
		useState<ArticleStateType>(defaultArticleState);
	const [state, setState] = useState(defaultArticleState);

	const changeState = (key: keyof ArticleStateType, select: OptionType) => {
		setSideBarState((prevState) => ({ ...prevState, [key]: select }));
	};

	const resetSidebarState = () => {
		setState(defaultArticleState);
		setSideBarState(defaultArticleState);
	};

	const applySideBarState = (event: FormEvent) => {
		event.preventDefault();
		setState(sideBarState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamily={(select) => changeState('fontFamilyOption', select)}
				fontSize={(select) => changeState('fontSizeOption', select)}
				fontColor={(select) => changeState('fontColor', select)}
				backgroundColor={(select) => changeState('backgroundColor', select)}
				contentWidth={(select) => changeState('contentWidth', select)}
				resetButton={resetSidebarState}
				applyButton={applySideBarState}
				sideBarState={sideBarState}
			/>
			<Article />
		</main>
	);
};
