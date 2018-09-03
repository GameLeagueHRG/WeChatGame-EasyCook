class Character{
    private _pPathFinder:PathFinder
    private _pMap:Map
    private _pAnimation:Animation
    private _pStateSystem:FSMSystem
    private _pos:egret.Point
    private _grid:number
    private _targetGrid:number
    private _targetPos:egret.Point
    private _type:CharacterTypeEnum
    private _path:Array<egret.Point>
    private _pathIndex:number
    
    public constructor(type:CharacterTypeEnum){
        this._type = type
    }

    protected Move(){

        if(this._targetPos == null && (this._path == null || this._path.length <= 0))
            return

        if(this._targetPos != null)
        {
            if(Utility.IsEqualByPoint(this._pos,this._targetPos))
            {
                this._targetPos = null

                return
            }

            this._pos = Utility.Translate(this._pos
            , this._targetPos
            , Utility.GetDT()
            , 1)

            return
        }

        if(this._targetGrid != null && this._targetGrid != 0){

            if(this._grid == this._targetGrid)
            {
                 this._path = null

                 return
            }
               
            
            if(this._path.length <= 0)
            {
                this._path = this._pMap.SerachPath(this._grid, this._targetGrid)
                this._pathIndex = 0

                return
            }

            this._targetPos = this._path[this._pathIndex++]
        }
    }

    public SetTargetPos(pos:egret.Point) {this._targetPos = pos}

    public SetTargetGrid(iGrid:number){this._targetGrid = iGrid}

    public SetPos(pos:egret.Point){this._pos = pos}

    public GetPos():egret.Point {return this._pos}

    public GetGrid():number {return this._grid}

    public SetMap(map:Map){this._pMap = map}

    public GetMap():Map{return this._pMap}

    public GetCharacterType():CharacterTypeEnum{return this._type}

    public IsArrived():boolean {return this._targetPos == null}

    public SetDefaultState(eStateId:CharacterStateEnum){
        this._pStateSystem.SetDefaultState(eStateId)
    }

    public Update(){
        this._pStateSystem.Update()
        this.Move()
    }
}