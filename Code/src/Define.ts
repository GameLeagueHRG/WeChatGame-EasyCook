enum GameStateEnum{
    e_GameState_None = 0,
    e_GameState_First,
    e_GameState_Download,
    e_GameState_City,
    e_GameState_Shop,
    e_GameState_Max
}

enum PlayerAttributeEnum{
    e_PlayerAttribute_Money,
    e_PlayerAttribute_Max
}

enum CharacterStateEnum{
    e_Character_None = 0,
    e_Character_Birth,
    e_Character_Idle,
    e_Character_Move,
    e_Character_Make,
    e_Character_Wait
}

enum CharacterTypeEnum{
    e_Character_None = 0,
    e_Character_Empolyee,
    e_Character_Guest,
    e_Character_Artsian,
    e_Character_Max,
}

const SceneName = {
    LOADING: 'LoadingScene',
    CITY: 'MainScene',
    SHOP: 'ShopScene'
}

class CommonDefine{
    static readonly SHOP_MAP_Min:egret.Point        = new egret.Point()
    static readonly SHOP_MAP_Max:egret.Point        = new egret.Point()
    static readonly SHOP_MAP_GIRD_SIZE:number       = 20
    static readonly SHOP_MAP_ENTRANCE_RECT:egret.Rectangle  = new egret.Rectangle()
    
    //后期修改为配置文件
    static readonly SHOP_MAP_TOTAL_CHARACTER        = 5
    static readonly SHOP_MAP_CHARACTER_EMITTER_INTERVAL = 1
    static readonly SHOP_GAME_TIME = 120 
}

