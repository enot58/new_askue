import Models from "../models/models.js"

// Получение всех объектов
export const getAllObject = async () => {
    try {
        const allObject = await Models.AllObjects.findAll({
            raw: true
        })

        return allObject
    } catch (e) {
        console.log(e)
    }
}

// Получение одного объекта
export const getOneObject = async (id) => {
    try {
        const oneObject = await Models.AllObjects.findOne({
            where: {
                id: id
            },
            raw: true
        })

        return oneObject
    } catch (e) {
        console.log(e)
    }
}
// Получение всех секций по id объекта
export const getAllSection = async (idObject) => {
    try {
        const sections = await Models.Section.findAll({
            where: {
                objectId: idObject
            },
            raw: true
        })

        return sections
    } catch (e) {
        console.log(e)
    }
}
// Получение секции по id секции
export const getOneSection = async (idSection) => {
    try {
        const oneSection = await Models.Section.findOne({
            where: {
                id: idSection
            },
            raw: true
        })

        return oneSection
    } catch (e) {
        console.log(e)
    }
}
// Получение секции по номеру секции и id объекта
export const getOneSectionForNumber = async (numberSection, idObject) => {
    try {
        const oneSection = await Models.Section.findOne({
            where: {
                number: numberSection,
                objectId: idObject
            },
            raw: true
        })

        return oneSection
    } catch (e) {
        console.log(e)
    }
}

// Добавление описания к объектам
export const updateDescriptionObject = async (id) => {

}

// Получение этажей по id
export const getOneFloor = async (idFloor) => {
    try {
        const floor = await Models.Floors.findOne({
            where: {
                id: idFloor
            },
            raw: true
        })

        return floor
    } catch (e) {
        console.log(e)
    }
}
// Получаем все этажи в секции по id секции
export const getAllFloorSection = async (idSection) => {
    try{
        const floors = await Models.Floors.findAll({
            where: {
                sectionId: idSection
            },
            raw: true
        })

        return floors

    } catch (e) {
        console.log(e)
    }
}
// Получаем все этажи в секции по id объекта
export const getAllFloorObject = async (idObject) => {
    try {
        const floors = await Models.Floors.findAll({
            where: {
                objectId: idObject
            },
            raw: true
        })

        return floors
    } catch (e) {
        console.log(e)
    }
}

// Поиск квартиры
export const findFlat = async (id) => {
    const flat = await Models.Flats.findOne({
        where: {
            id: id
        },
        raw: true
    })
    const {id: receivedIdFlat, number: numberFlat, sectionId, objectId, floorId} = flat;
    // Получим сразу секцию
    const {id: receivedIdSection, number: receivedNumberSection} = getOneSection(sectionId)
    // Получим этаж
    const {id: receivedIdObject, name: nameObject, address: addressObject, descriptionObjectId} = getOneObject(objectId)

    return {
        idFlat: receivedIdFlat,
        numberFlat: numberFlat,
        idSection: receivedIdSection,
        numberSection: receivedNumberSection,
        idObject: receivedIdObject,
        nameObject: nameObject,
        addressObject: addressObject
    }
}

// Поиск квартиры по объектам и секциям

export const findFlatObjectSection = async (sectionId, objectId) => {
    try {
        const listFlats = []
        const flats = await Models.Flats.findAll({
            where: {
                sectionId: sectionId,
                objectId: objectId
            },
            raw: true
        })

        const {floorsNumber} = await Models.Floors.findOne({
            where: {
                id: sectionId
            }
        })

        for (const flat of flats) {
            console.log(flat)
        }

    } catch (e) {
        console.log(e)
    }
}

