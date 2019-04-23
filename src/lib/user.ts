import {IUser} from "./interfaces";

namespace lib.User{

    export class DefaultUser implements IUser{
        id:number;
        login:string;
        email:string;
        isFull:boolean;

        constructor(data:IUser){
            this.id = data.id;
            this.login = data.login;
            this.isFull = data.isFull;
            this.email = data.email;
        }

        getInfo(){
            return "User";
        }
    }



}
