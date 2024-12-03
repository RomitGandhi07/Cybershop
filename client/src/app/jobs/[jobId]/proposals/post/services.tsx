export default function JobServices() {
    return (
        <div className="bg-white flex items-center justify-center">

            <div className="p-8 bg-white flex flex-col justify-between">
                {/* <!-- Top Progress and Title Section --> */}
                {/* <div className="flex justify-between items-start"> */}
                    {/* <!-- Step Indicator --> */}
                    {/* <div className="text-gray-600 text-sm font-medium space-x-1">
                        <span>2/5</span>
                        <span className="text-gray-400">Job post</span>
                    </div>
                </div> */}

                {/* <!-- Main Content Section --> */}
                <div className="flex justify-between items-start mt-4">
                    {/* <!-- Left Content --> */}
                    <div className="w-[50%]">
                        <h1 className="text-3xl font-semibold text-gray-900 leading-tight mb-3">
                            What are the main skills required for your work?
                        </h1>
                    </div>

                    {/* <!-- Right Content --> */}
                    <div className="w-[40%]">
                        {/* <!-- Search Skills Field --> */}
                        <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="searchSkills">
                            Search skills or add your own
                        </label>
                        <div className="relative flex items-center mb-2">
                            <input type="text" id="searchSkills" placeholder="" className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400" />
                                <i className="fa fa-search absolute right-3 text-gray-400"></i>
                        </div>
                        <p className="text-gray-400 text-xs mb-4">For the best results, add 3-5 skills</p>

                        {/* <!-- Selected Skills Section --> */}
                        <div className="mb-6">
                            <p className="text-gray-800 text-sm font-medium mb-2">Selected skills</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="flex items-center space-x-1 border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900">
                                    <span>JavaScript</span>
                                    <i className="fa fa-times text-gray-400 cursor-pointer"></i>
                                </span>
                                <span className="flex items-center space-x-1 border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900">
                                    <span>React</span>
                                    <i className="fa fa-times text-gray-400 cursor-pointer"></i>
                                </span>
                                <span className="flex items-center space-x-1 border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900">
                                    <span>Next.js</span>
                                    <i className="fa fa-times text-gray-400 cursor-pointer"></i>
                                </span>
                            </div>
                        </div>

                        {/* <!-- Popular Skills Section --> */}
                        <div>
                            <p className="text-gray-800 text-sm font-medium mb-2">Popular skills for Full Stack Development</p>
                            <div className="flex flex-wrap gap-2">
                                {/* <!-- Skill Tags --> */}
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">Node.js</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">CSS</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">HTML</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">Web Development</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">HTML5</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">WordPress</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">PHP</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">TypeScript</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">Animation</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">Web Design</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">Three.js</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">jQuery</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">Python</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">Vue.js</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">CSS 3</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">Web Application</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">MongoDB</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">Apollo.io</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">D3.js</span>
                                <span className="border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-900 cursor-pointer">ECMAScript</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Bottom Navigation Buttons --> */}
                {/* <div className="flex justify-between items-center border-t border-gray-200 pt-6 mt-6">
                    <button className="flex items-center space-x-2 text-green-700 bg-white border border-green-700 rounded-full py-2 px-6 hover:bg-green-100 focus:outline-none">
                        <span>Back</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white bg-green-700 rounded-full py-2 px-6 hover:bg-green-800 focus:outline-none">
                        <span>Next: Scope</span>
                    </button>
                </div> */}
            </div>

        </div>
    )
}