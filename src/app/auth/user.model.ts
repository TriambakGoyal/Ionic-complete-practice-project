export class User{

    constructor(public id:string,
        public email:string,
        private _token:string,
        private tokenExpireDate:Date)
        {}

    get token()
    {
        if(!this.tokenExpireDate || this.tokenExpireDate<= new Date() )
        {
            return null //token will be invalid
        }
        return this._token;
    }

}