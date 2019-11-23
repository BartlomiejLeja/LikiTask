export class Frog {
    public gender: string;
    public characteristics: string[];

    constructor(private _gender: string, private _characteristics?: string[]){
        this.gender = _gender;
        this.characteristics = _characteristics;
    }
}