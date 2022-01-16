const axios = require('axios');
const cheerio = require('cheerio');



async function jkbose(url, upper, recent){
    const to_be_tweeted = [];
    const entity = 'jkbose';
    return axios.get(url)
    .then(res => {
            const $ = cheerio.load(res.data);
			const notifications = $('marquee');;
           // const h1 = $('h1.logo').text();
           // console.log(notifications);
            for(var i =0;i<Math.min(upper, notifications.length);i++){
                const body = $(notifications[i]).text().trim();
                const link = $(notifications[i]).find('a').attr('href').trim();
                if(body != undefined && link != undefined){
                     if(recent == body) break;
                     to_be_tweeted.push({body, link, entity});
                 }
            }
            console.log(to_be_tweeted)
          return Promise.resolve(to_be_tweeted);
    });
}
 
module.exports = jkbose;