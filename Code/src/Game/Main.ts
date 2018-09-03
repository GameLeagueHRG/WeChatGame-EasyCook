//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    private _pFSMSystem:FSMSystem
    private _pPlayer:Player

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate=()=>{
                Timer.Update()
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {

        this._CreateScene();

        SceneManager.Instance.ChangeScene(SceneName.LOADING)

        await this._LoadResAsync();

        this._Initialize();

        await platform.login();
    }

    private async _LoadResAsync() {
        try {

            await RES.loadConfig("resource/default.res.json", "resource/");

            await this.loadTheme();

            await RES.loadGroup("preload");
        }
        catch (e) {
            console.error(e);
        }
    }

    private _CreateScene()
    {
        SceneManager.Instance.AddScene(SceneName.LOADING,new LoadingScene())
        SceneManager.Instance.AddScene(SceneName.CITY   ,new MainScene())
        SceneManager.Instance.AddScene(SceneName.SHOP   ,new ShopScene())
    }

    private _Initialize():void{
        this._pPlayer = new Player()

        this._pFSMSystem = new FSMSystem()
        this._pFSMSystem.Register(GameStateEnum.e_GameState_First   ,new FirstState(GameStateEnum.e_GameState_First,this,this._pFSMSystem))
        this._pFSMSystem.Register(GameStateEnum.e_GameState_Download,new DownloadState(GameStateEnum.e_GameState_Download,this,this._pFSMSystem))
        this._pFSMSystem.Register(GameStateEnum.e_GameState_City    ,new CityState(GameStateEnum.e_GameState_City,this,this._pFSMSystem))
        this._pFSMSystem.Register(GameStateEnum.e_GameState_Shop    ,new ShopState(GameStateEnum.e_GameState_Shop,this,this._pFSMSystem))
        //测试期间
        this._pFSMSystem.SetDefaultState(GameStateEnum.e_GameState_Shop)
    }

    private _Save(){
        this._pPlayer.Save()
        Utility.SetSavePointHeader(new Date().getTime().toString())
    }

    private _ReadSavePoint(){

        if(Utility.IsStringEmpty(Utility.GetSavePointHeader()))
            return
        
        this._pPlayer.ReadSavePoint()
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }
}
