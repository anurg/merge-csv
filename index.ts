
type Pizza = {
    name: string
    price: number
}
type Order = {
    Id:number
    pizza : Pizza
    status : string
}

const menu : Pizza[] = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
]

let cashInRegister : number = 100
let nextOrderId : number = 1
const orderQueue : Order[]  = []

function addNewPizza(pizzaObj : Pizza) {
    menu.push(pizzaObj)
}

function placeOrder(pizzaName : string) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in menu.`)
        return new Error()
    }
    cashInRegister += selectedPizza.price
    const newOrder : Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

function completeOrder(orderId : number) {
    let order = orderQueue.find(order => order.id === orderId)
    order.status = "completed"
    return order
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)