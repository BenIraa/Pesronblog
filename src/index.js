import { initializeApp} from 'firebase/app'
import { getFirestore, collection, getDocs, 
    onSnapshot, addDoc, deleteDoc, doc, 
} from 'firebase/firestore'
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDK6yZSPjlTW63IKLcrTH5vyTAXiWckHqo",
    authDomain: "beniraa-639b8.firebaseapp.com",
    projectId: "beniraa-639b8",
    storageBucket: "beniraa-639b8.appspot.com",
    messagingSenderId: "768639511600",
    appId: "1:768639511600:web:d2d190ec02335a71cf51f5"
  };

  // init firebase app
  initializeApp(firebaseConfig)

  //init service
  const db = getFirestore()
  const auth = getAuth()
  const colRef = collection(db, 'ContactPage')   //collection ref


  
  //on Real time data

  onSnapshot(colRef, (snapshot) =>{
    let ContactPage = []
    snapshot.docs.forEach((doc) =>{
        ContactPage.push({...doc.data(), id: doc.id})
    })
    console.log(ContactPage)
      

  })
// Add Contact Form

  const addContactForm = document.querySelector('.add')
  addContactForm.addEventListener('submit', (e) =>{
      e.preventDefault()
      addDoc(colRef, {
          firstname: addContactForm.firstname.value,
          lastname: addContactForm.lastname.value,
          email: addContactForm.email.value,
          message: addContactForm.message.value,
          phone: addContactForm.phone.value,
      })
      .then(() => {
          addContactForm.reset() // Add new doc and stay on the same page
          alert("Data sent succesfully!")
      })

  })
  

  const LoginForm = document.querySelector('.Login')
  LoginForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const email = LoginForm.email.value
    const password = LoginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
      .then((cred)=> {
          console.log('User Loged In!', cred.user)
      })
      .catch((err) =>{
          console.log(err.message)
      })
})

  //deleting documents
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit', (e) =>{
      e.preventDefault()

      const docRef = doc(db, 'books', deleteBookForm.id.value)

      deleteDoc(docRef)
    .then(() =>{
        deleteBookForm.reset()
    })

  })

//   Adding User!

const SignUpForm = document.querySelector('.SignUp')
SignUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = SignUpForm.email.value
    const password = SignUpForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
       .then((cred) =>{
            console.log('user created:', cred.user)
           SignUpForm.reset()

       })
       .catch((err) => {
           console.log(err.message)
       })

})

// Log in and out for user

const logoutButton = document.querySelector('.Logout')
logoutButton.addEventListener('click', () =>{
    signOut(auth)
     .then(() =>{
          console.log('the user signed out')

     })
     .catch((err) => {
         console.log(err.message)

     })

})


// Subscbing the user when he/she is in 

onAuthStateChanged(auth, (user) => {
    console.log('User status changed:', user)
})

// Unsb for the user / LOG OUT

