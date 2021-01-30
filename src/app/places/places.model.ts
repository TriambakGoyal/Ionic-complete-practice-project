export class Places{
    constructor(
        public id:string,
        public name:string,
        public desc:string,
        public imageUrl:string,
        public price:number,
        public dateFrom:string,
        public dateTo:string,
        public userId:string
    ){}
}