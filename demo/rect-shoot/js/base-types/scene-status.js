export var SceneStatus;
(function (SceneStatus) {
    SceneStatus[SceneStatus["BeforeStart"] = 0] = "BeforeStart";
    SceneStatus[SceneStatus["Running"] = 1] = "Running";
    SceneStatus[SceneStatus["Gameover"] = 2] = "Gameover";
    SceneStatus[SceneStatus["Pause"] = 3] = "Pause";
})(SceneStatus || (SceneStatus = {}));
