const cheerio=require("cheerio");
const request=require("request");
const {IssueLink}=require("./Issues")
function  TopicPage(link,topicname){
    request(link,cb);
    function cb(err,response,htmldata){
        if(err){console.log("something wrong with link....");}
        else if(response.statusCode==404){
            console.log("page not found");
        }
        Repo(htmldata,topicname);
    }
};
function Repo(data,folname){
    const dollar=cheerio.load(data);
    const RepoArr=dollar(".f3.color-fg-muted.text-normal.lh-condensed");
    let length=RepoArr.length;
    length=5;
    for(var i=0;i<length;i++){
        const linkarr=dollar(RepoArr[i]).find("a");
        // this will give us 2 anchor tag 
        // 1 contians its name
        // 2nd one contain link
        const repolink=dollar(linkarr[1]).attr("href");
        const repoName=dollar(linkarr[0]).attr("href");
        const fulllink=`https://github.com/${repolink}`
        IssueLink(repoName.slice(1),fulllink,folname);
    }
}

module.exports.TopicPage=TopicPage;