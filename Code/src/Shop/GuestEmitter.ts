class GuestEmitter{

    private _pLogic:ShopMain
    private _pTimer:egret.Timer
    private _pPool:CharacterCache
    private _pBuilder:CharacterBuilder

    public constructor(){}

    public SetShopMain(pLogic:ShopMain){
        this._pLogic = pLogic
    }

    public SetCharacterPool(pPool:CharacterCache){
        this._pPool = pPool
    }

    public SetCharacterBuilder(pBuilder:CharacterBuilder){
        this._pBuilder = pBuilder
    }

    public Start(){

        this._pPool  = this._pPool == null ? new CharacterCache() : this._pPool
        this._pTimer = new egret.Timer(Utility.Second2Millisecond(CommonDefine.SHOP_MAP_CHARACTER_EMITTER_INTERVAL),0)
        this._pTimer.addEventListener(egret.TimerEvent.TIMER,()=>{
            if(this._pLogic.GetShopCharacterAmount() >= CommonDefine.SHOP_MAP_TOTAL_CHARACTER)
                return

            let iGrid = this._pLogic.GetMap().GetUnoccupiedGrid()

            if(iGrid <= 0)
                return

            let pCharacter  = this._pPool.GetCharacter(1)
            pCharacter      = pCharacter == null ? this._pBuilder.CreateGuest(1) : pCharacter
            pCharacter.SetPos(this._GetBirthPos())
            pCharacter.SetDefaultState(CharacterStateEnum.e_Character_Birth)
        },this)
    }

    private _GetBirthPos():egret.Point{
        return null
    }
}