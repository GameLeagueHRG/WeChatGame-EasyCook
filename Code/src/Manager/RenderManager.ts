class RenderManager{

    private _pRenderRootNode:egret.DisplayObjectContainer 

    constructor(){

    }

    /**
     * 获取实例
     */
    static pInstance:RenderManager
    static get Instance():RenderManager{
        if(!this.pInstance) {
            this.pInstance =  new RenderManager()
        } 
        return this.pInstance
    }

    public SetRenderRootNode(renderNode:egret.DisplayObjectContainer):void{
        this._pRenderRootNode = renderNode
    }

    public AddRenderQueue<T extends egret.DisplayObject>(instace:T):void{
        this._pRenderRootNode.addChild(instace);
    }

    public RemoveRenderQueue<T extends egret.DisplayObject>(instace:T):void{
        this._pRenderRootNode.removeChild(instace);
    }
}