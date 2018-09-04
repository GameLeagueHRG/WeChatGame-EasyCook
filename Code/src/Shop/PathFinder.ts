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
        let iLeftGrid    = this._pMap.IsValidGrid(curGrid - 1) ? curGrid-1 : null
        let pLeftGrid    = this._pMap.GetGridById(iLeftGrid)
        let iRightGrid   = this._pMap.IsValidGrid(curGrid + 1) ? curGrid+1 : null
        let pRightGrid   = this._pMap.GetGridById(iRightGrid)
        let iBottomGrid  = this._pMap.IsValidGrid(curGrid + this._pMap.GetMapCol()) ? curGrid + this._pMap.GetMapCol() : null
        let pBottomGrid  = this._pMap.GetGridById(iBottomGrid)
        let iTopGrid     = this._pMap.IsValidGrid(curGrid - this._pMap.GetMapCol()) ? curGrid - this._pMap.GetMapCol() : null
        let pTopGrid     = this._pMap.GetGridById(iTopGrid)
        let bIsAdjacentGrid = (iLeftGrid != null || iRightGrid != null || iBottomGrid != null || iTopGrid != null) ? true : false
        let arGridSorted = new Array<Grid>()

        if(!bIsAdjacentGrid)
        {
            while(this._arClosed.length>0 && this._IsWaitVisitChildGrid(this._arClosed[this._arClosed.length - 1])){

            }
        }

        this._AddSerachRes(curGrid)

        if(pLeftGrid != null)
        {
            pLeftGrid.iGridId = iLeftGrid
            pLeftGrid.iParentGridId = curGrid
            pLeftGrid.iCost = 1 + targetGrid - iLeftGrid
            arGridSorted.push(pLeftGrid)
        }

        if(pRightGrid != null)
        {
            pRightGrid.iGridId = iRightGrid
            pRightGrid.iParentGridId = curGrid
            pRightGrid.iCost = 1 + targetGrid - iRightGrid
            arGridSorted.push(pRightGrid)
        }

        if(pBottomGrid != null)
        {
            pBottomGrid.iGridId = iBottomGrid
            pBottomGrid.iParentGridId = curGrid
            pBottomGrid.iCost = 1 + targetGrid - iBottomGrid
            arGridSorted.push(pBottomGrid)
        }

        if(pTopGrid != null)
        {
            pTopGrid.iGridId = iTopGrid
            pTopGrid.iParentGridId = curGrid
            pTopGrid.iCost = 1 + targetGrid - iTopGrid
            arGridSorted.push(pTopGrid)
        }

        this._arOpened.concat(arGridSorted.sort((n1,n2)=>n1.iCost - n2.iCost))

        this._Serach(this._arOpened[this._arOpened.length - 1].iGridId,targetGrid)
    }

    private _IsWaitVisitChildGrid(iGridId:number):boolean{
        return this._arOpened.length >0 ? this._arOpened[this._arOpened.length - 1].iParentGridId == iGridId  : false
    }

    private _SimpleSerach(sourceGrid:number,targetGrid:number):boolean{
        let sourceRowCol = this._pMap.GetRowColByGrid(sourceGrid)
        let targetRowCol = this._pMap.GetRowColByGrid(targetGrid)
        let curRow       = sourceRowCol.x
        let curCol       = sourceRowCol.y
        let iRowDir      = 1
        let iColDir      = targetRowCol.y > sourceRowCol.y ? 1 : -1
        let iGridId      = 0

        if(targetRowCol.x < curRow)
        {
            return false
        }

        while(curRow != targetRowCol.x){

            iGridId = this._pMap.GetGridByRowCol(egret.Point.create(curRow,curCol))

            if(!this._pMap.IsValidGrid(iGridId) || !this._pMap.IsWalkableByGrid(iGridId))
            {
                this._ClearSerachRes()
                return false
            }

            this._AddSerachRes(iGridId)

            curRow += iRowDir
        }

        while(curCol != targetRowCol.y){

            iGridId = this._pMap.GetGridByRowCol(egret.Point.create(curRow,curCol))

            if(!this._pMap.IsValidGrid(iGridId) || !this._pMap.IsWalkableByGrid(iGridId))
            {
                this._ClearSerachRes()
                return false
            }

            this._AddSerachRes(iGridId)

            curCol += iColDir
        }

        return true
    }

    private _SaveSerachRes(sourceGrid:number,targetGrid:number,arRes:Array<egret.Point>){
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