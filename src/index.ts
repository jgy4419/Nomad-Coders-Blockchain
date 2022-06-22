import crypto from "crypto";

interface BlockShape{
    hash:string;
    prevHash:string;
    height: number;
    data: string;
}

class Block implements BlockShape{
    public hash: string;
    // 블록을 생성하고 블록의 데이터를 받으면
    constructor(
        public prevHash:string,
        public height:number,
        public data:string,
    ){
        // 그 데이터의 해쉬값이 생기는 부분
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash:string, height:number, data:string){
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}