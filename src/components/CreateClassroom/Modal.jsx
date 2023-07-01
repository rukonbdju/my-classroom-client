import { useNavigate } from "react-router-dom";

const Modal = ({ classCode }) => {
    const navigate = useNavigate()
    const handleCloseModal = () => {
        navigate("/classroom");
    };
    return (
        <div className="absolute h-screen w-screen bg-slate-700 bg-opacity-50 top-0 left-0 flex items-center justify-center">
            <div className="bg-slate-100 rounded-xl p-6 ">
                <div>
                    <p className="text-right mb-2">
                        <span
                            onClick={() => handleCloseModal()}
                            className="p-2 bg-slate-500 rounded-xl text-slate-50 font-bold cursor-pointer hover:bg-slate-700"
                        >
                            Close
                        </span>
                    </p>
                    <h1 className="text-2xl">
                        Your classroom is Successfully created!
                    </h1>
                    <div className="my-2">
                        <p>
                            Your classroom code is
                            <span className="text-blue-500 underline">
                                {classCode}
                            </span>
                        </p>
                    </div>
                    <p className="bg-green-700 text-white p-2 rounded-md">
                        Share the code with your students for join classroom.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Modal;