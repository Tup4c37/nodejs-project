const express = require("express");
const router = express.Router;
const {HTTP_CODES} = require("../config/Enum");
const emitter = require("../lib/Emitter");


emitter.addEmitter("notifications");

router.get("/", async(req, res) => {

    res.writeHead(HTTP_CODES.OK, {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache, no-transform"
    });

    const listener = (data) => {
        res.write("data: " + JSON.stringify(data) + "\n\n");
    }

    //res.end() olursa event dinleme biter.yoksa res.write sürekli çalışır

    emitter.getEmitter("notifications").on("messages", listener);
    //notifications emitterina gelen mesajlar on ile dinlenir, off ile durdurulur
    req.on("close", () => {
        emitter.getEmitter("notifications").off("messages", listener);
    });

    //listener tanımlaması ayrı yapılıp adı verilir(aynı fonksiyon verilebildiği için aynı memory kullanımı sağlanır) aç-kapa işlemi yapılır
});

/*client events endpointine istek atar, requestle beraber writeHead() çalışır,
event-stream req atıldı, bağlantı hep açık ve cache, dönüşüm yok*/