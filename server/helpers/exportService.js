import xlsx from 'xlsx';
import path from 'path'

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();

    const workSheetData = [
        workSheetColumnNames,
        ...data
    ];

    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData)
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName)
    xlsx.writeFile(workBook, path.resolve(filePath))
}

/*{
    typePlace: 'Квартира',
    priborNumberChannelId: 160,
    channelId: 10,
    channel: 10,
    typeMeter: 'ГВС',
    priborNumber: 123456654,
    namePribor: 'Пульсар10-М',
    paramRes: 'Объём1(м3)',
    flats: '',
    serNumberMeter: ''
}*/


const exportMetersToExcel = (meters, workSheetColumnNames, workSheetName, filePath) => {
    const data = meters.map((meter) => {
        return [
            meter.typePlace,
            meter.namePlace,
            meter.resurs,
            meter.paramsResurs,
            meter.twoDevice,
            meter.paramsTwoDevice,
            meter.networkAddress,
            meter.oneDevice,
            meter.serialNumber,
            meter.additionInfo,

        ]
    })

    exportExcel(data, workSheetColumnNames, workSheetName, filePath)


}

export default exportMetersToExcel;