const Twit = require('twit');
var T = new Twit({
  consumer_key:         'x1KwX6O3i5fFDTAejLmtTtSJS',
  consumer_secret:      'sq7r50eAu48OtaV6JXrJX1X9sxWD2y0mTNjtdSYcZZ469JasZJ',
  access_token:         '1299253306779299842-66IMWtIWkTiXEmRp51Z2Vq8QWXlEnD',
  access_token_secret:  'H37ITaRoL8zjtGjCc4JomvXUsxDcVKvIxvczwzkVMbdme',
  timeout_ms:           60*1000
})
async function tweet(status){
	//returns a promise
    return new Promise((resolve, reject) => {
        var tweet_params = {
            status: status
        }
        T.post('statuses/update', tweet_params , function(err, data, response){
            if(err){
                //reject(err);
                console.log("Errors : " + err);
            }else{
                resolve(data);
            }
        })
    });
        
}

//async function for tweeting
async function tweet_it(c){
    for(var i=0;i<c.length;i++){
        var full = c[i].body + '\n' + c[i].link;
        const data = await tweet(full);
        console.log(data.text);
    }
}

module.exports = tweet_it;

