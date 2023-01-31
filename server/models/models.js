import { Sequelize } from "sequelize";
import sequelize from "../db.js";


// Здесь объект
class AllObjects extends Sequelize.Model {}
AllObjects.init (
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }

    },

    {
        sequelize, modelName: 'objects'
    }
)


// Описание объекта
// У объекта 1 описание, а у описания много оббъектов
//  У объекта должен храниться ключ описания
class DescriptionObject extends Sequelize.Model {}

DescriptionObject.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    flat: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    section: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    office: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    metersInFlat: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    metersInGr: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    systemBolid: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    systemTeplovodohran: {
        type: Sequelize.BOOLEAN,
        default: false
    }
},

    {
        sequelize, modelName: 'description_objects'
    })
DescriptionObject.hasMany(AllObjects);
AllObjects.belongsTo(DescriptionObject);

// Номер объекта хранится в секциях
// Схема содержит Секцию №,  количество этажей
class Section extends Sequelize.Model {}
Section.init ({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    from: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    to: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    flat: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    office: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    flatInFloor: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    pipes: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
},{
    sequelize, modelName: 'section'
})

AllObjects.hasMany(Section);
Section.belongsTo(AllObjects);
// Опишем этажи , у секций много этажей а у этажа одна секций
// id Секции будет в этажах
// id Дома в этажах
class Floors extends Sequelize.Model {}
Floors.init({

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        }

}, {
    sequelize, modelName: 'floors'
})
// Создаём связь
Section.hasMany(Floors);
Floors.belongsTo(Section);
AllObjects.hasMany(Floors);
Floors.belongsTo(AllObjects);


// Опишем квартиры
// id этажа в квартирах
// id секции в квартирах
// id дома в квартирах

class Flats extends Sequelize.Model {}
Flats.init({

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }

}, {
    sequelize, modelName: 'flats'
})
Section.hasMany(Flats);
Flats.belongsTo(Section);
AllObjects.hasMany(Flats);
Flats.belongsTo(AllObjects);
Floors.hasMany(Flats);
Flats.belongsTo(Floors);

class Office extends Sequelize.Model {}
Office.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
},{
    sequelize, modelName: 'office'
})
Section.hasMany(Office);
Office.belongsTo(Section);
AllObjects.hasMany(Office);
Office.belongsTo(AllObjects);
Floors.hasMany(Office);
Office.belongsTo(Floors);

// типы счётчиков
class TypeMeter extends Sequelize.Model {}
TypeMeter.init (
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        sequelize, modelName: 'type_meter'
    }
)

//Бренды
class Brands extends Sequelize.Model {}
Brands.init (
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        sequelize, modelName: 'brands'
    }
)

// Счётчики
class Meter extends Sequelize.Model {}
Meter.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        sequelize, modelName: 'meter'
    }
)
// Прибор наименование
class Pribors extends Sequelize.Model {}
Pribors.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'pribors'
})
// Свойства для приборов, счётчиков и т.д
class NameProperty extends Sequelize.Model {}
NameProperty.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'name_property'
})
// Значения свойств
class ValueProperty extends Sequelize.Model {}
ValueProperty.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    }
}, {
    sequelize, modelName: 'value_property'
})


/*
class PriborsValueProperty extends Sequelize.Model {}

PriborsValueProperty.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'pribors_value'
})
*/


// У типов много счётчиков , а у счётчиков один тип(В счётчиках должен быть указан тип)
// Создаём связь
// Ключ в типах
/*Meter.hasMany(TypeMeter);
TypeMeter.belongsTo(Meter);*/
//
TypeMeter.hasMany(Meter);
Meter.belongsTo(TypeMeter);
// Связь счётчик-бренд
Brands.hasMany(Meter);
Meter.belongsTo(Brands);

// Создадим связь Description и sections многие ко многим



// Создаём связь приборов и значения свойств
/*NameProperty.hasMany(Pribors);
Pribors.belongsTo(NameProperty);*/

NameProperty.hasMany(ValueProperty);
ValueProperty.belongsTo(NameProperty);

Pribors.hasMany(ValueProperty);
ValueProperty.belongsTo(Pribors);

/*
Pribors.belongsToMany(ValueProperty, {through: PriborsValueProperty});
ValueProperty.belongsToMany(Pribors, {through: PriborsValueProperty});
*/


