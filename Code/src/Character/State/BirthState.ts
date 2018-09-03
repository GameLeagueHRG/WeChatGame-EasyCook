class BirthState extends FSMBase{

    private _pCharacter:Character

    public constructor(iStateId:number,pContext:any,pManager:FSMSystem){

        super(iStateId,pContext,pManager)

        this._pCharacter = pContext as Character
    }

    public Enter():void{
        if(this._pCharacter.GetCharacterType() == CharacterTypeEnum.e_Character_Guest)
           this._pCharacter.SetTargetPos(egret.Point.create(this._pCharacter.GetPos().x,this._pCharacter.GetMap().GetSize().y))
    }

    public Exit():void{

    }

    public Update():void{
        if(this._pCharacter.GetCharacterType() == CharacterTypeEnum.e_Character_Guest)
        {
            if(this._pCharacter.IsArrived())
              this._pManager.Change(CharacterStateEnum.e_Character_Idle)
        }
    }
} 