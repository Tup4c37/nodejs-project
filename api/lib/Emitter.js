const {EventEmitter} = require("events");

var instance = null;

class Emitter {

    constructor(){
        if(!instance) {
            this.emitters = {};
            instance = this;
        }

        return instance;
    }

    getEmitter(name) {
        return this.emitters[name];
    }

    addEmitter(name){
        this.emitters[name] = new EventEmitter(name);
        return this.emitters[name];
    }
}

module.exports = new Emitter();

//farklı file larda oluşturulacak farklı emitler birbirinden ayrı nesneler oluşturur ve bu emitlerin farklı yerlerden dinlenmesi mümkün değil
//bu yüzden ara class oluşturuldu.