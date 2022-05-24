export interface IPlayerAnimation{

    changeToWalkAnimation(dS: number):void;

    changeToJumpAnimation():void;

    changeToIdleAnimation(dS: number):void;

    changeToRunAnimation(dS: number):void;

    changeToDeadAnimation(dS: number):void;
    
}