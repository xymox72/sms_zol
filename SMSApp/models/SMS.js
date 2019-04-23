'use strict';

const moment = require('moment');

class SMS{
    constructor(tel, message){
        this.tel = tel;
        this.message = message;
        this.Created = moment().format("YYYY-MM-DD HH:mm:ss");
        this.id = 0;
        this.result = "";
    }

    get StrXml(){
        const form =  `<?xml version: "1.0" encoding="UTF-8"?>
<request><Index>-1</Index><Phones>
<Phone>${this.tel}</Phone></Phones><Sca></Sca>
<Content>${this.message}</Content>
<Length>${String(this.message).length}</Length>
<Reserved>1</Reserved><Date>${this.Created}</Date></request>`;
return form;
    }
}

module.exports = SMS;