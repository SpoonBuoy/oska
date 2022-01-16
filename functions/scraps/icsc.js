const cheerio = require('cheerio');
const axios = require('axios');



function icsc(url, upper, recent) {
    const to_be_tweeted = [];
    const entity = 'icsc';
    return axios.get(url)
    .then(res => {
            const $ = cheerio.load(res.data);
			const notifications = $('div.panel').find('tr');
            for(var i =0;i<Math.min(upper, notifications.length);i++){
                const body = $(notifications[i]).find('b').text().trim();
                const link = $(notifications[i]).find('a').eq(1).attr('href').trim();
                if(body != undefined && link != undefined){
                     if(body == recent) break;
                     to_be_tweeted.push({body, link, entity});
                 }
            }
          return Promise.resolve(to_be_tweeted);
    });
}
 
module.exports = icsc;