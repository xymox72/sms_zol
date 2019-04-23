const SMSRepository = require("../SMSApp/repository/SMSRepository");

const IController = require("./IController");
const axios = require("axios");
const SMS = require('../SMSApp/models/SMS');
const  readXlsxFile = require('read-excel-file/node');

async function GetToken(){
    try{
        let result = await axios.get("http://192.168.8.1/api/webserver/token");
        let str = String(result.data);
        str = str.slice(str.indexOf('<token>'), str.indexOf("</token>")).replace("<token>", "");
        return str;

    }catch({message}){}
}

class SMSController extends IController{
    constructor(app){
        super(app, 3000, () => console.log("listen port 3000"));
        this.smsRepo = new SMSRepository();
        super.extend1({name: "SMS",
        run:this.Run})
    }

    async Send(req, res, next){
    const sms = new SMS("89181062362", "MODEM1");
    let result = null;
    try{
        const token = await GetToken();
        result = await axios({
            method:"post",
            url:"http://192.168.8.1/api/sms/send-sms",
            headers:{
                '__RequestVerificationToken': String(token),
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*',
                'Host': '192.168.8.1',
                'Origin': 'http://192.168.8.1',
                'Referer': 'http://192.168.8.1/html/smsinbox.html?smssent'
            },
            data:sms.StrXml
        });
        sms.result = result.data.indexOf("<error>") > -1 ? "Смс не отправлен" : "Смс отправлен";
        await this.smsRepo.Insert(sms);
    }
    catch(Error){
        console.error("Error", Error);
    }
    
    res.send(result.data);
    }
    async DeleteDup(req, res, next){
       await this.smsRepo.DeleteDub();
    }
    async Excel(req, res, next){
        try{
            const rows = await readXlsxFile('./test.xlsx');
            console.log(rows)
            for (let i = 0; i <= rows.length; i++){
                if (i === 0){
                    continue;
                }
                const token = await GetToken();
                const tel = rows[i][0];
                const message = rows[i][1];
                const sms = new SMS(tel, message);
                setInterval(() => axios({
                    method:"post",
                    url:"http://192.168.8.1/api/sms/send-sms",
                    headers:{
                        '__RequestVerificationToken': String(token),
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': '*/*',
                        'Host': '192.168.8.1',
                        'Origin': 'http://192.168.8.1',
                        'Referer': 'http://192.168.8.1/html/smsinbox.html?smssent'
                    },
                    data:sms.StrXml
                }).then(async result => {
                    sms.result = result.data.indexOf("<error>") > -1 ? "Смс не отправлен" : "Смс отправлен";
                    console.log("i", i);
                    console.log(sms.result);
                    await this.smsRepo.Insert(sms);
                }).catch(err => res.send("err")), 5000);
               
            }
            res.send("EXCEL");

        }
        catch(err){console.error("errror ", err); res.send("error")};
      
       // console.log(arr);
        
    }

    async Run(req, res, next){
        res.send(await this.smsRepo.GetAll());
    }

}

module.exports = SMSController;