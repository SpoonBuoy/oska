const cheerio = require('cheerio');
const axios = require('axios');



function central_university(url, upper, recent) {
    const to_be_tweeted = [];
    const entity = 'CUK'
    return axios.get(url)
    .then(res => {
            const $ = cheerio.load(res.data);
			const notifications = $('div.maindiv').find('a');
            for(var i =0;i<Math.min(upper, notifications.length);i++){
                const body = $(notifications[i]).text().trim();
                const link = url + $(notifications[i]).attr('href').trim();
                if(body != undefined && link != undefined){
                     if(recent == body) break;
                     to_be_tweeted.push({body, link, entity});
                 }
            }
          return Promise.resolve(to_be_tweeted);
    });
}
 
module.exports = central_university;