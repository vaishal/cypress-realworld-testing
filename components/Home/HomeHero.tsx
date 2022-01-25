import Image from "next/image"

export default function HomeHero() {
  return (
    <>
      <div className="relative overflow-hidden">
        <main>
          <div className="bg-jade-300 bg-course-hero bg-no-repeat bg-cover bg-center pt-14 md:py-28">
            <div className="mx-auto w-full lg:pl-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:pb-32">
                    <h1
                      data-test="hero-heading"
                      className="mt-4 font-bold text-5xl text-gray-1000 leading-tight"
                    >
                      Real World Testing with Cypress
                    </h1>
                    <p className="mt-3 text-base text-jade-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">
                      Learn from top industry experts and level-up your testing
                      knowledge &mdash; for free!
                    </p>

                    {/* Features */}
                    <div className="mt-8 overflow-hidden">
                      <dl className="-mx-8 -mt-8 flex flex-wrap">
                        <div className="flex flex-col px-8 pt-8">
                          <dt className="order-2 text-base font-normal text-jade-700">
                            Courses
                          </dt>
                          <dd className="order-1 text-3xl font-semibold text-jade-800 sm:text-4xl">
                            4
                          </dd>
                        </div>

                        <div className="flex flex-col px-8 pt-8">
                          <dt className="order-2 text-base font-normal text-jade-700">
                            Lessons
                          </dt>
                          <dd className="order-1 text-3xl font-semibold text-jade-800 sm:text-4xl">
                            25+
                          </dd>
                        </div>

                        <div className="flex flex-col px-8 pt-8">
                          <dt className="order-2 text-base font-normal text-jade-700">
                            Examples
                          </dt>
                          <dd className="order-1 text-3xl font-semibold text-jade-800 sm:text-4xl">
                            30+
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-10 sm:mt-12">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Start Learning
                      </button>

                      <button
                        type="button"
                        className="inline-flex ml-2 md:ml-6 items-center px-4 py-2 shadow-sm text-base font-medium rounded-md text-indigo-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Get Course Updates
                      </button>
                    </div>
                  </div>
                </div>

                <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
                  <div className="pt-12 md:py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <div className="hidden sm:block"></div>
                    <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                      <Image
                        className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                        src="/images/home/hero/home-rwa-hero.svg"
                        alt="Home Page Hero Image"
                        width={938}
                        height={676}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
