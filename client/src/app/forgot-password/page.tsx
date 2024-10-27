export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[600px] h-[400px] flex flex-col items-center justify-start">
        {/* <!-- Logo --> */}
        {/* <div className="flex justify-start w-full mb-10">
          <img src="https://placehold.co/100x40" alt="Upwork Logo" className="ml-6 w-24 h-10" />
        </div> */}

        {/* <!-- Card Container --> */}
        <div className="bg-white shadow-md rounded-lg w-[400px] p-8">
          <h1 className="text-2xl font-semibold text-center mb-4">Password Recovery</h1>
          <p className="text-gray-600 text-center mb-6">Enter the email address associated with your Cyberhop account.</p>

          {/* <!-- Input field --> */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input type="email" id="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>

          {/* <!-- Buttons --> */}
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg mb-4">
            Continue
          </button>
          <a href="#" className="text-orange-600 text-center block">Back</a>
        </div>
      </div>
    </div>
  );
}
