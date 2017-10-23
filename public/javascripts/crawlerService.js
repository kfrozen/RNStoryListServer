var hupuCrawlerJob,
    superAgent = require('superagent');

function crawlerService(){
    if(hupuCrawlerJob == null){
        function crawler() {
            superAgent
                .get("172.16.3.245:4000") //Call local crawler to dig the data, see https://github.com/kfrozen/hupuCrawler
                .end(function () {
                    console.log("Dig Dig...");
                });
        }

        crawler();

        hupuCrawlerJob = setInterval(crawler, 1800000);
    }

    console.log("Hupu crawler is working...");
}

crawlerService.destroy = function () {
    if(hupuCrawlerJob != null){
        console.log("Hupu crawler has stopped");

        clearInterval(hupuCrawlerJob); //Stop crawler
    }
};

module.exports = crawlerService;