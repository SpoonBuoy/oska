const amarsingh = require('./functions/scraps/amarsingh');
const icsc = require('./functions/scraps/icsc');
const jkbose = require('./functions/scraps/jkbose');
const jkpsc = require('./functions/scraps/jkpsc');
const kashmir_university = require('./functions/scraps/kashmir_university');
const womens_college = require('./functions/scraps/womens_college');
const sha1 = require('sha1');
const db = require('./app');
const jkbopee = require('./functions/scraps/jkbopee');
const gmcsgr = require('./functions/scraps/gmcsgr');
const central_university = require('./functions/scraps/central_university');
const iust = require('./functions/scraps/iust');
const ssm = require('./functions/scraps/ssm');
const tweet_it = require('./functions/tweets/post');
const urls = require('./assets/urls_to_scrap');
const {MongoClient} = require('mongodb');






async function create_multiple(client, data){
    const result = await client.db("oska").collection("recent_tweets").insertMany(data);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

async function upsert_recents(client, inst, updated_data){
    const result = await client.db("oska").collection("recent_tweets")
    .updateOne(
        {entity: inst},
        {$set : updated_data},
        {upsert : true}
        );


        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        if (result.upsertedCount > 0) {
            console.log(`One document was inserted with the id ${result.upsertedId._id}`);
        } else {
            console.log(`${result.modifiedCount} document(s) was/were updated.`);
        }
}



async function main(){
    //Connect to db to get the latest tweet of all institutions
    //Then call each scrap function and pass the recent tweet so that it stops at duplicates

    //Create connection to db
    const uri = "mongodb+srv://admin:oska@cluster0.8wfkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


    const recents = { };
    //fetch the recent notifications from db into recents
    try{
        await client.connect();
        const cursor = await client.db("oska").collection("recent_tweets").find();
        const res = await cursor.toArray();
        //console.log(res);
        for(var i =0;i<res.length;i++){
            recents[res[i].entity] = res[i].body;
        }
       // console.log(res);
    }catch(err){
        console.error(err)
    }finally{
        client.close();
    }
    //fetching complete

    //Calling each scrap function and copying its first notification as the most recent
    const most_recent = [];
    client.connect();
    //console.log("Amar Singh : \n");
    const data1 = await amarsingh(urls.amarsingh, 5, recents.amarsingh);
    if(data1.length !==0) {
        most_recent.push(data1[0]);
        await upsert_recents(client, 'amarsingh', data1[0]);
    }

    //console.log("\n ICSC : \n");
    const data2 = await icsc(urls.icsc, 5, recents.icsc);
    if(data2.length !==0){
        most_recent.push(data2[0]);
        await upsert_recents(client, 'icsc', data2[0]);
    }

    //console.log("\n JKPSC : \n");
    const data3 = await jkpsc(urls.jkpsc, 5, recents.jkpsc);
    if(data3.length !==0){
        most_recent.push(data3[0]);
        await upsert_recents(client, 'jkpsc', data3[0]);
    }

    //console.log("\n KU : \n");
    const data4 = await kashmir_university(urls.kashmir_university, 5, recents.KU);
    if(data4.length !==0){
        most_recent.push(data4[0]);
        await upsert_recents(client, 'KU', data4[0]);
    }
    
    //console.log("\n WC : \n");
    const data5 = await womens_college(urls.womens_college, 5, recents.WC);
    if(data5.length !==0){
        most_recent.push(data5[0]);
        await upsert_recents(client, 'WC', data5[0]);
    }
    
    //console.log("\n JKBOPEE : \n");
    const data6 = await jkbopee(urls.jkbopee, 5, recents.jkbopee);
    if(data6.length !==0){
        most_recent.push(data6[0]);
        await upsert_recents(client, 'jkbopee', data6[0]);
    }

    //console.log("\n GMC SGR : \n");
    const data7 = await gmcsgr(urls.gmcsgr, 5, recents.gmcsgr);
    if(data7.length !==0){
        most_recent.push(data7[0]);
        await upsert_recents(client, 'gmcsgr', data7[0]);
    }
    
    //console.log("\n CUK : \n");
    const data8 = await central_university(urls.central_university, 5, recents.CUK);
    if(data8.length !==0){
        most_recent.push(data8[0]);
        await upsert_recents(client, 'CUK', data8[0]);
    }

    //console.log("\n IUST : \n");
    const data9 = await iust(urls.iust, 5, recents.iust);
    if(data9.length !==0){
        most_recent.push(data9[0]);
        await upsert_recents(client, 'iust', data9[0]);
    }
    
    //console.log("\n SSM : \n");
    const data10 = await ssm(urls.ssm, 5, recents.SSM);
    if(data10.length !==0){
        most_recent.push(data10[0]);
        await upsert_recents(client, 'ssm', data10[0]);
    }

    client.close();
    

    console.log(most_recent);
    var to_be_tweeted = [];
    to_be_tweeted = [...data1, ...data2, ...data3, ...data4, ...data5, 
                    ...data6, ...data7, ...data8, ...data9, ...data10
    ];

    await tweet_it(to_be_tweeted);


    //Checked everything is working fine till now
}
main();

  