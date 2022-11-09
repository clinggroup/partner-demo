import { useEffect } from 'react'
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
  }, [])

  const onUpload = async (e) => {
    const file = e.target.files[0];

    // Prepare a document and attach the pdf to it
    const myDoc = await Cling.document.new()
    myDoc.addBlock().pdf(file)

    // Cling open send doc form ui
    // ! Note: temporary solution, api will change drastically
    Cling?.router.push({ name: 'DocFormSend' })
    Cling?.openModal()
  }

  let doc

  const getDoc = async () => {
    const id = '636b4befc434aa77b09349b3' // document bound to widget-demo@cling.se
    console.log('Fetching doc: ', id)

    // Retrieve a document
    doc = await Cling.document.get(id)

    // Access its properties through the document class
    const name = doc.getProperty('data.name')
    const status = doc.getProperty('status')

    console.log('Doc name: ', name)
    console.log('Doc status: ', status)
  }

  const updateDoc = async () => {
    if (!doc) {
      console.log('no existing doc')
      return
    }
    
    const name = document.getElementById('doc-name')?.value
    
    if (!name) {
      console.log('no name provided')
      return
    }
    // Update property
    doc.setProperty('data.name', name)
    
    console.log('Updating doc ', doc._document?.id)
    console.log('With name: ', doc._document?._doc?.data?.name)

    // Update/save document
    await doc.save()

    console.log('done')
  }

  // Send a reminder
  // ...

  return (
    <div>
      <div>
        <input type="file" onChange={onUpload} />
        <div className="flex flex-col justify-center items-center">
          <b>Fetch doc</b>
          <button className="bg-gray-800 text-white p-2 rounded" onClick={getDoc}>Get doc</button>
          <div className="py-5"/>
          <b>Update doc</b>
          <input className="border" id="doc-name" placeholder="Document name"/>
          <button className="bg-gray-800 text-white p-2 rounded" onClick={updateDoc}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default App
