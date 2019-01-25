import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { renderRoutes} from 'react-router-config';
import { Provider } from 'react-redux';


export const render = (store, Routes, req, context) => {
	const content = renderToString((
		<Provider store={store}>
			<StaticRouter location={req.path} context={context}>
				<div>
					{renderRoutes(Routes)}
				</div>
			</StaticRouter>
		</Provider>
	));

	const cssStr = context.css.length ? context.css.join('\n') : '';

	return (
	`
		<!DOCTYPE html>
		<html>
			<head>
				<title>React-SSR 服务端渲染</title>
				<meta name="Description" content="慕课网（IMOOC）是IT技能学习平台。慕课网(IMOOC)提供了丰富的移动端开发、php开发、web前端、android开发以及html5等视频教程资源公开课。并且富有交互性及趣味性，你还可以和朋友一起编程。" />
				<style>${cssStr}</style>
			</head>
			<body>
				<div id="root">${content}</div>
				<script>
					window.context = {
						state: ${JSON.stringify(store.getState())}
					};
				</script>
				<script src="/index.js"></script>
			</body>
		</html>
	`);
};