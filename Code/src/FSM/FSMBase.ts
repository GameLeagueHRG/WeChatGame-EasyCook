class FSMBase{
    protected _iState:number
    protected _pContext:any
    protected _pManager:FSMSystem

    public constructor(iStateId:number,pContext:any,pManager:FSMSystem){
        this._iState  = iStateId
        this._pContext= pContext
        this._pManager= pManager
    }

    public GetStateID():number{return this._iState}

    public Enter():void{}

    public Exit():void{}

    public Update():void{}
}

class FSMSystem{
    private _pCurState:FSMBase
    private _arState:{[key:number] : FSMBase}

    public constructor(){}

    public Register(iStateId:number,pState:FSMBase):void{

        if(this._IsStateValid(iStateId) || iStateId<0 || pState == null)
            return
        
        this._arState[iStateId] = pState
    }

    public SetDefaultState(iStateId:number):void{

        if(!this._IsStateValid(iStateId))
            return

        this._pCurState = this._arState[iStateId]

        this._pCurState.Enter()
    }

    public Change(iStateId:number):void{

        if(!this._IsStateValid(iStateId) || this.GetCurStateId() == iStateId)
            return
        
        this._pCurState.Exit()

        this._pCurState = this._arState[iStateId]

        this._pCurState.Enter()
    }

    public GetCurState():FSMBase{return this._pCurState}

    public GetCurStateId():number{return this._pCurState.GetStateID()}

    public Update():void{
        if(this._pCurState!=null)
          this._pCurState.Update()
    }

    private _IsStateValid(iStateId:number):boolean {
        return this._arState[iStateId] != null
    }
}