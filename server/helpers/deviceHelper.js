import Models from "../models/models.js";
import {findFlat, getOneSection, getOneFloor, getOneObject} from "./objectHelper.js";

// Получим все устройства
export const getAllNameDevice = async () => {
    try {
        const devices = await Models.Pribors.findAll({raw:true})
        return devices
    } catch (e) {
        console.log(e)
    }
}

// Получим приборы по id объекта, секции, этажа
export const getDeviceObjectAndSectionAndFloor = async (idObject, idSection, idFloor) => {
    try {
        const devices = await Models.PriborNumber.findAll({
            where: {
                objectId: idObject,
                sectionId: idSection,
                floorId: idFloor
            },
            raw: true
        })

        return devices
    } catch (e) {
        console.log(e)
    }
}

// Получим прибор по номеру
export const getDeviceNumber = async (numberDevice) => {
    try {
        const device = await Models.PriborNumber.findOne({
            where: {
                number: number
            },
            raw: true
        })

        return device
    } catch (e) {
        console.log(e)
    }
}

// Получим прибор по id
export const findOneDevice = async (idDevice) => {
    try {
        const device = await Models.PriborNumber.findOne({
            where: {
                id: idDevice
            },
            raw: true
        })
        const {number: receivedNumberDevice, priborId, objectId, floorId, sectionId} = device
        const section = await getOneSection(sectionId)
        const {id: idReceivedNumberSection, number: receivedNumberSection} = section
        const object = await getOneObject(objectId)
        const {name: objectName, address: objectAddress} = object
        const floor = await getOneFloor(floorId)
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

// По id прибора достаём каналы
// Здесь мы получаем всю информацию по id устройства
/*{
    idDevice: '1',
    numberDevice: 7895717,
    channelId: 7,
    channelNumber: 7,
    idMeter: 7,
    numberMeter: 215650853,
    idFlat: 4,
    numberFlat: 17
},*/

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
            const {id: receivedChannelDevice, priborNumberId, chanelId: channelId} = ch
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
                const {id: idReceivedMeter, number: receivedNumberMeter, flatId,sum, numberFlat} = meter
                const flat = await findFlat(flatId)
                listChannel.push({
                    idDevice: idDevice,
                    numberDevice: numberDevice,
                    channelId: idReceivedChannel,
                    channelNumber: receivedNumberChannel,
                    idMeter: idReceivedMeter,
                    numberMeter: receivedNumberMeter,
                    sum: sum,
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
                    sum: null,
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

// Создаём устройство
export const createDevice = async (nameDevice) => {
    try {
        const newDevice = await Models.Pribors.create({
            name: nameDevice
        })

        return newDevice
    } catch (e) {
        console.log(e)
    }
}

// Удалим устройство
export const dropOneDevice = async (idDevice) => {
    try {
        const device = await Models.Pribors.destroy({
            where: {
                id: idDevice
            }
        })

        return device
    } catch (e) {
        console.log(e)
    }
}

// получаем все свойства по id устройства
export const getProperty = async (idDevice) => {
    try {
        const property = await Models.ValueProperty.findAll({
            where: {
                priborId: idDevice
            },
            raw: true
        })

        return property
    } catch (e) {
        console.log(e)
    }
}
// Получим наименования свойств
export const getNameProperty = async (idProperty) => {
    try {
        const name = await Models.NameProperty.findOne({
            where: {
                id: idProperty
            },
            raw: true
        })

        return name
    } catch (e) {
        console.log(e)
    }
}

// Получим свойство устройства и значение
export const getPropertyAndValue = async (idDevice) => {
    try {
        const property = await getProperty(idDevice)

        for (const prop of property) {
            console.log(prop)
        }



    } catch (e) {
        console.log(e)
    }
}