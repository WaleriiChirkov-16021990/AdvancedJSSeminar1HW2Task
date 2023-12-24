'use strict';

// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать.
// Каждая итерация должна возвращать следующий альбом из коллекции.
//
// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator.
// Каждый альбом имеет следующую структуру:
//
// {
//     title: "Название альбома",
//         artist: "Исполнитель",
//     year: "Год выпуска"
// }
// • Реализуйте кастомный итератор для объекта musicCollection.
//     Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате
// Название альбома - Исполнитель (Год выпуска)


const musicCollection = {
    musicAlbums: [
        {
            title: "Название альбома1",
            artist: "Исполнитель1",
            year: "Год выпуска1"
        },
        {
            title: "Название альбома2",
            artist: "Исполнитель2",
            year: "Год выпуска2"
        },
        {
            title: "Название альбома3",
            artist: "Исполнитель3",
            year: "Год выпуска3"
        },
        {
            title: "Название альбома4",
            artist: "Исполнитель4",
            year: "Год выпуска4"
        },
        {
            title: "Название альбома5",
            artist: "Исполнитель5",
            year: "Год выпуска5"
        }
    ],
    [Symbol.iterator]() {
        this.index = 0;
        return {
            next: () => {
                return (this.index < this.musicAlbums.length) ?
                    {value: this.musicAlbums[this.index++], done: false} :
                    {done: true};
            }
        }
    },

}
console.log('Tasks 1');
for (let album of musicCollection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
}


/*
Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах.
Клиенты приходят и делают заказы на разные блюда.

Необходимо создать систему управления этими заказами, которая позволит:

• Отслеживать, какой повар готовит какое блюдо.
• Записывать, какие блюда заказал каждый клиент.

Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента.
В качестве ключей для клиентов используйте объекты.

Повара и их специализации:

Виктор - специализация: Пицца.
Ольга - специализация: Суши.
Дмитрий - специализация: Десерты.

Блюда и их повара:

Пицца "Маргарита" - повар: Виктор.
Пицца "Пепперони" - повар: Виктор.
Суши "Филадельфия" - повар: Ольга.
Суши "Калифорния" - повар: Ольга.
Тирамису - повар: Дмитрий.
Чизкейк - повар: Дмитрий.

Заказы:

Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
Клиент Ирина заказала: Чизкейк.
 */

function Client(name, age) {
    this[Symbol('id')] = Symbol.for(name);
    this.name = name;
    this.age = age;
}

const client1 = new Client("Alexey", 25);
const client2 = new Client("Maria", 30);
const client3 = new Client("Irina", 19);

const defaultRestaurants = {
    cooker: new Map().set("Pizza", "повар: Виктор").set("Sushi", "повар: Ольга").set("Desserts", "повар: Дмитрий"),
    dish: new Map(),
    orders: new Map(),
}

function dishCookAdd(displayName, nameDish) {
    defaultRestaurants.dish.set(nameDish, displayName);
}

defaultRestaurants.dish.set("Pizza Margarita", "повар: Виктор").set("Pizza Pepperoni", "повар: Виктор")
    .set("Sushi Filadelfia", "повар: Ольга").set("Sushi California", "повар: Ольга")
    .set("Tiramisu", "повар: Дмитрий").set("Cheesecake", "повар: Дмитрий");

function nextOrderAdd(nameClient, ageClient, nameDish1, nameDish2) {
    const nextClient = new Client(nameClient, ageClient);
    defaultRestaurants.orders.set(nextClient, Array.from(nameDish1, nameDish2));
}

defaultRestaurants.orders.set(client1, ["Pizza Pepperoni", "Tiramisu"])
    .set(client2, ["Sushi California", "Pizza Margarita"])
    .set(client3, ["Cheesecake"]);

function getDishAndCookFromEveryoneClient() {
    const mapForClient = new Map();
    for (let [key, value] of defaultRestaurants.orders) {
        const tempDish = new Map();
        for (const dish of value) {
            if (defaultRestaurants.dish.has(dish)) {
                if (tempDish.has(defaultRestaurants.dish.get(dish))) {
                    tempDish.set(defaultRestaurants.dish.get(dish), tempDish.get(defaultRestaurants.dish.get(dish)).add(dish));
                } else if (!tempDish.has(defaultRestaurants.dish.get(dish))) {
                    tempDish.set(defaultRestaurants.dish.get(dish), dish);
                } else {
                    throw new Error("Something went wrong");
                }
            }
        }
        mapForClient.set(key, tempDish);
    }
    return mapForClient;
}

console.log('Task 2 ')
console.log(getDishAndCookFromEveryoneClient())


function getDishFromEveryoneCook() {
    let tempDish = new Map();
    for (let [key, value] of defaultRestaurants.orders) {
        for (let dish of value) {
            if (defaultRestaurants.dish.has(dish)) {
                if (tempDish.has(defaultRestaurants.dish.get(dish))) {
                    tempDish.set(defaultRestaurants.dish.get(dish), Array.of(...tempDish.get(defaultRestaurants.dish.get(dish)),dish));
                } else if (!tempDish.has(defaultRestaurants.dish.get(dish))) {
                    tempDish.set(defaultRestaurants.dish.get(dish), Array.of(dish));
                } else {
                    throw new Error("Something went wrong");
                }
            }
        }

    }
    return tempDish;
}

console.log(getDishFromEveryoneCook())