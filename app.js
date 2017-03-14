const Koa = require('koa');
const app = new Koa();
const request = require('request');
const APIKEY = 'a797f401a34cb50b294ca826dd7e6b01';
// const router = require('koa-router')();
const router = require('koa-route');

function getData(URL) {
	let data;

	return new Promise((resolve, reject)=> {
		request(URL, (err, res, body) => {
			if(err) {
				reject(err);
			} else {
				data = body;
				resolve(data);
			}
		})
	})
}

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

//
app.use(async function(ctx, next){
	let ip = ctx.ip; 
	ip = '174.114.191.41';

	let LOCATIONURL = 'http://ip-api.com/json/'+ip+'?fields=520191';
	let location = await getData(LOCATIONURL);
	location = JSON.parse(location);
	let lat = location.lat;
	let lon = location.lon;

	const WEATHERURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${APIKEY}`
	console.log(WEATHERURL);

	let weather = await getData(WEATHERURL);
	weather = JSON.parse(weather);
	console.log(weather);
	let temp = (weather.main.temp - 273.15).toFixed(0);

	ctx.request.lat = lat;
	ctx.request.lon = lon;
	ctx.request.temp = temp;
	await next();
});

let temprature = router.get("/weather", async (ctx) => {
	console.log(ctx.request);
	ctx.body = `your location is ${ctx.request.lat},${ctx.request.lon}, and you current temprature is ${ctx.request.temp}`;
});

app.use(temprature);

app.listen(3302, ()=>{
	console.log("koa server starts at port 3302");
});