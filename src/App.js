import React, { useState, useEffect } from 'react'

// Including Firebase dependency
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getStorage, ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage'

// Including screens. The Contact screen is removed. Before adding add its name in localization.js
import Home from './layouts/screens/Home'
import About from './layouts/screens/About'
import Services from './layouts/screens/Services'
import Works from './layouts/screens/Works'

import NavigationPanel from './layouts/components/NavigationPanel'

// Including files
import firebaseConfig from './data/firebaseConfig'
import localization from './data/localization'

const App = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const storage = getStorage(app)

  // Set list of portfolio works
  const [workList, setWorkList] = useState([])

  // A function to create new ID
  const generateRandomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(randomIndex)
    }
    return result
  }

  // Load portfolio works and previews
  useEffect(() => {
    let items = []
    let images = []

    listAll(ref(storage, 'previews'))
    .then(res => {
      res.items.forEach(itemRef => {
        getDownloadURL(itemRef).then(url => {
          images.push(itemRef)
        })
      })
      getDocs(collection(db, 'portfolio'))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let image = images.find(image => image['_location']['path_'].split('/')[image['_location']['path_'].split('/').length - 1].split('.')[0] === doc.data().image)
          getDownloadURL(image)
          .then(url => {
            items.push({ data: doc.data(), image: url})
          })
        })
      })
      .then(() => {
        console.log(items)
        setWorkList(items)
      })
      .catch(error => console.error(error))
    })
  }, [])

  // Set current viewable screen and user's language
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [languageId, setLanguageId] = useState(
    localStorage.getItem('languageId') === null ?
      ['de', 'ua', 'ru'].find(id => id === navigator.language) ? navigator.language : 'en'
      : localStorage.getItem('languageId')
  )
  const [currentLocalization, setCurrentLocalization] = useState(localization[languageId])

  // Set an object with translated words
  useEffect(() => {
    setCurrentLocalization(localization[languageId])
  }, [languageId])

  // Set new viewable screen
  const getCurrentPageIndex = value => {
    setCurrentPageIndex(value)
  }

  // Set user device's language or already choosed one
  const getCurrentLanguage = value => {
    setCurrentLocalization(localization[value.id])
    localStorage.setItem('languageId', value.id)
    setLanguageId(value.id)
  }

  /*
  const submitForm = async value => {
    const newId = generateRandomID()

    const docRef = doc(db, 'orders', newId)
    const fileRef = doc(db, 'files', newId)

    const filesArray = Array.from(value.files)

    const storageRef = ref(storage, `uploads/${newId}`)
    const filePromises = filesArray.map(file => {
      return uploadBytes(storageRef, file)
    })

    await Promise.all(filePromises)

    const downloadUrls = await Promise.all(
      filesArray.map(async file => {
        return await getDownloadURL(storageRef)
      })
    )

    await setDoc(fileRef, {
      fileUrls: downloadUrls
    })
    .catch(error => console.error(error))

    await setDoc(docRef, value.data)
    .catch(error => console.error(error))
  }*/

  const components = [
    <Home localization={currentLocalization.home}/>, 
    <About
      localization={currentLocalization.about}
      languageId={languageId}
    />,
    <Services
      localization={currentLocalization.services}
      getCurrentPageIndex={getCurrentPageIndex}
    />, 
    <Works
      localization={currentLocalization.works}
      works={workList}
    />,
    /*<Contact
      localization={currentLocalization.contacts}
      onSubmit={submitForm}
    />*/
  ]

  return (
    <div
      className='container'
    >
      <div
        className='background'
        style={{
          opacity: currentPageIndex === 0 ? 1 : 0
        }}
      />
      <NavigationPanel
        getCurrentPageIndex={getCurrentPageIndex}
        getCurrentLanguage={getCurrentLanguage}
        setCurrentPageIndex={currentPageIndex}
        localization={currentLocalization.navigation_panel}
      />
      <div className='pages'>
        {components.map((page, index) => {
          return (
            <div
              key={index}
              className='pages__item'
              style={{
                opacity: index === currentPageIndex ? 1 : 0,
                zIndex: index === currentPageIndex ? 0 : -1
              }}
            >
              { page }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App