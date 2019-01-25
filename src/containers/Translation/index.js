import  React from 'react';
import { connect } from 'react-redux';
import { getTranslationList } from './store/actions';
import { Redirect } from 'react-router-dom';
import styles from './style.css';
import withStyle from '../../withStyle';

class Translation extends React.Component {

	renderList() {
		const { translationList } = this.props;
		return translationList.map(item => <div className={styles.item} key={item.id}>{item.title}</div>);
	}

	render() {
		return this.props.login ? (
			<div className={styles.container}>
				{ this.renderList() }
			</div>
		) : (<Redirect to="/" />);
	}

	componentDidMount() {
		!this.props.translationList.length && this.props.getTranslationList();
	}
}

const mapStateToProps = state => {
	return {
		translationList: state.translation.translationList,
		login: state.header.login
	};
};

const mapDispatchToProps = dispatch => ({
	getTranslationList() {
		dispatch(getTranslationList());
	}
});

const ExportTranslation = connect(mapStateToProps, mapDispatchToProps)(withStyle(Translation, styles));

ExportTranslation.loadData = (store) => {
	// 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
	return store.dispatch(getTranslationList());
};

export default ExportTranslation;