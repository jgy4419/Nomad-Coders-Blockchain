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

class Blockchain{
    private blocks: Block[]
    constructor(){
        this.blocks = [];;
    }
    private getPrevHash(){
        // 만약 blocks의 길이인 this.blocks.length가 0이면
        if(this.blocks.length === 0) return "" // 첫 번재 hash가 없으므로 ""리턴
        return this.blocks[this.blocks.length - 1].hash // 만약 그게 아니면 마지막 블럭의 해쉬값을 리턴
    }
    // 새로운 블록을 추가할 때는, 블록에 저장하고 싶은 데이터 보내주기.
    public addBlock(data:string){
        const newBlock = new Block(
            this.getPrevHash(), 
            this.blocks.length + 1, 
            data
        );
        this.blocks.push(newBlock); 
    }
    // 블록에 접근할 수 있는 함수
    public getBlocks(){
        // 아예 새로운 배열을 return 해줌으로 가짜 데이터 들어오는 문제 해결.(해킹문제)
        return [...this.blocks];
    }
}

// 새로운 블록채인 생성.
const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Four one");

console.log(blockchain.getBlocks());
