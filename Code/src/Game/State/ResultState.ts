class ResultState extends FSMBase {

    private _pMain:Main

    public constructor(iStateId:number,pContext:any,pManager:FSMSystem){
        super(iStateId
        , pContext
        , pManager)

        this._pMain     = pContext as Main
    }
}