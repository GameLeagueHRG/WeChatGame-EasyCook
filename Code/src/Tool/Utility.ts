class Utility{

    static IsStringEmpty(strValue:string):boolean{
        return (strValue == null || strValue == undefined || strValue.length <= 0)
    }

    static CreateBitmap(name: string): egret.Bitmap {

        if(Utility.IsStringEmpty(name))
            return null

        let result                  = new egret.Bitmap();
        let texture: egret.Texture  = RES.getRes(name);
        result.texture              = texture;

        return result;
    }

    static CreateAnimation():Animation{
        return 
    }

    static Download(strURL:string,pError:Function,pCompleted:Function,pProgress:Function):void{

        if(Utility.IsStringEmpty(strURL))
            return

        let pRequest            = new egret.HttpRequest();
        pRequest.responseType   = egret.HttpResponseType.ARRAY_BUFFER
        pRequest.open(strURL,egret.HttpMethod.GET)
        pRequest.send()

        if(pCompleted)
            pRequest.addEventListener(egret.Event.COMPLETE
            , pCompleted
            , this)
        
        if(pError)
            pRequest.addEventListener(egret.IOErrorEvent.IO_ERROR
            , pError
            , this)

        if(pProgress)
            pRequest.addEventListener(egret.ProgressEvent.PROGRESS
            , pProgress
            , this)
    }

    static Send(strURL:string,pError:Function,pCompleted:Function,pProgress:Function,...arParam):void{

        if(Utility.IsStringEmpty(strURL))
            return

        let pRequest            = new egret.HttpRequest();
        pRequest.responseType   = egret.HttpResponseType.ARRAY_BUFFER
        pRequest.open(strURL,egret.HttpMethod.POST)
        pRequest.send(arParam)

        if(pCompleted)
            pRequest.addEventListener(egret.Event.COMPLETE
            , pCompleted
            , this)
        
        if(pError)
            pRequest.addEventListener(egret.IOErrorEvent.IO_ERROR
            , pError
            , this)

        if(pProgress)
            pRequest.addEventListener(egret.ProgressEvent.PROGRESS
            , pProgress
            , this)
    }

    static CheckVersion(strVersion:string):boolean{
        return strVersion == egret.localStorage.getItem("Version")
    }

    static GetSavePointHeader():string{
        return egret.localStorage.getItem("SavePointHeader")
    }

    static SetSavePointHeader(strHeader:string):void{
        egret.localStorage.setItem("SavePointHeader",strHeader)
    }

    static ClearSavePoint(){
        egret.localStorage.clear()
    }

    static Second2Millisecond(iTime:number):number{
        return iTime * 1000
    }

    static GetDT():number{
        return Timer.GetDT()
    }

    static Translate(curPos:egret.Point,targetPos:egret.Point,dt:number,speed:number):egret.Point{

        let dir = egret.Point.create(targetPos.x - curPos.x,targetPos.y - curPos.y)
        dir.normalize(1)

        return egret.Point.create(curPos.x + speed * dt * dir.x,curPos.y + speed * dt * dir.y)
    }

    static IsEqualByPoint(source:egret.Point,target:egret.Point):boolean{
        return egret.Point.distance(source,target) <= 0.1
    }

    static RemoveValueByArray<T>(pArray:Array<T>,value:T){
        if(pArray == null)
            return
        let iIndex = pArray.indexOf(value)
        if(iIndex < 0)
            return
        pArray.splice(iIndex)
    }

    static ClearByArray<T>(pArray:Array<T>){
        pArray = []
    }
}