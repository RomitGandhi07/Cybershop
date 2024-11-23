import { FaPaperPlane } from "react-icons/fa";

const Chat: React.FC<{}> = () => {
    return (
        <>
            <div className="w-full h-auto bg-gray-100">
                <div className="flex">
                    {/* <!-- Sidebar --> */}
                    <div className="w-96 h-auto bg-white p-5 rounded-lg shadow-md overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h1 className="text-2xl font-bold">Messages</h1>
                            <i className="fas fa-ellipsis-h text-gray-500"></i>
                        </div>
                        {/* <div className="flex items-center bg-gray-100 p-2 rounded-md mb-5">
                            <i className="fas fa-search text-gray-500 mr-2"></i>
                            <input type="text" placeholder="Search" className="bg-gray-100 outline-none w-full text-sm" />
                                <i className="fas fa-sliders-h text-gray-500 ml-2"></i>
                        </div> */}
                        <div className="space-y-4">
                            {/* <!-- Message List --> */}
                            <div className="flex items-center bg-orange-500 rounded-lg p-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold">VT</div>
                                <div className="ml-3">
                                    <h2 className="font-medium text-white">Vaibhav Talati</h2>
                                    {/* <p className="text-sm">Backend Developer for Web App...</p>
                                    <p className="text-xs">You: Let me know if you have a...</p> */}
                                </div>
                                {/* <span className="ml-auto text-xs">8/28/24</span> */}
                            </div>
                            <div className="flex items-center p-3 rounded-lg hover:bg-gray-100">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold">AD</div>
                                <div className="ml-3">
                                    <h2 className="font-medium">Akshay Dholakiya</h2>
                                    {/* <p className="text-sm">Technical Architect</p>
                                    <p className="text-xs">You: Hello sir, any update?</p> */}
                                </div>
                                {/* <span className="ml-auto text-xs text-gray-500">Yesterday</span> */}
                            </div>
                            {/* <!-- Add other message items here following the same structure --> */}
                        </div>
                    </div>

                    {/* <!-- Main Chat Area --> */}
                    <div className="flex-1 flex flex-col p-5 h-screen">
                        <div className="flex items-center justify-between border-b pb-4 mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold">VT</div>
                                <div>
                                    <h2 className="text-lg font-medium">Vaibhav Talati</h2>
                                    <p className="text-sm text-gray-500"><i className="far fa-clock mr-1"></i> Australia, Monday 26 August 2024 at 20:00:00 GMT+11</p>
                                </div>
                            </div>
                            {/* <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow">
                                <i className="far fa-eye"></i>
                                <span>View proposal</span>
                            </button> */}
                        </div>

                        {/* <!-- Chat Messages --> */}
                        <div className="flex-1 overflow-y-auto space-y-4">
                            {/* <!-- Date --> */}
                            <div className="text-md text-gray-500 text-center">Saturday, Aug 24</div>
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                <div className="w-13 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl">RG</div>
                                </div>
                                <div>
                                    <p className="text-md font-medium">Romit Gandhi <span className="text-sm text-gray-500 ml-2">05:33 PM</span></p>
                                    <p className="text-md">Hello sir, can this work done little early? I can pay you more.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <div className="w-13 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl">VT</div>
                                </div>
                                <div>
                                    <p className="text-md font-medium">Vaibhav Talati <span className="text-sm text-gray-500 ml-2">05:34 PM</span></p>
                                    <p className="text-md">Sure, we can wrap it up within 7 days but for that I will charge you $500 for this work.</p>
                                </div>
                            </div>
                            {/* <!-- Other message bubbles following the same format --> */}
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4">
                            {/* <!-- Date --> */}
                            <div className="text-md text-gray-500 text-center">Sunday, Aug 25</div>
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <div className="w-13 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl">RG</div>
                                </div>
                                <div>
                                    <p className="text-md font-medium">Romit Gandhi <span className="text-sm text-gray-500 ml-2">12:33 PM</span></p>
                                    <p className="text-md">Okay, No Problem. I will initiate the contract with revised payment terms. Please accept it and let's start work together. Thanks.</p>
                                </div>
                            </div>
                            {/* <!-- Other message bubbles following the same format --> */}
                        </div>

                        {/* <!-- Message Input --> */}
                        <div className="flex items-center bg-white p-4 rounded-lg shadow">
                            <input type="text" placeholder="Send a message..." className="w-full bg-transparent outline-none text-sm" />
                            <div className="flex items-center space-x-3 text-gray-500 ml-3">
                                <FaPaperPlane className="text-orange-500"></FaPaperPlane>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;