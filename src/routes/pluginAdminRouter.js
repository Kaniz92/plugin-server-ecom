const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

var pluginAdminRouter = express.Router();

// Require ShopifyProductItem, TracifiedProductItem model in routes module
var ShopifyProductItem = require('../models/ShopifyProductItem');
var TracifiedProductItem = require('../models/TracifiedProductItem');

//these should save in env or mlab
const shop = 'Tracified-Shopify.myshopify.com';
const accessToken = 'd3f8b981b59361811ab5bbb74767a8f1'; 
const shopRequestUrl = 'https://' + shop + '/admin/products.json';
const tracifiedRequestUrl='https://'
  
// for /pluginAdmin/getProducts
//get product json from shopify and make list of product handlers with id
pluginAdminRouter.route('/getProducts').get(function (req, res) {

    const shopRequestHeaders = {
        'X-Shopify-Access-Token': accessToken,
      };

      request.get(shopRequestUrl,{headers:shopRequestHeaders})
        .then((shopResponse)=>{
           
            //get TraceData - hardbind
            const traceData = [
                {
                    "id": 38371,
                    "title": "item 1"
                },
                {
                    "id": 98631,
                    "title": "item 2"
                },
                {
                    "id": 63198,    
                    "title": "item 3"
                }
            ];
            JSON.stringify(traceData);
            console.log(typeof traceData);   
                    
            //reduce product.json by title and ids
            var productJson = JSON.parse(shopResponse); 
            var products = productJson.products;
            products = products.reduce(function(reducedJson, product) {
                reducedJson.push({ 
                        id: product.id,
                        title: product.title,
                        traceData:traceData
                    });
        
                return reducedJson;
            }, []);

            console.log(products);
            res.json(products);

        })
        .catch(err=>{
            res.status(err.statusCode).send(err.error.error_description);
        });
  });

  // for /pluginAdmin/getTracibilityItems
//get product json from shopify and make list of product handlers with id
pluginAdminRouter.route('/getTracibilityItems').get(function (req, res) {
    
   
});

  module.exports = pluginAdminRouter;
  