// Здесь хранятся номера счётчиков со связью к объектам и типам счётчков
class MeterNumber extends Sequelize.Model {}
MeterNumber.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    sum: {
        type: Sequelize.STRING,
        allowNull: true
    },
    numberSt: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    sequelize, modelName: 'meter_number'
})

// Делаем связи
// Привязываем счётчик
Meter.hasMany(MeterNumber);
MeterNumber.belongsTo(Meter);
// Привязываем объект
AllObjects.hasMany(MeterNumber);
MeterNumber.belongsTo(AllObjects);
// Привязываем секцию
Section.hasMany(MeterNumber);
MeterNumber.belongsTo(Section);
// Привязываем этаж
Floors.hasMany(MeterNumber);
MeterNumber.belongsTo(Floors);
// Привязываем квартиру
Flats.hasMany(MeterNumber);
MeterNumber.belongsTo(Flats);
Office.hasMany(MeterNumber);
MeterNumber.belongsTo(Office);



// Здесь хранятся номера приборов со связью к объектам и типам приборов
class PriborNumber extends Sequelize.Model {}
PriborNumber.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
    numberSt: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    }
}, {
    sequelize, modelName: 'pribor_number'
})
// Делаем связи
// Привязываем счётчик
Pribors.hasMany(PriborNumber);
PriborNumber.belongsTo(Pribors);
// Привязываем объект
AllObjects.hasMany(PriborNumber);
PriborNumber.belongsTo(AllObjects);
// Привязываем секцию
Section.hasMany(PriborNumber);
PriborNumber.belongsTo(Section);
// Привязываем этаж
Floors.hasMany(PriborNumber);
PriborNumber.belongsTo(Floors);
// Привязываем квартиру
Flats.hasMany(PriborNumber);
PriborNumber.belongsTo(Flats);
// Привязываем офис
Office.hasMany(PriborNumber);
PriborNumber.belongsTo(Office);
// Привязываем id счётчиков
MeterNumber.hasMany(PriborNumber);
PriborNumber.belongsTo(MeterNumber);

// Добавим таблицу с каналами

class Chanel extends Sequelize.Model {}

Chanel.init ({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
    }
}, {
    sequelize, modelName: 'chanel'
})

// У многих приборов с номерами много каналов, а у многих каналов много приборов
// Таблица для них
class PriborNumberChanel extends Sequelize.Model {}
PriborNumberChanel.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'pribor_number_chanel'
})
// Создаём связь много ко многим
PriborNumber.belongsToMany(Chanel, {through: PriborNumberChanel})
Chanel.belongsToMany(PriborNumber, {through: PriborNumberChanel})


// Связываем НомераПриборов_Каналы с таблицей номеров счётчиков
class PriborNumberChanelNumberMeters extends Sequelize.Model {}
PriborNumberChanelNumberMeters.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'p_n_chanel_m_n'
})
PriborNumberChanel.belongsToMany(MeterNumber, {through: PriborNumberChanelNumberMeters})
MeterNumber.belongsToMany(PriborNumberChanel, {through: PriborNumberChanelNumberMeters})


// Создаём для связи PriborNumberChanel и Flat таблицу
class PriborNumberChanelFlat extends Sequelize.Model {}
PriborNumberChanelFlat.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'prib_num_ch_flat'
})
PriborNumberChanel.belongsToMany(Flats, {through: PriborNumberChanelFlat})
Flats.belongsToMany(PriborNumberChanel, {through: PriborNumberChanelFlat})
// Создаём для связи PriborNumberChanel и Office таблицу
class PriborNumberChanelOffice extends Sequelize.Model {}
PriborNumberChanelOffice.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize, modelName: 'prib_num_ch_office'
})
PriborNumberChanel.belongsToMany(Office, {through: PriborNumberChanelOffice})
Office.belongsToMany(PriborNumberChanel, {through: PriborNumberChanelOffice})

/*// Связь приборов каналов
class PriborChanel extends Sequelize.Model {}*/




export default {Meter, TypeMeter, AllObjects, DescriptionObject, Section, Floors, Brands, NameProperty, Pribors, ValueProperty, MeterNumber, PriborNumber, Chanel,PriborNumberChanel,PriborNumberChanelNumberMeters, Flats, Office, PriborNumberChanelFlat, PriborNumberChanelOffice};
