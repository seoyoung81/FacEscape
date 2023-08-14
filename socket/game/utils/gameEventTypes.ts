// game에서 발생하는 Event Type 정의
export enum GameEventType {
  stageSelect = "stageSelect",
  stageSelectSucess = "stageSelectSucess",
  createPlayer = "createPlayer",
  createPlayerSuccess = "createPlayerSuccess",
  updatePlayer = "updatePlayer",
  updatePlayerSuccess = "updatePlayerSuccess",

  destroyPlayer = "destroyPlayer",
  collidePlayerTileMap = "collidePlayerTileMap",
  collidePlayerPlayer = "collidePlayerPlayer",
  collidePlayerWall = "collidePlayerWall",
  collidePlayerCannonBall = "collidePlayerCannonBall",
  collidePlayerCannon = "collidePlayerCannon",
  collidePlayerKey = "collidePlayerKey",
  collideCannonBallWall = "collideCannonBallWall",
  overlapPlayerDoor = "overlapPlayerDoor",
  animationCannon = "animationCannon",
}
