class PlayerAttributes implements ISerialization{

    public _arAttribute:Array<number>

    GetHeader():string{
        return "PlayerAttribute"
    }

    Serialization():boolean{

        let strHeader = this.GetHeader()

        for(let iIndex:number = 0;iIndex<this._arAttribute.length;++iIndex)
        {
            egret.localStorage.setItem('${strHeader}${iIndex}','${this._arAttribute[iIndex]}')
        }

        return true
    }

    Deserialization():boolean{

        if(this._arAttribute == null || this._arAttribute.length <= 0)
            return false

        let strHeader = this.GetHeader()

        for(let iIndex:number = 0;iIndex<this._arAttribute.length;++iIndex)
        {
            this._arAttribute[iIndex] = parseInt(egret.localStorage.getItem('${strHeader}${iIndex}'))
        }

        return true
    }
}

class Player{

    private _pAttributes:PlayerAttributes

    public constructor(){
        this._pAttributes._arAttribute = new Array<number>(PlayerAttributeEnum.e_PlayerAttribute_Max)
    }

    public Save(){

    }

    public ReadSavePoint():boolean{
        return this._pAttributes.Deserialization()
    }

    public SetAttribute(eIndex:PlayerAttributeEnum,iValue:number){
        this._pAttributes._arAttribute[eIndex] = iValue
    }

    public GetAttribte(eIndex:PlayerAttributeEnum):number{
        return this._pAttributes == null ? -1 : this._pAttributes._arAttribute[eIndex]
    }
}