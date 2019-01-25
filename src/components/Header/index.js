import  React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from './store';
import styles from './style.css';
import withStyle from '../../withStyle';

class Header extends React.Component {

	render() {
		const { login, handleLogin, handleLogout } = this.props;
		return <div className={styles.container}>
			<Link className={styles.list_item} to="/">首页</Link>
			{
				login ? <><Link className={styles.list_item} to="/translation">翻译列表</Link><div className={styles.list_item} onClick={handleLogout}>退出</div></> : <div className={styles.list_item} onClick={handleLogin}>登陆</div>
			}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.header.login
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleLogin() {
			dispatch(actions.login());
		},
		handleLogout() {
			dispatch(actions.logout());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyle(Header, styles));