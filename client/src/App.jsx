import { useEffect, useState } from 'react'
import Cling from '@cling-se/widget'

function App() {
  useEffect(() => {
    // Init the Cling instance
    Cling.init()

    // Before we can authenticate the user, we need to generate an auth code
    // In order to generate an auth code we need to
    // 1. Setup partner relations to Cling api
    // 2. Use secret to generate auth code on behalf of user
    // 3. pass auth code from server -> client

    // Authenticate the user
    Cling.auth({
      method: 'standard', // Use Email and password to login
      email: 'widget-demo@cling.se', // If you don't have an account, create one on https://app.dev.cling.se/register
      password: 'Widgettest123'
    })
    
    let authToken
    if (!authToken) return

    // Authenticate user with authToken
    Cling.auth({
      method: 'authToken',
      authToken: 'abc...'
    })
  }, [])

  const onUpload = async (e) => {
    const file = e.target.files[0];

    // Prepare a document and attach the pdf to it
    const myDoc = await Cling.document.new()
    myDoc.addBlock().pdf(file)

    // add answer section to doc (accept, deny buttons)
    myDoc.addBlock().answer()

    // Register event listener / callback
    myDoc.on('save', (data) => {
      console.log('Saved document with data: ', data)
    })

    // Open send form ui for document
    myDoc.ui.send.open()
  }

  const [doc, setDoc] = useState(null);

  const getDoc = async () => {
    const id = '636b4befc434aa77b09349b3' // document bound to widget-demo@cling.se
    console.log('Fetching doc: ', id)

    // Retrieve a document
    // NOTE: get returns READONLY versions of documents
    const res = await Cling.document.get(id);

    console.log(res);
    
    // Access its properties through the document class
    const name = res.getProperty('data.name')
    const status = res.getProperty('status')
    
    console.log('Doc name: ', name)
    console.log('Doc status: ', status)

    setDoc(res)
  }

  const updateDoc = async () => {
    
    const name = document.getElementById('doc-name')?.value
    
    if (!name) throw new Error('no name provided')

    // Clone doc into editable version since it's readonly at this stage
    const editDoc = await doc.toForm()

    // Update property
    editDoc.setProperty('data.name', name)
    
    const _id = editDoc.getProperty('id')
    const _name = editDoc.getProperty('data.name')
    console.log('Updating doc ', _id)
    console.log('With name: ', _name)

    // Update/save document
    await editDoc.save()

    console.log('done')
  }

  // Send a reminder
  // ...

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <label className="bg-gray-800 text-white p-2 rounded mb-4">
        Upload PDF
        <input type="file" className="invisible h-0 w-0" onChange={onUpload} />
      </label>
      {
        !doc ? (
          <button
            className="bg-gray-800 text-white p-2 rounded mb-4"
            onClick={getDoc}
          >
            Get a document
          </button>
        )
        : (
          <div>
            <input type="text" className="border" id="doc-name" placeholder="Document name"/>
            <button type="text" className="bg-gray-800 text-white p-2 rounded" onClick={updateDoc}>Update</button>
          </div>)
      }
    </div>
  )
}

export default App
