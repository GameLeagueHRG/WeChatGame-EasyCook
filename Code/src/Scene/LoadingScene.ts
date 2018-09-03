class LoadingScene extends eui.Component implements  eui.UIComponent {
   
    private pProgressLabel:eui.Label
	private pDescLabel:eui.Label
	private pProgressBar:eui.ProgressBar

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
	}
	
}