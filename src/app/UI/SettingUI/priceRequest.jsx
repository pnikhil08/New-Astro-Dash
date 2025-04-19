import { useState, useEffect } from "react";
import { useGetpriceRequestApiQuery } from "@/app/redux/slice/priceRequestSlice";


const PriceRequestCard = () => {
  const { data, error, isLoading } = useGetpriceRequestApiQuery();

  
  const [showPopup, setShowPopup] = useState(false);
  const [requestType, setRequestType] = useState("call_chat");
  const [newRequest, setNewRequest] = useState({
    req_call_chat_price: "",
    request_live_audio_call: "",
    request_live_video_call: "",
  });
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    if (data?.priceHistory) {
      setPriceHistory(data.priceHistory);
    }
  }, [data]);

  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const hasPendingCallChat = priceHistory.some(
      (item) => item.request_status === 1 && item.status === "Pending"
    );

    const hasPendingLiveAudioVideo = priceHistory.some(
      (item) => item.request_status === 2 && item.status === "Pending"
    );

    // Block submission if already pending for selected type
    if (
      (requestType === "call_chat" && hasPendingCallChat) ||
      (requestType === "live_video_audio" && hasPendingLiveAudioVideo)
    ) {
      alert(
        "You already have a pending request for this service type. Please wait for admin response."
      );
      return;
    }

    const astro_id = "1723";
    let payload = {};

    if (requestType === "call_chat") {
      if (!newRequest.req_call_chat_price) {
        alert("Please enter a price.");
        return;
      }
      payload = {
        astro_id,
        req_call_chat_price: newRequest.req_call_chat_price,
        type: "1",
      };
    } else {
      if (
        !newRequest.request_live_audio_call ||
        !newRequest.request_live_video_call
      ) {
        alert("Please enter both audio and video call prices.");
        return;
      }
      payload = {
        astro_id,
        request_live_audio_call: newRequest.request_live_audio_call,
        request_live_video_call: newRequest.request_live_video_call,
        type: "2",
      };
    }

    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token:", token);
      console.log("Payload:", payload);

      const res = await fetch("/api/pricerequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("API response:", result);

      if (!res.ok) {
        alert(result.error || "Failed to send request");
        return;
      }

      const currentDateTime = new Date().toISOString();
      const newCard = {
        ...payload,
        id: Date.now(),
        created_at: currentDateTime,
        updated_at: currentDateTime,
        status: "Pending",
        request_status: payload.type === "1" ? 1 : 2,
      };

      setPriceHistory([newCard, ...priceHistory]);
      setShowPopup(false);

      setNewRequest({
        req_call_chat_price: "",
        request_live_audio_call: "",
        request_live_video_call: "",
      });
      setRequestType("call_chat");
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const handleCancle = () => {
    setShowPopup(false);
    setNewRequest({
      req_call_chat_price: "",
      request_live_audio_call: "",
      request_live_video_call: "",
    });
    setRequestType("call_chat");
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <>
      <div className="wallet-head flex justify-self-center text-center items-center">
        Price Request
      </div>
      <button
        onClick={() => setShowPopup(true)}
        className=" mx-5 mt-5 p-2 rounded-xl text-white bg-blue-500 cursor-pointer"
      >
        Request Price
      </button>
      <div className="grid grid-cols-2 lg:grid-cols-3  mx-2  gap-2 sm:gap-4 mt-5">
        {priceHistory
          .filter(
            (request) =>
              request.request_status === 1 || request.request_status === 2
          )
          .map((request) => (
            <div
              key={request.id}
              className="bg-gray-100 shadow-lg rounded-xl p-1 sm:p-4 mb-1 sm:mb-4 border border-gray-300 sm:text-sm text-xs"
            >
              <div className="bg-pink-200 flex-col md:flex-row font-medium px-4 py-2 rounded-lg mb-2 flex justify-between">
                <span>Service :</span>
                <span className="text-green-700 uppercase">
                  {request.request_status === 1
                    ? "CALL/CHAT"
                    : "Live Video/Audio"}
                </span>
              </div>

              {request.request_status === 1 ? (
                <div className="bg-green-200 px-4 py-2 font-medium rounded-lg mb-2 flex flex-col md:flex-row justify-between">
                  <span>Requested Price :</span>
                  <span className="text-green-700">
                    ₹ {request.req_call_chat_price}
                  </span>
                </div>
              ) : (
                <>
                  <div className="bg-blue-200 px-4 py-2 font-medium rounded-lg mb-2 flex flex-col md:flex-row justify-between">
                    <span>Requested Audio Call Price :</span>
                    <span className="text-green-700">
                      ₹ {request.request_live_audio_call}
                    </span>
                  </div>
                  <div className="bg-blue-200 px-4 py-2 font-medium rounded-lg mb-2 flex flex-col md:flex-row justify-between">
                    <span>Requested Video Call Price :</span>
                    <span className="text-green-700">
                      ₹ {request.request_live_video_call}
                    </span>
                  </div>
                </>
              )}

              <div className="bg-blue-200 px-4 py-2 font-medium rounded-lg mb-2 flex flex-col md:flex-row justify-between">
                <span>Creation Date :</span>
                <span>{new Date(request.created_at).toLocaleString()}</span>
              </div>
              <div className="bg-yellow-200 px-4 py-2 font-medium rounded-lg mb-2 flex flex-col md:flex-row justify-between">
                <span>Updated Date :</span>
                <span>{new Date(request.updated_at).toLocaleString()}</span>
              </div>
              <div className="bg-violet-200 px-4 py-2 font-medium rounded-lg flex flex-col md:flex-row justify-between">
                <span>Status :</span>
                <span
                  className={`uppercase ${
                    request.status === "Approved"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {request.status}
                </span>
              </div>
            </div>
          ))}

        {showPopup && (
          <div className="fixed inset-0 flex items-center  justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-[20rem] md:w-[25rem] flex  flex-col">
              <h2 className="text-lg font-bold mb-4">New Price Request</h2>

              <select
                onChange={(e) => {
                  setRequestType(e.target.value);
                  setNewRequest({
                    req_call_chat_price: "",
                    request_live_audio_call: "",
                    request_live_video_call: "",
                  });
                }}
                className="w-full p-2 mb-2 border rounded"
              >
                <option value="call_chat">Call/Chat Price Request</option>
                <option value="live_video_audio">
                  Live Video/Audio Price Request
                </option>
              </select>

              {requestType === "call_chat" && (
                <input
                  type="text"
                  name="req_call_chat_price"
                  placeholder="Enter Price"
                  value={newRequest.req_call_chat_price}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 border rounded"
                />
              )}

              {requestType === "live_video_audio" && (
                <>
                  <input
                    type="text"
                    name="request_live_audio_call"
                    placeholder="Enter Audio Call Price"
                    value={newRequest.request_live_audio_call}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="text"
                    name="request_live_video_call"
                    placeholder="Enter Video Call Price"
                    value={newRequest.request_live_video_call}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                  />
                </>
              )}

              <button
                onClick={() => {
                  handleSubmit();
                  setNewRequest({
                    req_call_chat_price: "",
                    request_live_audio_call: "",
                    request_live_video_call: "",
                  });
                  setRequestType("call_chat");
                }}
                className="w-full p-2 bg-blue-500 text-white rounded mt-2"
              >
                Submit
              </button>

              <button
                onClick={() => {
                  handleCancle();
                  setNewRequest({
                    req_call_chat_price: "",
                    request_live_audio_call: "",
                    request_live_video_call: "",
                  });
                  setRequestType("call_chat");
                }}
                className="w-full p-2 bg-red-500 text-white rounded mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PriceRequestCard;
