import Models from "../models/models.js";


// Получим бренды
export const getAllBrands = async () => {
    try {
        const brands = await Models.Brands.findAll({
            raw: true
        })

        return brands
    } catch (e) {
        console.log(e)
    }
}

// Получим пренд по наименованию
export const getOneBrandName= async (brandName) => {
    try {
        const brand = await Models.Brands.findOne({
            where: {
                name: brandName
            },
            raw: true
        })

        return brand
    } catch (e) {
        console.log(e)
    }
}

// Получим пренд по id
export const getOneBrand= async (idBrand) => {
    try {
        const brand = await Models.Brands.findOne({
            where: {
                id: idBrand
            },
            raw: true
        })

        return brand
    } catch (e) {
        console.log(e)
    }
}

// Создадим бренд
export const createOneBrand = async (nameBrand) => {
    try {
        const brand = await Models.Brands.create({
            name: nameBrand
        })
        return brand
    } catch (e) {
        console.log(e)
    }
}
// Редактируем бренд
export const editOneBrand = async (idBrand,nameBrand) => {
    try {
        const brand = await Models.Brands.findOne({
            where: {
                id: idBrand
            }
        })

        await brand.update({
            name: nameBrand
        })

        return brand
    } catch (e) {
        console.log(e)
    }
}
// Удалим бренд
export const dropOneBrand = async (idBrand) => {
    try {
        const brand = await Models.Brands.destroy({
            where: {
                id: idBrand
            }
        })

        return brand
    } catch (e) {
        console.log(e)
    }
}