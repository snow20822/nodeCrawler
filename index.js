const request = require('request'); //抓取目標網頁
const cheerio = require('cheerio'); //指定HTML目標
const app = express();
// ...
let server = app.listen(12345, function () {
let host = server.address().address;
let port = server.address().port;
//啟動訊息
console.log('Your App is running at http://%s:%s', host, port);
});
//首頁訊息
app.get('/', function (req, res) {
res.send('Hello World!');
});
//抓取氣象
const url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm'

request(url, (err, res, body) => {
  const $ = cheerio.load(body)
  let weathers = []
  $('#box8 .FcstBoxTable01 tbody tr').each(function(i, elem) {
    weathers.push(
      $(this)
        .text()
        .split('\n')
    )
  })

  weathers = weathers.map(weather => ({
    time: weather[1].substring(2).split(' ')[0],
    temp: weather[2].substring(2),
    rain: weather[6].substring(2),
  }))

  console.log(weathers)
})
//抓取google新聞
const newsUrl = 'https://news.google.com/?tab=rn&hl=zh-TW&gl=TW&ceid=TW:zh-Hant'
/*
#yDmH0d > c-wiz > div > div.FVeGwb.CVnAc > div.ajwQHc.BL5WZb.RELBvb.fV8ehb > div > main > c-wiz
 > div.lBwEZb.BL5WZb.xP6mwf > div.NiLAwe.mi8Lec.gAl5If.sMVRZe.Oc0wGc.R7GTQ.keNKEd.j7vNaf.nID9nc > div > article > a
 */
request(newsUrl, (err, res, body) => {
  const $ = cheerio.load(body)
  let news = []
  $('#yDmH0d c-wiz div div.FVeGwb.CVnAc div.ajwQHc.BL5WZb.RELBvb.fV8ehb div main c-wiz div.lBwEZb.BL5WZb.xP6mwf div.NiLAwe.mi8Lec.gAl5If.sMVRZe.Oc0wGc.R7GTQ.keNKEd.j7vNaf.nID9nc div article a').each(function(i, elem) {
    news.push(
      $(this)
        .text()
        .split('\n')
    )
  })
  let i = 0;
  const reformattedArray = news.map(function(obj) { 
   if(i % 3 == 1){
    console.log(`title: ${obj}`);
    }
    if(i % 3 == 2){
    console.log(`news public: ${obj}`);
    }
    i++;
  });
})
