/*
Handlebars.registerHelper('getReturn', (object) => {
    const {metersInFlat} = object

    console.log(metersInFlat)

})


*/
// Простой поиск
export const findAndReturn = (arr, n) => {
    const receivedFind = arr.find((element) => element === n)

    if (receivedFind) {
        return true
    } else {
        return false
    }
}

// Делаем число трёхзнаковым
export const threeNumber = (n) => {
    let nString = String(n)
    if (nString.length === 1) {
        return `00${n}`
    }
    if (nString.length === 2) {
        return `0${n}`
    }
    if (nString.length === 3) {
        return `${n}`
    }
}
// Возвращает по каналу холодная или горячая вода
/*
export const getCoolOrHeat = (channel, numberFlat) => {
    const result = channel % 2
    const listFlat = []
    listFlat.push(numberFlat)
    console.log(listFlat)

    const getText = (numberFlat) => {
        listFlat.find((number) => {
            console.log(number)
            if (number != numberFlat) {
                if (result === 0) {
                    console.log('Объём4(м3)')
                    return 'Объём4(м3)'
                } else {
                    console.log('Объём3(м3)')
                    return 'Объём3(м3)'
                }
            } else {
                if (result === 0) {
                    console.log('Объём2(м3)')
                    return 'Объём2(м3)'
                } else {
                    console.log('Объём1(м3)')
                    return 'Объём1(м3)'
                }
            }

        })
    }

    getText(numberFlat)


}*/
