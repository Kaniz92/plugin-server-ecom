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
const accessToken = '84f6d330f45a2ddb76b5a14c63d3bd75'; 
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
           
            //reduce product.json by title and ids
            var productJson = JSON.parse(shopResponse); 
            var products = productJson.products;
            products = products.reduce(function(reducedJson, product) {
                reducedJson.push({ 
                        id: product.id,
                        title: product.title
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
  