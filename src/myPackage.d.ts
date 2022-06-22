// 타입스크립트는 이것이 Config를 보내주고, boolean을 return 한다는 것을 안다.
interface Config {
    urls: string;
}
declare module "myPackage"{
    function init(config: Config): boolean;
    function exit(code: number): number;
}