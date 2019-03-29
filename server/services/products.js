'use strict';
var Product     = require('../models/product');

class ProductsService {

  static get(req, res) {
    Product.find({owner: req.id}, {},{ sort:{ category: 1}}, function(err, product) {
      if (err) { 
          return res.send(err);
      }

      return res.json(product);
    });
  }

  static post(req, res) {
    const product = new Product();
    
    product.category = req.body.category;
    product.description = req.body.description;
    product.productStatus = req.body.productStatus;
    product.size = req.body.size;
    product.partnerName = req.body.partnerName;
    product.price = req.body.price;
    product.clientName = req.body.clientName;
    product.observations = req.body.observations;
    product.owner = req.id;

    if(req.body.status)
      product.status = req.body.status;
    if(req.body.partnership)
      product.partnership = req.body.partnership;
    if(req.body.percent)
      product.percent = req.body.percent;
    if(req.body.payment)
      product.payment = req.body.payment;
    if(req.body.selledMethod)
      product.selledMethod = req.body.selledMethod;


    product.save(function(err) {
      if (err) { 
        return res.send(err);
      }

      return res.json({ code: 0, message: 'Product created!' });
    });
  }

  static put(req, res) {

        Product.findById(req.params.id, function(err, product) {

          if (err) { 
              return res.send(err);
          }

          if(req.id == product.owner) { 

            if (req.body.category)
              product.category = req.body.category;
            if (req.body.description) 
              product.description = req.body.description;
           if (req.body.productStatus) 
              product.productStatus = req.body.productStatus;
            if (req.body.partnership) 
              product.partnership = req.body.partnership;
            if (req.body.partnerName) 
              product.partnerName = req.body.partnerName;
            if (req.body.percent) 
              product.percent = req.body.percent;
            if (req.body.price) 
              product.price = req.body.price;
            if(req.body.status)
              product.status = req.body.status;
            if (req.body.clientName) 
              product.clientName = req.body.clientName;
            if (req.body.observations) 
              product.observations = req.body.observations;
            if(req.body.payment)
              product.payment = req.body.payment;
            if(req.body.selledMethod)
              product.selledMethod = req.body.selledMethod;
            if(req.body.size)
              product.size = req.body.size;
            // save the Product
            product.save(function(err) {
                if (err) { 
                  return res.send(err);
                }

                return res.json({ message: 'Product updated!' });
            });
          } else {
            return res.json({ code: 40, message: 'Access error!' });
          }

      });
  }

  static delete(req, res) {
    Product.findById(req.params.id, function(err, product) {
      if(req.id == product.owner) { 
        Product.remove({
            _id: req.params.id
        }, function(err, product) {
            if (err) { 
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
      } else {
        return res.json({ code: 40, message: 'Access error!' });
      }
    });
  }
}

module.exports = ProductsService;