export class Randomizer {

    static shuffleArray(array) {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    // Generate unique random ID
    static generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}