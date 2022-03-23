// DOM ELEMENTS
const $email = document.querySelector('.email')
const $password = document.querySelector('.password')
const $login = document.querySelector('.login')
const $error = document.querySelector('.error')
const $fill = document.querySelector('.fill')
// DOM ELEMENTS



window.addEventListener('load', () => {
    if(!localStorage.getItem('auth')){
        localStorage.setItem('auth', false)
    }else{
        if(localStorage.getItem('auth') === 'true'){
            window.open('./index.html', '_self')
        }
    }
})

$login.addEventListener('click' , e => { 
    e.preventDefault()
    if($email.value === '123' && $password.value === '123'){
        localStorage.setItem('auth', true)
        setTimeout(() => {
            $email.style.border = '2px solid #458754'        
            $password.style.border = '2px solid #458754'  
            $error.innerHTML = 'Вы успешно авторизовались! Coвершается переход...'
            $error.classList.add('text-success')  
            $error.classList.remove('text-danger')
        },1000)
        setTimeout(() => {
            window.open('./index.html', '_self')
        },3000)
    }else{
        $email.style.border = '2px solid red'
        $password.style.border = '2px solid red'
        $error.classList.add('text-danger')
        $error.innerHTML = 'Неверный логин или пароль'
    }
})
