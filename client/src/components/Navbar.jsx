const btnClasses =
  'h-9 px-3 inline-flex items-center rounded-full bg-white bg-opacity-10 text-white text-opacity-90 text-sm hover:bg-opacity-20 focus:bg-oapcity-30 select-none'

export default function Navbar() {
  return (
    <div className="w-full bg-primary-700 py-4 px-4 sm:px-8 shadow-xl border-b border-primary-500 fixed top-0 z-10">
      <div className="flex justify-between max-w-5xl mx-auto">
        <div className="h-8 leading-8 pl-4 inline-flex font-medium text-white text-opacity-80">
          eSign Example
        </div>
        <div className="flex gap-3">
          <a
            href="https://github.com/clinggroup/partner-demo/"
            target="_blank"
            className={btnClasses}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white text-opacity-90 mr-2"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
            </svg>
            Github
          </a>
          <a
            href="https://docspo.notion.site/Widget-7fdcd59286104a1d83b1e3e23b555c04"
            target="_blank"
            className={btnClasses}
          >
            <svg
              className="text-white text-opacity-90 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z"></path>
              <path d="M19 16h-12a2 2 0 0 0 -2 2"></path>
              <path d="M9 8h6"></path>
            </svg>
            Documentation
          </a>
        </div>
      </div>
    </div>
  )
}
