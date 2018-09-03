class ShopMain{
    private _pMap:Map
    private _pGuestEmitter:GuestEmitter
    private _pTimer:egret.Timer
    private _iCurGuestAmount:number
    private _arCharacter:Array<Character>

    public constructor(){
        this._pMap           = new Map(egret.Point.create(1,1),egret.Point.create(100,100))
        this._pGuestEmitter  = new GuestEmitter()
        this._arCharacter    = new Array<Character>
    }

    public Start(){
        this._pTimer = new egret.Timer(Utility.Second2Millisecond(CommonDefine.SHOP_GAME_TIME))
        this._pTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{

        },this)
    }

    public End(){}

    public AddCharacter(eCharacterType:CharacterTypeEnum):number{
        if(eCharacterType == CharacterTypeEnum.e_Character_Guest)
            ++this._iCurGuestAmount
    }

    public RemoveCharacter(iInstanceId:number){
        if(eCharacterType == CharacterTypeEnum.e_Character_Guest)
            --this._iCurGuestAmount
        Utility.RemoveValueByArray(this._arCharacter,)
    }

    public GetGuestAmount(){
        return this._iCurGuestAmount
    }

    public GetMap():Map{
        return this._pMap
    }

    private _GetCharacter(iInstanceId:number):Character{
       
    }

    public Update(){}
}