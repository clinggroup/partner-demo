import { useEffect } from 'react'
import Cling from '@cling-se/widget'

function App() {
  useEffect(() => {
    // Init the Cling instance
    Cling.init()

    // Authenticate the user
    // Cling.auth({
    //   method: 'standard', // Use Email and password to login
    //   email: '<EMAIL>', // If you don't have an account, create one on https://app.dev.cling.se/register
    //   password: '<PASSWORD>'
    // })
  }, [])

  const onUpload = (e) => {
    const file = e.target.files[0];

    // Prepare a document and attach the pdf to it
    // ...

    // Cling open send doc form ui
    // ...
  }

  // Retrieve a document
  // ...

  // Access its properties through the document class
  // ...

  // Send a reminder
  // ...

  return (
    <div>
      <div>
        <input type="file" onChange={onUpload} />
      </div>
    </div>
  )
}

export default App
