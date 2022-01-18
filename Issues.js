const cheerio = require("cheerio");
const PDFDocument = require('pdfkit');
const request = require("request");
const path = require("path");
const fs = require("fs");

function IssueLink(name, link, foldername) {
    const issuelink = `${link}/issues`
    request(issuelink, cb);
    function cb(err, response, htmldata) {
        if (err) {

        }
        else if(response.statusCode==404){
            console.log("page not found");
        }
        fetchissue(htmldata, name, foldername);
    }
};
function fetchissue(data, reponame, foldername) {
    console.log("File created....");
    const dollar = cheerio.load(data);
    const issueArr = dollar(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    const length = issueArr.length;
    const arr = []
    for (var i = 0; i < length; i++) {
        const data = dollar(issueArr[i]).attr("href");
        const limeLink = `https://github.com/${data}`;
        arr.push(limeLink)
    }
    const folpath = path.join(__dirname,"Scrapper", foldername);
    const filepath = path.join(folpath, reponame + ".pdf");
    makedir(folpath)

    // if array contain some data then execute 
    if (arr.length > 0) {
        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream(filepath));
        pdfDoc.fill("red")
        .fontSize(30)
        pdfDoc.text(`${reponame} repositary all issues are here`);
        pdfDoc.fillColor("black")
        .fontSize(15)
        .moveDown(0.5);
        pdfDoc.list(arr).moveDown(0.9)
        pdfDoc.text("created by:",{lineBreak:false}).fillColor("red")
        pdfDoc.text("itsmeAryan",{link:"https://github.com/itsmeAryan",align:'left'})
        .fillColor("green")
        pdfDoc.end();
        // fs.writeFileSync(filepath, )
    }

}
function makedir(folpath) {
    if (fs.existsSync(folpath) == false) {
        fs.mkdirSync(folpath)
    }
}

module.exports.IssueLink = IssueLink;