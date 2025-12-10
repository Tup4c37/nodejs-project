const express = require('express');
const router = express.Router(); // auditlogs altındaki url leri yönetir
const Response = require('../lib/Response'); // cevaplar için yardımcı sınıf
const AuditLogs = require('../db/models/AuditLogs');
const Categories = require('../db/models/Categories');
const Users = require('../db/models/Users');
const auth = require("../lib/auth")();

router.all("*", auth.authenticate(), (req, res, next) => {
    next();
});

/**
 1.auditlogs tablosunda işlem yapan kişilerin hangi tipi kaç kez yaptığını gösteren sorgu
 2. Kategori tablosundaki tekil veri sayısı
 3.Sistemde tanımlı kaç kullanıcı var
 */

router.post('/auditlogs', async (req, res) => {
    try{

        let body = req.body;
        let filter = {};
        if(typeof body.is_active === "boolean") filter.is_active = body.is_active;
        if(typeof body.location === "string") filter.location = body.location;

        let result = await AuditLogs.aggregate([ //joint işlemi
            {$match: filter},
            {$group: {_id: {email: "$email", proc_type: "$proc_type"}, count: {$sum: 1}}},
            {$sort: {count: -1}}
        ]);
        
        res.json(Response.successResponse(result));
    }catch(err){
        let errorResponse = Response.errorResponse(err ,req.user?.language);
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.post('/categories/unique', async (req, res) => {
    try{

        let body = req.body;
        let filter = {};
        if(typeof body.is_active === "boolean") filter.is_active = body.is_active;

        let result = await Categories.distinct("name", filter);
        
        res.json(Response.successResponse(result));
    }catch(err){
        let errorResponse = Response.errorResponse(err ,req.user?.language);
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.post('/users/count', async (req, res) => {
    try{


        let body = req.body;
        let filter = {};
        if(typeof body.is_active === "boolean") filter.is_active = body.is_active;

        let result = await Users.countDocuments(filter);
        
        res.json(Response.successResponse(result));
    }catch(err){
        let errorResponse = Response.errorResponse(err ,req.user?.language);
        res.status(errorResponse.code).json(errorResponse);
    }
});

module.exports = router;