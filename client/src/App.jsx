import { useEffect, useState } from 'react'
import Cling from '@cling-se/widget'
import Navbar from './components/Navbar'

const styleVariables = {
  '--primary-font': '"Exo 2", sans-serif',
  '--primary-color-50': '132deg 50% 94%',
  '--primary-color-100': '133deg 60% 87%',
  '--primary-color-200': '137deg 66% 71%',
  '--primary-color-300': '140deg 75% 55%',
  '--primary-color-400': '143deg 85% 39%',
  '--primary-color-500': '146deg 100% 27%',
  '--primary-color-600': '149deg 100% 21%',
  '--primary-color-700': '152deg 100% 17%',
  '--primary-color-800': '155deg 100% 11%',
  '--primary-color-900': '159deg 100% 7%',
  '--gray-color-50': '210deg 20% 98%',
  '--gray-color-100': '220deg 14% 96%',
  '--gray-color-200': '220deg 13% 92%',
  '--gray-color-300': '216deg 12% 85%',
  '--gray-color-400': '218deg 11% 65%',
  '--gray-color-500': '220deg 9% 46%',
  '--gray-color-600': '215deg 14% 34%',
  '--gray-color-700': '217deg 19% 27%',
  '--gray-color-800': '215deg 28% 17%',
  '--gray-color-900': '221deg 39% 11%'
}

function App() {
  useEffect(() => {
    // Init the Cling instance
    Cling.init({
      ui: {
        vars: styleVariables
      }
    })
  }, [])

  const [loggedIn, setLoggedIn] = useState(false)
  const onAuth = async (type) => {
    // Before we can authenticate the user, we need to generate an auth code
    // In order to generate an auth code we need to
    // 1. Setup partner relations to Cling api
    // 2. Use secret to generate auth code on behalf of user
    // 3. pass auth code from server -> client

    let isLoggedIn = false

    // Authenticate the user
    if (type === 'email') {
      isLoggedIn = await Cling.auth({
        // If you don't have an account, create one on https://app.dev.cling.se/register
        method: 'standard',
        email: 'widget-demo@cling.se',
        password: 'Widgettest123',
      })
    } else if (type === 'server') {
      // Using the server example
      const serverUrl = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:3001'
      // Ask server to match existing or create a new user
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyUser: {
            id: 'uniqueUserId',
            email: 'uniqueUserId@cling.se',
          },
          company: {
            id: 'uniqueCompanyId',
            name: 'uniqueCompanyId AB',
          },
         })
      };
      const response = await fetch(`${serverUrl}/auth`, requestOptions)
      const { authToken } = await response.json()
      // Use the authToken to authenticate as the user
      isLoggedIn = await Cling.auth({
        method: 'authToken',
        authToken,
      })
    }

    setLoggedIn(isLoggedIn)
  }

  const [file, setFile] = useState(null)
  const [doc, setDoc] = useState(null)

  const onUpload = async (e) => {
    const inputFile = 'https://cling-staging-uploads.s3.eu-central-1.amazonaws.com/company/286/1669045349402_ENERGYSTAR1pdf' || e.target.files[0]
    console.log(inputFile)
    // setFile(inputFile)

    // Prepare the document form
    const myDoc = await Cling.document.new()

    myDoc.addBlock().pdf(inputFile) // add pdf section
    myDoc.addBlock().answer() // add answer section (accept, deny buttons)

    // Register event listener / callback
    myDoc.on('save', (data) => {
      alert('Document has been saved.')
    })

    setDoc(myDoc)
  }

  const openSendWindow = () => {
    console.log(doc)

    // Open send form ui for document
    doc.ui.send.open()
  }

  // const getDocument = async () => {
  //   const id = '636b4befc434aa77b09349b3' // document bound to widget-demo@cling.se
  //   console.log('Fetching doc: ', id)

  //   // Retrieve a document
  //   // NOTE: get returns READONLY versions of documents
  //   const res = await Cling.document.get(id)

  //   console.log(res)

  //   // Access its properties through the document class
  //   const name = res.getProperty('data.name')
  //   const status = res.getProperty('status')

  //   console.log('Doc name: ', name)
  //   console.log('Doc status: ', status)

  //   // setDoc(res)
  // }

  // const updateDoc = async () => {
  //   const name = document.getElementById('doc-name')?.value

  //   if (!name) throw new Error('no name provided')

  //   // Clone doc into editable version since it's readonly at this stage
  //   const editDoc = await doc.toForm()

  //   // Update property
  //   editDoc.setProperty('data.name', name)

  //   const _id = editDoc.getProperty('id')
  //   const _name = editDoc.getProperty('data.name')
  //   console.log('Updating doc ', _id)
  //   console.log('With name: ', _name)

  //   // Update/save document
  //   await editDoc.save()

  //   console.log('done')
  // }

  // Send a reminder
  // ...

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar />
      <div className="flex-auto flex flex-col h-full py-12 px-8">
        <div className="bg-white w-full p-10 rounded shadow-xl border border-gray-300 mb-8">
          <div className="flex w-full">
            <div className="flex-auto">
              <div className="text-2xl font-semibold pb-4">🔑 Authenticate</div>
            </div>
            {loggedIn ? (
              <div className="text-xl text-gray-500 py-3 px-4 bg-gray-100 rounded">✅ Logged in</div>
            ) : (
              <div>
                <button onClick={() => onAuth('server')} className="btn">
                  Log in with server
                </button>
                <button onClick={() => onAuth('email')} className="btn">
                  Log in with email + password
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={loggedIn ? '' : 'pointer-events-none opacity-30'}>
          <div className="bg-white w-full p-10 rounded shadow-xl border border-gray-300 mb-8">
            <div className="flex w-full">
              <div className="flex-auto">
                <div className="text-2xl font-semibold pb-4">📬 Create & Send a Document</div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <label className="block">
                  <input
                    type="file"
                    className="
                      bg-gray-100
                      border border-gray-300 rounded cursor-pointer
                      text-lg text-grey-500
                      file:mr-5 file:py-3 file:px-4 file:text-xl
                      file:rounded-left file:border-0
                      file:bg-primary-500 file:text-white
                      hover:file:cursor-pointer
                    "
                    onChange={onUpload}
                  />
                </label>
                <button onClick={openSendWindow} className="btn block">
                  Open send window
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex flex-col justify-center items-center pt-10">
    //   <label className="bg-gray-800 text-white p-2 rounded mb-4">
    //     Upload PDF
    //     <input type="file" className="invisible h-0 w-0" onChange={onUpload} />
    //   </label>
    //   {
    //     !doc ? (
    //       <button
    //         className="bg-gray-800 text-white p-2 rounded mb-4"
    //         onClick={getDoc}
    //       >
    //         Get a document
    //       </button>
    //     )
    //     : (
    //       <div>
    //         <input type="text" className="border" id="doc-name" placeholder="Document name"/>
    //         <button type="text" className="bg-gray-800 text-white p-2 rounded" onClick={updateDoc}>Update</button>
    //       </div>)
    //   }
    // </div>
  )
}

export default App
