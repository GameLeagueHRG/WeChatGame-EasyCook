class Animation{

    private readonly _ANIMATION_FRAME_START:number = 1

    private _pAnimation:egret.MovieClipDataFactory
    private _arAnimationClip:{[key:string]:egret.MovieClip}

    constructor(data,texture) {
       this._pAnimation = this._create(data,texture)
    }

    public Play(strAnimationName:string):boolean{

        if(Utility.IsStringEmpty(strAnimationName))
            return false

        let pAnimationClip = this._getAnimationClip(strAnimationName)

        pAnimationClip.gotoAndPlay(this._ANIMATION_FRAME_START)
    }

    private _getAnimationClip(strAnimationName:string):egret.MovieClip{

        if(this._arAnimationClip[strAnimationName] != null)
            return this._arAnimationClip[strAnimationName]

        let pRes = this._pAnimation.generateMovieClipData(strAnimationName)

        if(pRes == null)
        {
            throw "Create MovieClip Factory Failed"
        }

        this._arAnimationClip[strAnimationName] = new egret.MovieClip(pRes)

        return this._arAnimationClip[strAnimationName]
    }

    private _create(data,texture):egret.MovieClipDataFactory{

        let pRes = new egret.MovieClipDataFactory(data,texture)

        if(pRes == null)
        {
            throw "Create MovieClip Factory Failed"
        }
            
        pRes.enableCache = true

        return pRes
    }
}