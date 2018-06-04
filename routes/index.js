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

var searchIndex =
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Fill Form an Get Results'  })
  });

router.post('/', urlencodedParser, (req, res) => {
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'Books',
    'Keywords': req.body.title,
    'ResponseGroup': 'ItemAttributes,Offers'
  }).then((response) => {
    const finalData = response.result.ItemSearchResponse.Items.Item
    //res.send(finalData);
    res.render('index', { title:'Results for Books named '+ req.body.title, data: finalData })
  }).catch((err) => {
    console.error("Something went wrong! ", err);
  });
})

module.exports = router;
