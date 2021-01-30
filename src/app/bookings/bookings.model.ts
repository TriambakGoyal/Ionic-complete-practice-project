export class Booking{
    constructor(
        public id:string,
        public placeId:string,
        public userId:string,
        public placeName:string,
        public placeImgUrl:string,
        public guestNumber:number,
        public userName:string,
        public dateFrom:Date,
        public dateTo:Date
    ){}
}