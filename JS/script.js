// localStorage.getItem() - ПОЛУЧИТЬ ДАННЫЕ ИЗ ХРАНИЛИЩА, ТАКЖЕ ОН ПРИНИМАЕТ ОДИН АРГУМЕНТ ТО ЕСТЬ НАЗВАНИЕ ХРАНИЛИЩА

// localStorage.setItem() - ЗАПОЛНИТЬ ХРАНИЛИЩЕ, ПРИНИМАЕТ ДВА АРГУМЕНТА()
// (первый для названия, второе значение которое хотим положить)

// const goods = localStorage.getItem('goods')
// console.log(goods);

// localStorage.setItem('goods', 'Сarrot')
// const ovosh = localStorage.getItem('goods')
// console.log(ovosh);

// let cars = [
//     {id:1, name:'Subaru', price:5000},
//     {id:2, name:'BMW', price:'FREE'},
//     {id:3, name:'Mercedes-Benz', price:3000},
//     {id:4, name:'Tiko', price:9000},
// ]
// localStorage.setItem('cars', JSON.stringify(cars))

// const carBase = JSON.parse(localStorage.getItem('cars'))
// console.log(carBase);





// DOM ELEMENTS
const $name = document.querySelector('.name')
const $surName = document.querySelector('.surName')
const $URL = document.querySelector('.URL')
const $addTODO = document.querySelector('.add-btn')
const $response = document.querySelector('.response')
const $output = document.querySelector('.output')
const $signOut = document.querySelector('.signOut')
// DOM ELEMENTS

window.addEventListener('load', () => {
    if(!localStorage.getItem('todo')){
        localStorage.setItem('todo' , JSON.stringify([]))
    }else{
        const todo = JSON.parse(localStorage.getItem('todo'))
        const todoWithId = todo.map((item , index) => {
            return {...item, id:index}
        })
        localStorage.setItem( 'todo' , JSON.stringify(todoWithId))
        const base = JSON.parse(localStorage.getItem('todo'))
        cardTemplate(base)
    }

})

$signOut.addEventListener('click', e => {
    e.preventDefault()
    localStorage.setItem('auth', false)
    setTimeout(() => {
        window.open('./auth.html', '_self')
    },1000)
})


window.addEventListener('load', () => {
    const $auth = localStorage.getItem('auth')
    if($auth === 'false'){
        window.open('./auth.html', '_self')
    }
})

function cardTemplate(base) {
    const template = base.map(({name, surName, URL,id}) => {
        return `
            <div class='cardTemp'>
                <div class='cards'>
                    <h2>${name}</h2>                    
                    <h2>${surName}</h2>                    
                </div>
                <div class='cardImg'>
                    <img src="${URL}">
                </div>
                <div class='cardfooter'>
                    <button class='tempBtnDel' onclick='deleteCards(${id})'>🗑</button>
                    <button class='tempBtnEdit' onclick='editCards(${id})'> ✏️ </button>
                </div>
            </div>
        `
    }).join('')
    $output.innerHTML = template
}

function deleteCards(idOfBase) {
    const todo = JSON.parse(localStorage.getItem('todo'))
    const filtered = todo.filter(item => item.id !== idOfBase)
    localStorage.setItem('todo', JSON.stringify(filtered))
    window.location.reload()
}

function editCards(idOfBase) {
    const todo = JSON.parse(localStorage.getItem('todo'))
    const edited = todo.map(item => {
        if(item.id === idOfBase){
            item.name = prompt('New Name', item.name)
            item.surName = prompt('New SurName', item.surName)
            item.URL = prompt('New IMG', item.URL)
            return item
        }else{
            return item
        }
    })
    localStorage.setItem('todo',JSON.stringify(edited))
    window.location.reload()
}

$addTODO.addEventListener('click', e => {
    e.preventDefault()
    if($name.value.length === 0 || $surName.value.length === 0 || $URL.value.length === 0){
        if($name.value.length === 0){
            $name.style.borderColor = 'red'
            $response.classList.add('errorActive')
        }
        if($surName.value.length === 0){
            $surName.style.borderColor = 'red'
        }
        if($URL.value.length === 0){
            $URL.style.borderColor = 'red'
            errorButton()
        }
    }else{
        succesButton()
        $response.classList.add('succesActive')
        const base = JSON.parse(localStorage.getItem('todo'))
        localStorage.setItem('todo' , JSON.stringify(
            [...base, {id:1 ,name:$name.value, surName:$surName.value, URL:$URL.value} ]
        ))
        window.location.reload()
    }
})

function errorButton() {
    const errorBtn = 
    `
        <button class='error-btn'>Fill the area ×</button>
    `
    $response.innerHTML = errorBtn
}

function succesButton() {
    const succesBtn = 
    `
        <button class='succes-btn'>Succesfuly added ♥</button>
    `
    $response.innerHTML = succesBtn
}
