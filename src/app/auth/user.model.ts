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
    get tokenDuration()
    {
        if(!this.token)
        {
            return 0;
        }
        // return 2000;
        return this.tokenExpireDate.getTime() - new Date().getTime();
    }

}