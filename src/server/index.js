import express from 'express';
import httpProxy from 'express-http-proxy';
import { render } from './utils.js';
import { getStore } from '../store';
import Routes from '../Routes';
import { matchRoutes } from 'react-router-config';

const app = express();
app.use(express.static('public'));

app.use('/api', httpProxy('http://47.95.113.63', {
	proxyReqPathResolver: function(req) {
		return '/ssr/api' + req.url;
	}
}));

app.get('*', function(req, res) {

	const store = getStore(req);

	// 跟陆路由的路径向store中加数据
	const matchedRoutes = matchRoutes(Routes, req.path);

	// 让matchRoutes中的组件对应的loadData方法都执行一次
	const promises = [];
	
	matchedRoutes.forEach(item => {
		if (item.route.loadData) {
			const promise = new Promise((resolve, reject) => {
				item.route.loadData(store).then(resolve).catch(resolve);
			});
			promises.push(promise);
		}
	});

	Promise.all(promises).then(() => {
		const context = {
			css: []
		};
		const html = render(store, Routes, req, context);
		// console.log(context, 'server/index.js');

		if(context.action === 'REPLACE') {
			res.redirect(301, context.url);
		} else if(context.NotFound) {
			res.status(404);
			res.send(html);
		} else {
			res.send(html);
		}
	});
});

const server = app.listen(3000);