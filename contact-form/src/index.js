import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs, addDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBxgMF6UQHIUsNfUknXmFdkOUVCDng4YIs",
    authDomain: "contact-us-289ba.firebaseapp.com",
    projectId: "contact-us-289ba",
    storageBucket: "contact-us-289ba.appspot.com",
    messagingSenderId: "643435976433",
    appId: "1:643435976433:web:93ff6ab01dc5f40ed43b50"
  };


initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, "Business info")

getDocs(colRef)
  .then((snapshot) => {
    let info = []
    snapshot.docs.forEach((doc) => {
      info.push({...doc.data(), id: doc.id})
    })
    console.log(info)
  })
  .catch((err) => {
    console.log(err.message)
  })


const contactForm = document.querySelector(".contact-form")
const input = document.getElementsByTagName("input")
const textArea = document.querySelector("textarea")
const warning = document.querySelectorAll(".warning")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  if(input[3].value.length !== 11 || /^[a-zA-Z\s.,]+$/.test(input[3].value)){
    input[3].nextElementSibling.style.display = "block"
  }
  // const string = /^[a-zA-Z\s.,]+$/

  else if(/\d/.test(input[0].value) || input[0].value.length < 4){
    input[0].nextElementSibling.style.display = "block"
  }

  else if(/\d/.test(input[1].value) || input[1].value.length < 4){
    input[1].nextElementSibling.style.display = "block"
  }
  
  else if(textArea.value.length < 80 || textArea.value.length > 400 || /^[a-zA-Z\s.,]+$/.test(textArea.value)){
    textArea.nextElementSibling.style.display = "block"
  }
  else {
      addDoc(colRef, {
      name: contactForm.name.value,
      company: contactForm.company.value,
      email: contactForm.email.value,
      phone: contactForm.phone.value,
      message: contactForm.message.value
    })
    .then(() => {
      contactForm.reset()
    })

    warning.forEach((warn) => {
      warn.style.display = "none"
    })
  }
  
})