class ShopScene extends eui.Component implements  eui.UIComponent {

	public Group_ShopWindow:eui.Group

	public Btn_Artsian1:eui.Image
	public Btn_Artsian2:eui.Image
	public Btn_Artsian3:eui.Image
	public Btn_Artsian4:eui.Image
	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();

		this.Group_ShopWindow.touchEnabled = true;

		this.Group_ShopWindow.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			let Btn_ShopWindow = e.target as eui.Image
		},this)

		this.Btn_Artsian1.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{

		},this)

		this.Btn_Artsian2.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			
		},this)

		this.Btn_Artsian3.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			
		},this)

		this.Btn_Artsian4.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			
		},this)
	}
}