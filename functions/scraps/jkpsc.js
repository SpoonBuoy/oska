const cheerio = require('cheerio');
const axios = require('axios');



function jkpsc(url, upper, recent) {
    const to_be_tweeted = [];
    const entity = 'jkpsc';
    return axios.get(url)
    .then(res => {
            const $ = cheerio.load(res.data);
			const notifications = $('div#whatsNew').find('ul.notificationnews').find('li');
            for(var i =0;i<Math.min(upper, notifications.length);i++){
                const body = $(notifications[i]).find('a').text().trim();
                const link = url + $(notifications[i]).find('a').attr('href').trim();
                if(body != undefined && link != undefined){
                     if(recent == body) break;
                     to_be_tweeted.push({body, link, entity});
                 }
            }
          return Promise.resolve(to_be_tweeted);
    });
}
 
module.exports = jkpsc;