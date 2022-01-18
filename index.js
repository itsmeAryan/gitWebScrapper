const url="https://github.com/topics";
const request=require("request");
const cheerio=require("cheerio");
// main method for links
const {TopicPage} =require("./TopicPage");
request(url,cb);
function cb(err,response,htmlData){
    if(err){console.log("something wrong..");}
    else if(response.statusCode==404){
        console.log("page not found");
    }
    getTopicLink(htmlData);
}
function getTopicLink(htmlData){
    const dollar=cheerio.load(htmlData);
    const TopicArr=dollar(".no-underline.d-flex.flex-column.flex-justify-center");
    let length=TopicArr.length;
    // length=1;
    for(var i=0;i<length;i++){
        const links=dollar(TopicArr[i]).attr("href");
        const fullLink=`https://github.com/${links}`;
        const topicname=links.split("/").pop();
        // sending links in our function
        TopicPage(fullLink,topicname);
    }
}