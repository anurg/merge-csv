
type Pizza = {
    id:number
    name: string
    price: number
}
type Order = {
    id:number
    pizza : Pizza
    status : "ordered" | "completed"
}
let nextPizzaId = 1
const menu : Pizza[] = [
    { id:nextPizzaId++, name: "Margherita", price: 8 },
    { id:nextPizzaId++, name: "Pepperoni", price: 10 },
    { id:nextPizzaId++, name: "Hawaiian", price: 10 },
    { id:nextPizzaId++, name: "Veggie", price: 9 },
]

let cashInRegister : number = 100
let nextOrderId : number = 1
const orderQueue : Order[]  = []

function addNewPizza(name:string, price:number) {
    const pizzaObj = {
        id:nextPizzaId++,
        name:name,
        price:price
    }
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
    let order : Order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        console.error(`${orderId} does not exist`)
        return
    }
    order.status = "completed"
    return order
}

addNewPizza({name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)

let myName : "Bob" = "Bob"
const myName1 : "Bob" = "Bob"
type UserRole = "guest" | "member" | "admin"

let userRole : UserRole = "guest"
type User = {
    name : string
    role: "guest" | "member" | "admin"
}

let user : User = {
    name : "Anurag",
    role : "admin"
}

let users : User[] = [
    {name : "john_doe",role : "admin"},
    {name : "jane_doe",role : "member"},
    {name : "guest_user",role : "guest"}
]

export function getPizzaDetails(identifier : string | number ) {
    let pizza : Pizza
    if (typeof (identifier) === "string") {
        // pizza = menu.find( pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
        pizza = menu.find( pizza => pizza.name === identifier)
    } else if (typeof (identifier) === "number") {
        pizza = menu.find( pizza => pizza.id === identifier)
    } else {
        throw new Error("Identifier should be string or number")
    }
    return `Pizza Name: ${pizza.name} Pizza Price: ${pizza.price}`
}
console.log(getPizzaDetails(7))
console.log(getPizzaDetails("bbq chicken"))

function fetchUserDetails(username:string) : User {
    const user = users.find(user=>user.name === username)
    if (!user) {
        throw new Error(`${username} does not exist`)
    }
    return user
}

console.log(fetchUserDetails("john_doe")?.role)

let myVar  = 1
myVar = "Anurag"