class Timer {
    static CurTime:number
    static dt:number

    static GetDT():number{
        return this.dt
    }

    static Update(){
        this.dt = egret.getTimer() - this.CurTime
        this.CurTime = egret.getTimer()
    }
}