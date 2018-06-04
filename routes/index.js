var express = require('express');
var router = express.Router();
var details = require('./details')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const { OperationHelper } = require('apac');

const opHelper = new OperationHelper({
  awsId: details.AWSAccessKeyId,
  awsSecret: details.awsSecret,
  assocId: details.associateTag,
  locale: 'IN',
  maxRequestsPerSecond: 1
});

var searchIndexes = [
  "All",
  "Beauty",
  "Grocery",
  "Industrial",
  "PetSupplies",
  "OfficeProducts",
  "Electronics",
  "Watches",
  "Jewelry",
  "Luggage",
  "Shoes",
  "Furniture",
  "KindleStore",
  "Automotive",
  "Pantry",
  "MusicalInstruments",
  "GiftCards",
  "Toys",
  "SportingGoods",
  "PCHardware",
  "Books",
  "LuxuryBeauty",
  "Baby",
  "HomeGarden",
  "VideoGames",
  "Apparel",
  "Marketplace",
  "DVD",
  "Appliances",
  "Music",
  "LawnAndGarden",
  "HealthPersonalCare",
  "Software"
];
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { data: [], title: 'Fill Form an Get Results', searchIndexes: searchIndexes })
});

router.post('/', urlencodedParser, (req, res) => {
  opHelper.execute('ItemSearch', {
    'SearchIndex': req.body.searchIndex,
    'Keywords': req.body.title,
    'ResponseGroup': 'ItemAttributes,Offers'
  }).then((response) => {
    const finalData = response.result.ItemSearchResponse.Items.Item
    const finalTitle = 'Results in Category - ' + req.body.searchIndex + ' Search Term - ' + req.body.title
    // res.render('index', { title: finalTitle, data: finalData, searchIndexes: searchIndexes })
    res.send(finalData)
  }).catch((err) => {
    console.error("Something went wrong! ", err);
  });
})

module.exports = router;
