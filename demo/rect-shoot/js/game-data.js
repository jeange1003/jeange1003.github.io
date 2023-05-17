export class GameData {
    constructor(params) {
        this.score = 0;
        this.level = 1;
        this.settings = params.settings;
    }
    addScore(deltaScore) {
        this.score = Math.round(this.score + deltaScore);
        this.setLevelByScore();
    }
    setLevelByScore() {
        this.level = this.settings.levelScore.length + 1;
        for (let i = 0; i < this.settings.levelScore.length - 1; i++) {
            const scoreLow = this.settings.levelScore[i];
            const scoreHigh = this.settings.levelScore[i + 1];
            if (this.score >= scoreLow && this.score < scoreHigh) {
                this.level = i + 1;
            }
        }
    }
}
