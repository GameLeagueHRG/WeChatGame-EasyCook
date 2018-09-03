class PathFinder{
    private _pMap:Map
    private _arOpened:Array<Grid>
    private _arClosed:Array<number>
    private _arIgnore:Array<number>
    private _arWaitVisitParentGrid:Array<number>

    public constructor(){
        this._arOpened = new Array<Grid>()
        this._arClosed = new Array<number>()
        this._arIgnore = new Array<number>()
        this._arWaitVisitParentGrid = new Array<number>()
    }

    public SetMap(pMap:Map):void{
        this._pMap = pMap
    }

    public Serach(sourceGrid:number,targetGrid:number):Array<egret.Point>{
        if(!this._pMap.IsValidGrid(sourceGrid) || !this._pMap.IsValidGrid(targetGrid))
            return

        let arRes    = new Array<egret.Point>()

        if(sourceGrid == targetGrid)
        {
            arRes.push(this._pMap.GetPosByGrid(targetGrid))

            return arRes
        }
        
        let bRes     = this._SimpleSerach(sourceGrid, targetGrid)

        if(bRes)
        {
            this._SaveSerachRes(sourceGrid
            , targetGrid
            , arRes)

            return arRes
        }

        bRes         = this._Serach(sourceGrid, targetGrid)

        if(!bRes)
            return null
        
        this._SaveSerachRes(sourceGrid
            , targetGrid
            , arRes)

        return arRes
    }

    private _Serach(curGrid:number,targetGrid:number):boolean{

    }

    private _IsWaitVisitChildGrid(iGridId:number):boolean{
        return this._arOpened.length >0 ? this._arOpened[this._arOpened.length - 1].iParentGridId == iGridId  : false
    }

    private _SimpleSerach(sourceGrid:number,targetGrid:number):boolean{
        let sourceRowCol = this._pMap.GetRowColByGrid(sourceGrid)
        let targetRowCol = this._pMap.GetRowColByGrid(targetGrid)
        let curRow       = sourceRowCol.x
        let curCol       = sourceRowCol.y

        if(targetRowCol.x < curRow)
        {
            return false
        }

        if(curRow == targetRowCol.x)
        {
            let iDir = targetRowCol.y > sourceRowCol.y ? 1 : -1

            while(targetRowCol.y!=curCol)
            {
                curCol += iDir

                if(!this._pMap.IsValidGrid(curCol))
                {
                    this._ClearSerachRes()
                    return false
                }

            }

            return false
        }

        while(curRow < targetRowCol.x){
            
        }

        return false
    }

    private _SaveSerachRes(sourceGrid:number,targetGrid:number,arRes:Array<egret.Point>){

        arRes.push(this._pMap.GetPosByGrid(sourceGrid))

        for(let iIndex = 0;iIndex<this._arClosed.length;++iIndex){
            arRes.push(this._pMap.GetPosByGrid(this._arClosed[iIndex]))
        }
    }

    private _AddSerachRes(iGridId:number){
        this._arClosed.push(iGridId)
    }

    private _ClearSerachRes(){
        this._arClosed = []
    }
}