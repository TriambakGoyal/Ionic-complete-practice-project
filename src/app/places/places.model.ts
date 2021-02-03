export class Places{
    constructor(
        public id:string,
        public name:string,
        public desc:string,
        public imageUrl:string,
        public price:number,
        public dateFrom:Date,
        public dateTo:Date,
        public userId:string
    ){}
}