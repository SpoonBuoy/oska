const cheerio = require('cheerio');
const axios = require('axios');



function gmcsgr(url, upper, recent) {
    const to_be_tweeted = [];
    const entity = 'gmcsgr';
    return axios.get(url)
    .then(res => {
            const $ = cheerio.load(res.data);
			const notifications = $('table#example').find('tbody').find('tr');
            for(var i =0;i<Math.min(upper, notifications.length);i++){
                const body = $(notifications[i]).children().eq(2).text().trim();
                const link = url + $(notifications[i]).find('a').attr('href').trim();
                if(body != undefined && link != undefined){
                     if(recent == body) break;
                     to_be_tweeted.push({body, link, entity});
                 }
            }
          return Promise.resolve(to_be_tweeted);
    });
}
 
module.exports = gmcsgr;