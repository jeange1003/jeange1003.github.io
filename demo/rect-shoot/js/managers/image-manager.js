export class ImageManager {
    constructor() {
        this.cache = new Map();
    }
    async getImage(src) {
        let image = this.cache.get(src);
        if (image) {
            return image;
        }
        image = await this.loadImage(src);
        this.cache.set(src, image);
        return image;
    }
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = function () {
                resolve(image);
            };
            image.onerror = reject;
        });
    }
}
