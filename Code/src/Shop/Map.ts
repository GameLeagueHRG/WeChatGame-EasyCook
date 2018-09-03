class Map{
    private _pPathFinder:PathFinder
    private _arOccupiedRect:Array<egret.Rectangle>
    private _arOccupiedGird:Array<number>
    private _size:egret.Rectangle
    private _iGridCount:number
    private _arGrid:Array<Grid>

    public constructor(min:egret.Point,max:egret.Point){

        this._size = new egret.Rectangle(min.x
        , min.y
        , Math.abs(max.x - min.x)
        , Math.abs(max.y - min.y))

        this._iGridCount = Math.floor(this._size.width/CommonDefine.SHOP_MAP_GIRD_SIZE) * Math.floor(this._size.height/CommonDefine.SHOP_MAP_GIRD_SIZE)

        this._pPathFinder = new PathFinder()
        this._pPathFinder.SetMap(this)

        this._arOccupiedRect = new Array<egret.Rectangle>()
        this._arOccupiedGird = new Array<number>()
        this._arGrid         = new Array<Grid>(this._iGridCount)
    }

    public SerachPath(sourceGrid:number,targetGrid:number):Array<egret.Point>{
        return this._pPathFinder.Serach(sourceGrid,targetGrid)
    }

    public AddOccupiedByRect(rect:egret.Rectangle){
        this._arOccupiedRect.push(rect)
    }

    public AddOccupiedByGrid(iGrid:number){

        let iIndex = this._arOccupiedGird.indexOf(iGrid)

        if(iIndex > 0)
            return
        
        this._arOccupiedGird.push(iGrid)
    }

    public RemoveOccupiedByGrid(iGrid:number){

        let iIndex = this._arOccupiedGird.indexOf(iGrid)

        if(iIndex < 0)
            return
        
        this._arOccupiedGird.splice(iIndex)
    }

    public GetPosByGrid(iGrid:number):egret.Point{

        let point = this.GetRowColByGrid(iGrid)

        if(point == null)
            return null

        return egret.Point.create(point.x*CommonDefine.SHOP_MAP_GIRD_SIZE-CommonDefine.SHOP_MAP_GIRD_SIZE/2,point.y*CommonDefine.SHOP_MAP_GIRD_SIZE-CommonDefine.SHOP_MAP_GIRD_SIZE/2)
    }

    public GetRowColByGrid(iGrid:number):egret.Point{

        if(iGrid <= 0)
            return null
        
        let iColNumber = Math.floor(this._size.width/CommonDefine.SHOP_MAP_GIRD_SIZE)
        let iRes = iGrid%iColNumber
        let iRow = Math.floor(iGrid/iColNumber)
        let iCol = iRes == 0 ? iGrid - (iRow*iColNumber) + iColNumber : iGrid - (iRow*iColNumber)

        return egret.Point.create(iRow,iCol)
    }

    public IsWalkableByGrid(iGrid:number):boolean{

        if(this._arOccupiedRect == null || this._arOccupiedRect.length <= 0 || iGrid < 0)
            return false
        
        for(let iIndex=0;iIndex<this._arOccupiedRect.length;++iIndex){
            if(this._arOccupiedRect[iIndex].containsPoint(this.GetPosByGrid(iGrid)))
                return true
        }

        return false
    }

    private _IsStandable(iGrid:number):boolean{

        if(this._arOccupiedGird.length <= 0 || iGrid < 0)
            return false
        
        return this._arOccupiedGird.indexOf(iGrid) < 0
    }

    public IsStandableByGrid(iGrid:number):boolean{
        return (this.IsWalkableByGrid(iGrid) && this._IsStandable(iGrid)) ? true : false
    }

    public GetUnoccupiedGrid():number{

        let pRandom = new Random(new Date().getSeconds())
        let iTryCount = 20
        let iTryGridId= 0

        while(iTryCount > 0){

            iTryGridId = Math.floor(pRandom.range(0,this._iGridCount))

            if(this.IsStandableByGrid(iTryGridId))
                return iTryGridId
            
            --iTryCount
        }

        return null
    }

    public GetSize():egret.Rectangle{
        return this._size
    }

    public GetGridById(iGridId:number):Grid{
        return this.IsValidGrid(iGridId) ? this._arGrid[iGridId] : null
    }

    public IsValidGrid(iGrid:number):boolean{
        return ( iGrid < 1 || iGrid > this._iGridCount ) ? false : true 
    }
}