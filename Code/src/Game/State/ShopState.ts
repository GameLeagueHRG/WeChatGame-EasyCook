class ShopState extends FSMBase{

    private _pMain:Main
    private _pShopMain:ShopMain

    public constructor(iStateId:number,pContext:any,pManager:FSMSystem){
        super(iStateId
        , pContext
        , pManager)

        this._pMain     = pContext as Main
        this._pShopMain = new ShopMain()
    }

    public Enter():void{

        SceneManager.Instance.ChangeScene(SceneName.SHOP)

        this._pShopMain.Start()
    }

    public Exit():void{
    }

    public Update():void{
        this._pShopMain.Update()
    }
}