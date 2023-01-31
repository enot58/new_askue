import Models from '../models/models.js'


// Поиск одного устройства по id с номером
/*{
    idDevice: '83',
    numberDevice: 8634181,
    objectId: 2,
    objectName: 'Зеландия стр.1',
    objectAddress: 'г.Пенза ',
    sectionId: 5,
    sectionNumber: 1,
    floorId: 45,
    floorNumber: 3
}*/
export const findOneDevice = async (idDevice) => {
    try {
        const device = await Models.PriborNumber.findOne({
            where: {
                id: idDevice
            },
            raw: true
        })
        const {number: receivedNumberDevice, priborId, objectId, floorId, sectionId} = device
        const section = await findSection(sectionId)
        const {id: idReceivedNumberSection, number: receivedNumberSection} = section
        const object = await findObject(objectId)
        const {name: objectName, address: objectAddress} = object
        const floor = await findFloor(floorId)
        const {number: receivedFloor} = floor


        return {
            idDevice: idDevice,
            numberDevice: receivedNumberDevice,
            objectId: objectId,
            objectName: objectName,
            objectAddress: objectAddress,
            sectionId: sectionId,
            sectionNumber: receivedNumberSection,
            floorId: floorId,
            floorNumber: receivedFloor
        }

    } catch (e) {
        console.log(e)
    }
}

// По id прибора достаём каналы
export const findChannelDevice = async (idDevice) => {
    try {
        // Это связь прибора и каналов
        // Т.Е. К примеру прибор 7896655 - Канал 1
        // Т.Е.__________________7896655 - Канал 2 и т.д
        const channelsDevice = await Models.PriborNumberChanel.findAll({
            where: {
                priborNumberId: idDevice
            },
            raw: true
        })
        const listChannel = []

        for (const ch of channelsDevice) {
            const {id: receivedChannelDevice,priborNumberId, chanelId: channelId} = ch
            // Получим номер устройства
            const device = await findOneDevice(idDevice)
            const {numberDevice} = device
            // Здесь получаем сами каналы (номер каналов)
            const channelNumber = await findChannel(channelId)
            const {id: idReceivedChannel, number: receivedNumberChannel} = channelNumber
            // Нужно получить счётчики и привязать к каналам
            // id Основной связи передаётся и получаем номер счётчика
            const meter = await findDeviceAndMeter(receivedChannelDevice)

            if (meter) {
                const {id: idReceivedMeter, number: receivedNumberMeter, flatId, numberFlat} = meter
                const flat = await findFlat(flatId)
                listChannel.push({
                    idDevice: idDevice,
                    numberDevice: numberDevice,
                    channelId: idReceivedChannel,
                    channelNumber: receivedNumberChannel,
                    idMeter: idReceivedMeter,
                    numberMeter: receivedNumberMeter,
                    idFlat: flatId,
                    numberFlat: numberFlat
                })
            } else {
                listChannel.push({
                    idDevice: idDevice,
                    numberDevice: numberDevice,
                    channelId: idReceivedChannel,
                    channelNumber: receivedNumberChannel,
                    idMeter: null,
                    numberMeter: null,
                    idFlat: null,
                    numberFlat: null
                })
            }

        }


        return listChannel
    } catch (e) {
        console.log(e)
    }
}

// Зависимость прибор и счётчик
export const findDeviceAndMeter = async (idDeviceNumberChannel) => {
    try {
        const meterId = await Models.PriborNumberChanelNumberMeters.findOne({
            where: {
                priborNumberChanelId: idDeviceNumberChannel
            },
            raw: true
        })

        if (meterId) {
            const {meterNumberId} = meterId

            const meter = await Models.MeterNumber.findOne({
                where: {
                    id: meterNumberId
                },
                raw: true
            })
            const {flatId} = meter
            const flat = await findFlat(flatId)
            const {numberFlat: receivedNumberFlat} = flat
            return {
                ...meter,
                numberFlat: receivedNumberFlat
            }
        }

        return undefined


    } catch (e) {
        console.log(e)
    }
}


// Получить счётчик по id
export const findMeter = async (idMeter) => {
    try {
        const meter = await Models.Meter.findOne({
            where: {
                id: idMeter
            },
            raw: true
        })

        return meter
    } catch (e) {
        
    }
}



// Поиск каналов по id канала
export const findChannel = async (id) => {
    try {
        const channelReceived = await Models.Chanel.findOne({
            where: {
                id: id
            },
            raw: true
        })
        return channelReceived
    } catch (e) {
        console.log(e)
    }
}


// Поиск прибора наименования, и свойств по priborId
export const findDevice = async (id) => {
    try {
        const deviceDescription = await Models.Pribors.findOne({
            where: {
                id: id
            },
            raw: true
        })

        return deviceDescription

    } catch (e) {
        console.log(e)
    }
}

// Поиск свойств прибора по priborId
export const descriptionDevice = async (priborId) => {
    try {
        const property = await Models.ValueProperty.findAll({
            where: {
                priborId: priborId
            },
            raw: true
        })

        //const {id: idValueProperty,value: valueProperty, namePropertyId} = property
        const listProperty = []
        // Получим наименование значений
        for (const nProperty of property) {
            const {id: idValueProperty,value: valueProperty, namePropertyId} = nProperty
            const name = await findNameDescription(namePropertyId)
            const {name: nameProperty} = name

            listProperty.push({
                idValueProperty: idValueProperty,
                nameProperty: nameProperty,
                valueProperty: valueProperty,

            })
        }

        return listProperty

    } catch (e) {
        console.log(e)
    }
}

// Поиск наименования свойства устройства
export const findNameDescription = async (id) => {
    try {
        const name = await Models.NameProperty.findOne({
            where: {
                id: id
            },
            raw: true
        })

        return name

    } catch (e) {
        console.log(e)
    }
}



// Поиск всех устройств с номером
export const allDeviceInObjects = async () => {
    try {
        const device = await Models.PriborNumber.findAll(

            {raw: true}
        )
        return device
    } catch (e) {
        console.log(e)

    }
}

// Поиск этажа объекта
export const findFloor = async (id) => {
    try {
        const floor = await Models.Floors.findOne({
            where: {
                id: id
            },
            raw: true
        })

        return floor

    } catch (e) {
        console.log(e)
    }
}

// Поиск секции
export const findSection = async (id) => {
    try {
        const section = await Models.Section.findOne({
            where: {
                id: id
            },
            raw: true
        })

        return section

    } catch (e) {
        console.log(e)
    }
}

// Поиск объекта
export const findObject = async (id) => {
    try {
        const object = await Models.AllObjects.findOne({
            where: {
                id: id
            },
            raw: true
        })

        return object
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
    const {id: receivedIdSection, number: receivedNumberSection} = findSection(sectionId)
    // Получим этаж
    const {id: receivedIdObject, name: nameObject, address: addressObject, descriptionObjectId} = findObject(objectId)

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