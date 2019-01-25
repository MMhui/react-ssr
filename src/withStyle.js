import React from 'react';

// 这个函数，是生成高阶组件的函数
// 这个函数，返回的是一个组件
export default (DecoratedComponent, styles) => {
	// 返回的这个组件叫做高阶组件
	return class NewComponent extends React.Component {
		componentWillMount() {
			if(this.props.staticContext) {
				this.props.staticContext.css.push(styles._getCss());
			}
		}

		render() {
			return <DecoratedComponent {...this.props} />
		}
	}
}