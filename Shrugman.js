export default class Shrugman {
    constructor(cat) {
        this.cat = cat
    }
get title() {
    const randomTitle = this.randomTitle()
    const wordPattern = this.pattern(randomTitle)
    return {
        title: randomTitle,
        pattern: wordPattern
    }
}
randomTitle() {
    return Array.from(this.cat[Math.floor(Math.random()* this.cat.length)])
}
pattern(title) {
    const patternArray =Array.from(title)
    patternArray.forEach((el,index, array) => {
        if(el=== " ") {
            array[index] = " "
        } else {
            array[index] = "_"
        }
    })
    return patternArray
}
}