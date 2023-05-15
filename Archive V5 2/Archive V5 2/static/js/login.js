
const email = document.getElementById('name-input')
const password = document.getElementById('password-input')

document.getElementById('signIn-btn').addEventListener('click', (e) => {
  e.preventDefault()
  data.login(email.value,password.value).then(data => {
      if(data == true){
        alert('Success! Redirecting to the Mainpage...')
        window.location.href = "honeypot1.html"
      }
      else{
        alert('Wrong Password or Username')
      }
  })
})