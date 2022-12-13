import { useEffect, useState, useRef } from 'react'
import { Cling, config } from './Cling'
import Navbar from './components/Navbar'
import Container from './components/Container'
import Row from './components/Row'

const getAuthToken = async () => {
  // In order to generate an auth code we need to:
  // 1. Setup partner relations to the Cling API
  // 2. Use a secret to generate an auth token on behalf of the user
  // 3. pass the auth code from the server to the client

  const serverUrl =
    import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:3001'

  // Ask server to match existing or create a new user
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  const userId = 'user1';
  const response = await fetch(`${serverUrl}/auth?userId=${userId}`, requestOptions)
  const { authToken } = await response.json()

  return authToken
}

function App() {
  useEffect(() => {
    // Init the Cling instance
    Cling.init(config)
  }, [])

  const [loggedIn, setLoggedIn] = useState(false)
  // If you don't have an account, create one on https://app.dev.cling.se/register
  const [user, setUser] = useState({
    email: 'widget-demo@cling.se',
    password: 'Widgettest123'
  })

  const onAuth = async ({ method, email, password }) => {
    let isLoggedIn = false

    // Authenticate the user
    if (method === 'standard') {
      isLoggedIn = await Cling.auth({
        method,
        email,
        password
      })
    } else if (method === 'authToken') {
      const authToken = await getAuthToken()
      // Use the authToken to authenticate as the user
      isLoggedIn = await Cling.auth({
        method,
        authToken
      })
    }

    setLoggedIn(isLoggedIn)
  }

  // New document
  const [doc, setDoc] = useState(null)
  const onUpload = async e => {
    if (!e) return

    const pdfInput = typeof e === 'string' ? e : e.target.files[0]
    const myDoc = await Cling.document.new() // Prepare the document form

    myDoc.setProperty('data.name', 'My newly created document!') // Set the document name
    myDoc.addBlock().pdf(pdfInput) // add pdf section
    myDoc.addBlock().answer() // add answer section (accept, deny buttons)

    // Register event listener / callback
    myDoc.on('save', data => {
      console.log('Document has been saved.' + '\n' + 'id: ' + data.id)
    })

    setDoc(myDoc)
  }

  // Retrieved document
  const [fetchId, setFetchId] = useState('636b4befc434aa77b09349b3') // document bound to widget-demo@cling.se
  const [fetchedDocument, setFetchedDocument] = useState()
  const onGetDocument = async id => {
    const res = await Cling.document.get(id) // Retrieve a document

    console.log(res)

    setFetchedDocument(res)
  }

  const AuthText = () => (
    <>
      <div>
        Log in the user with a auth token. For testing purposes you can use
        email and password.
      </div>
      <p>
        If you don't have an account, create a free account on{' '}
        <a
          className="text-primary-500 underline"
          href="https://app.dev.cling.se/register/"
          target="_blank"
        >
          app.dev.cling.se/register/
        </a>
      </p>
    </>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar />
      <div className="flex-auto flex flex-col h-full pt-24 pb-10 px-4 sm:px-8">
        <Container title="🔑 Authenticate" text={<AuthText />}>
          <Row title={'Log in'}>
            {loggedIn ? (
              <div className="btn pointer-events-none">✅ Logged in</div>
            ) : (
              <div className="flex flex-col items-end">
                <div className="border-b mb-3 pb-3 flex flex-col gap-2 items-end sm:flex-row">
                  <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    value={user.email}
                    onInput={e =>
                      setUser(prev => ({ ...prev, email: e.target.value }))
                    }
                  />
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={user.password}
                    onInput={e =>
                      setUser(prev => ({ ...prev, password: e.target.value }))
                    }
                  />
                  <button
                    onClick={() =>
                      onAuth({
                        method: 'standard',
                        email: user.email,
                        password: user.password
                      })
                    }
                    className="btn primary"
                  >
                    Log in
                  </button>
                </div>
                <div className="flex flex-col gap-2 items-end sm:flex-row text-gray-500">
                  <div className="text-sm">
                    Or sign in with an auth token{' '}
                  </div>
                  <button
                    onClick={() => onAuth({ method: 'authToken' })}
                    className="btn primary"
                  >
                    Retrieve token
                  </button>
                </div>
              </div>
            )}
          </Row>
        </Container>

        <Container
          disabled={!loggedIn}
          title="📬 Create a new document"
          text="Create a new document consiting of a PDF and a signature section."
        >
          <Row title="Upload a PDF">
            <label className="btn primary">
              <input
                type="file"
                className="invisible h-0 w-0"
                onChange={onUpload}
              />
              Upload file
            </label>
            <button
              className="btn primary ml-2"
              onClick={() => {
                const url = window.prompt(
                  'Paste the URL to a PDF-file.',
                  'https://cling-staging-uploads.s3.eu-central-1.amazonaws.com/company/286/1669045349402_ENERGYSTAR1pdf'
                )
                onUpload(url)
              }}
            >
              Use URL
            </button>
          </Row>
          <Row title="Save or send the document">
            <button
              disabled={!doc}
              onClick={() => doc.ui.send.open()}
              className="btn primary"
            >
              Open
            </button>
          </Row>
        </Container>

        <Container
          disabled={!loggedIn}
          title={'🥅 Retrieve a document'}
          text={'Get a document that already exists.'}
        >
          <Row title="Get a document">
            <input
              type="text"
              className="input"
              placeholder="Document id"
              value={fetchId}
              onInput={e => setFetchId(e.target.value)}
            />
            <button
              className="btn primary ml-2"
              onClick={() => onGetDocument(fetchId)}
            >
              Get
            </button>
          </Row>
          <Row title="Send a reminder">
            <button
              className="btn primary"
              disabled={!fetchedDocument}
              onClick={() => fetchedDocument.ui.sendReminder.open()}
            >
              Open
            </button>
          </Row>
          <Row title="Change document name">
            <button
              className="btn primary"
              disabled={!fetchedDocument}
              onClick={async () => {
                const editableDoc = await fetchedDocument.toForm()
                const name = window.prompt(
                  'Change the document name.',
                  editableDoc.getProperty('data.name')
                )
                if (name === null) return
                editableDoc.setProperty('data.name', name)
                await editableDoc.save()
              }}
            >
              Open
            </button>
          </Row>
          <Row title="Show events timeline">
            <button
              className="btn primary"
              disabled={!fetchedDocument}
              onClick={() => fetchedDocument.ui.timeline.open()}
            >
              Open
            </button>
          </Row>
          <Row title="Show signature reciepts">
            <button
              className="btn primary"
              disabled={!fetchedDocument}
              onClick={() => fetchedDocument.ui.receipt.open()}
            >
              Open
            </button>
          </Row>
          <div className="opacity-20">
            <Row title="Show document links">
              <button
                className="btn primary"
                disabled={true}
                onClick={() => null}
              >
                Open
              </button>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default App
