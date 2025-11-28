const express = require('express');
const router = express.Router(); // auditlogs altındaki url leri yönetir
const Response = require('../lib/Response'); // cevaplar için yardımcı sınıf
const AuditLogs = require('../db/models/AuditLogs');
const moment = require('moment');
const auth = require("../lib/auth")();

router.all("*", auth.authenticate(), (req, res, next) => {
    next();// /auditlogs ile başlayan tüm endpointler için çalışır
});

router.post('/',auth.checkRoles("auditlogs_view"), async (req, res) => {
//kullanıcının auditlogs_view yetkisine göre erişim
    let body = req.body;
    try{
        
        let query = {};
        let skip = body.skip;
        let limit = body.limit;

        if(typeof body.skip !== "number") skip = 0;

        if(typeof body.limit !== "number" || body.limit > 500) limit = 500;

        //kullanıcı tarih aralığı verirse
        if(body.begin_date && body.end_date){
            query.created_at = {
                $gte: moment(body.begin_date),
                $lte: moment(body.end_date)
            }
        //tarih yoksa son 1 gün log kayıtları    
        } else {
            query.created_at = {
                $gte: moment().subtract(1,"day").startOf("day"),
                $lte: moment()
            }
        }
        //loglar standart success formatında geri gönderilir
        let auditLogs = await AuditLogs.find(query).sort({created_at: -1}).skip(skip).limit(limit);
        res.json(Response.successResponse(auditLogs));

    }catch(err){
        let errorResponse = Response.errorResponse(err ,req.user?.language);
        res.status(errorResponse.code).json(errorResponse);
    }
})

module.exports = router;