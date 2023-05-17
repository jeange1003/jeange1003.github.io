export class Settings {
    constructor(params) {
        // this.maxSpeed = params.maxSpeed
        // this.levelScore = this.generateLevelScoreFibonacci([])
        this.levelScore = this.generateLevelScoreByPower();
    }
    /**
     * fibonacci
     */
    generateLevelScoreFibonacci(levelScore) {
        if (!levelScore || levelScore.length === 0) {
            return this.generateLevelScoreFibonacci([0, 10, 20]);
        }
        if (levelScore.length > 100) {
            return levelScore;
        }
        return this.generateLevelScoreFibonacci(levelScore.concat([levelScore[levelScore.length - 1] + levelScore[levelScore.length - 2]]));
    }
    generateLevelScoreByPower() {
        const result = [];
        for (let i = 0; i < 100; i++) {
            result.push(Math.pow(i, 2.2) * 10);
        }
        return result;
    }
}
