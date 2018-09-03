/**
 * 场景管理类
 */
class SceneManager {

    private _arScene:{[key:string] : eui.Component} 
    private _pCurrentScene

    constructor() {
        this._pCurrentScene = null
    }

    /**
     * 获取实例
     */
    static pSceneManager:SceneManager
    static get Instance():SceneManager{
        if(!this.pSceneManager) {
            this.pSceneManager =  new SceneManager()
        } 
        return this.pSceneManager
    }

    public AddScene(name:string,scene:eui.Component):void
    {
        if(!this.IsSceneValid(name))
            return

        this._arScene[name] = scene
    }

    public ChangeScene(name:string):void{

        if(!this.IsSceneValid(name))
            return
        
        if(this._pCurrentScene!=null)
            RenderManager.Instance.RemoveRenderQueue(this._pCurrentScene)
        
        RenderManager.Instance.AddRenderQueue(this._arScene[name])
    }

    private IsSceneValid(name:string):boolean{
        return this._arScene[name] != null
    }
}