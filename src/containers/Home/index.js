import  React from 'react';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';
import styles from './style.css';
import withStyle from '../../withStyle';

class Home extends React.Component {

	renderList() {
		const { newsList } = this.props;
		return newsList.map(item => <div className={styles.item} key={item.id}>{item.title}</div>);
	}

	render() {
		return (
			<div className={styles.container}>
				{ this.renderList() }
			</div>
		);
	}

	componentDidMount() {
		!this.props.newsList.length && this.props.getHomeList();
	}
}

const mapStateToProps = state => {
	return {
		newsList: state.home.newsList
	};
};

const mapDispatchToProps = dispatch => ({
	getHomeList() {
		dispatch(getHomeList());
	}
});

const ExportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles));

ExportHome.loadData = (store) => {
	// 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
	return store.dispatch(getHomeList());
};

export default ExportHome;

