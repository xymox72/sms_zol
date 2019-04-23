
class IController{
    constructor(app, port, callback){
        this.app = app;
        this.port = port;
        this.launch(callback);
        this.name = "base";
        this.run();
    }

    launch(callback = null){
        callback ? this.app.listen(this.port, callback()) : this.app.listen(this.port);
    }

    extend1(child){
        this.name = child.name;
        this.run = child.run;
    }


    run(req, res, next){

    }
}

module.exports = IController;