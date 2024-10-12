import { httpService } from './http.service.js'

const BASE_URL = 'product/'

export const productService = {
    query,
    getById,
    save,
    remove,
    getEmptyProduct,
    getCategorys,
    getDefaultFilter,
    getDefaultSort
}

//demo data
// const products = [
//     {
//         _id: "6707f6d6ea71993ecfe2672e",
//         name: "Carrot",
//         sku: 1001,
//         description: "Fresh and crunchy carrots, perfect for salads or cooking.",
//         category: "Vegetable",
//         marketingDate: 1727952000000,
//         price: 2.5
//     },
//     {
//         _id: "6707f6d6ea71993ecfe2672f",
//         name: "Apple",
//         sku: 1002,
//         description: "Sweet and delicious apples, great as a snack.",
//         category: "Fruit",
//         marketingDate: 1727865600000,
//         price: 3
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26730",
//         name: "Potato",
//         sku: 1003,
//         description: "Red potatoes, excellent for cooking.",
//         category: "Field Crop",
//         marketingDate: 1727779200000,
//         price: 1.2
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26731",
//         name: "Tomato",
//         sku: 1004,
//         description: "Ripe tomatoes, ideal for salads and sauces.",
//         category: "Vegetable",
//         marketingDate: 1727692800000,
//         price: 2.8
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26732",
//         name: "Banana",
//         sku: 1005,
//         description: "Fresh bananas, a great source of energy.",
//         category: "Fruit",
//         marketingDate: 1727606400000,
//         price: 1.5
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26733",
//         name: "Cucumber",
//         sku: 1006,
//         description: "Crisp cucumbers, perfect for refreshing salads.",
//         category: "Vegetable",
//         marketingDate: 1727520000000,
//         price: 1.8
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26734",
//         name: "Orange",
//         sku: 1007,
//         description: "Juicy oranges, full of vitamin C.",
//         category: "Fruit",
//         marketingDate: 1727433600000,
//         price: 2.2
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26735",
//         name: "Spinach",
//         sku: 1008,
//         description: "Fresh spinach, rich in iron and vitamins.",
//         category: "Vegetable",
//         marketingDate: 1727347200000,
//         price: 3.5
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26736",
//         name: "Strawberry",
//         sku: 1009,
//         description: "Sweet strawberries, perfect for desserts.",
//         category: "Fruit",
//         marketingDate: 1727260800000,
//         price: 4
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26737",
//         name: "Bell Pepper",
//         sku: 1010,
//         description: "Colorful bell peppers, great for salads and stir-fries.",
//         category: "Vegetable",
//         marketingDate: 1727174400000,
//         price: 3
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26738",
//         name: "Zucchini",
//         sku: 1011,
//         description: "Tender zucchini, perfect for grilling.",
//         category: "Vegetable",
//         marketingDate: 1727088000000,
//         price: 2.1
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26739",
//         name: "Pineapple",
//         sku: 1012,
//         description: "Sweet and tropical pineapples, great for smoothies.",
//         category: "Fruit",
//         marketingDate: 1727001600000,
//         price: 5
//     },
//     {
//         _id: "6707f6d6ea71993ecfe2673a",
//         name: "Grapes",
//         sku: 1013,
//         description: "Fresh grapes, perfect for snacking.",
//         category: "Fruit",
//         marketingDate: 1726915200000,
//         price: 4.5
//     },
//     {
//         _id: "6707f6d6ea71993ecfe2673b",
//         name: "Lettuce",
//         sku: 1014,
//         description: "Crispy lettuce, ideal for salads.",
//         category: "Vegetable",
//         marketingDate: 1726828800000,
//         price: 1
//     },
//     {
//         _id: "6707f6d6ea71993ecfe2673c",
//         name: "Eggplant",
//         sku: 1015,
//         description: "Rich and flavorful eggplants, great for roasting.",
//         category: "Vegetable",
//         marketingDate: 1726742400000,
//         price: 3.2
//     },
//     {
//         _id: "6707f6d6ea71993ecfe2673d",
//         name: "Shampoo",
//         sku: 1016,
//         description: "Moisturizing shampoo for healthy, shiny hair.",
//         category: "Personal Care",
//         marketingDate: 1727952000000,
//         price: 6.5
//     },
//     {
//         _id: "6707f6d6ea71993ecfe2673e",
//         name: "Dish Soap",
//         sku: 1017,
//         description: "Effective dish soap that cuts grease and leaves dishes sparkling clean.",
//         category: "Household",
//         marketingDate: 1727865600000,
//         price: 4
//     },
//     {
//         _id: "6707f6d6ea71993ecfe2673f",
//         name: "Washing Powder",
//         sku: 1018,
//         description: "Powerful washing powder for clean and fresh laundry.",
//         category: "Household",
//         marketingDate: 1727779200000,
//         price: 7.5
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26740",
//         name: "Toothpaste",
//         sku: 1019,
//         description: "Whitening toothpaste for a brighter smile.",
//         category: "Personal Care",
//         marketingDate: 1727692800000,
//         price: 3.2
//     },
//     {
//         _id: "6707f6d6ea71993ecfe26741",
//         name: "Coffee",
//         sku: 1020,
//         description: "Rich and flavorful ground coffee for a perfect brew.",
//         category: "Beverage",
//         marketingDate: 1727606400000,
//         price: 9
//     }
// ]

const categorys = [
    'Personal Care',
    'Home',
    'Kitchen',
    'Fitness',
    'Stationery',
    'Electronics',
    'Pet Care',
    'Beverage',
    'Snack',
    'Sport'
]

function query(filterBy = {}, sortBy = {}) {
    const params = { filterBy, sortBy }
    return httpService.get(BASE_URL, params)
}


function getById(productId) {
    return httpService.get(BASE_URL + productId)
}

function remove(productId) {
    return httpService.delete(BASE_URL + productId)
    // return asyncStorageService.remove(STORAGE_KEY, productId)
}

//for add and edit (id depends)
function save(product) {
    if (product._id) {
        console.log('product', BASE_URL +  product._id);

        return httpService.put(BASE_URL +  product._id, product)
        // return asyncStorageService.put(STORAGE_KEY, product)
    } else {
        return httpService.post(BASE_URL, product)
        // return asyncStorageService.post(STORAGE_KEY, product)
    }
}

function getEmptyProduct() {
    const timestamp = Date.now() - (7 * 24 * 60 * 60 * 1000);
    return {
        name: "",
        sku: 9999,
        description: "",
        category: "",
        marketingDate: timestamp,
        price: 1,
    }
}

function getCategorys() {
    return categorys
}

function getDefaultFilter() {
    return { name: '' }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}

