"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Quill() {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const router = useRouter();

    const handleCreateRoom = () => {
        const newRoomId = Math.random().toString(36).substring(2, 10); // Generate a random room ID
        setRoomId(newRoomId); // Set the room ID
    };

    const handleJoinRoom = () => {
        if (roomId && username) {
            router.push(`/quill/${roomId}?username=${username}`);
        }
    };

    // useEffect(() => {
    //     console.info("HERE");
    //     const testSocket = new WebSocket("ws://localhost:3003/socket.io/connection");

    //     testSocket.onopen = () => {
    //         console.log("Test WebSocket connection established");
    //     };

    //     testSocket.onerror = (error) => {
    //         console.error("Test WebSocket connection error:", error);
    //     };

    //     testSocket.onclose = () => {
    //         console.log("Test WebSocket connection closed");
    //     };
    //     console.info("HERE2");
    // }, []);

    // useEffect(() => {
    //     console.info("HERE3");
    //     const socketObj = io("http://localhost:3003", {
    //         transports: ['websocket'],
    //         // upgrade: false,
    //         // forceNew: true,
    //         // query: this.query,
    //         path: '/socket.io/connection',
    //         withCredentials: true,
    //     });

    //     socketObj.on('connect', () => {
    //         // Connected, lets sign-up for to receive messages for this room
    //         // socketObj.emit('room', room);
    //         console.log('Socket connected');
    //     });

    //     socketObj.on('disconnect', (reason) => {
    //         console.log('Socket disconnected', reason);
    //     });

    //     socketObj.on('connect_error', (error) => {
    //         console.log('not able to connect socket ', error);
    //     });
    //     console.info("HERE4");
    // }, [])
    return (
        <div id="body">
            <div className="flex flex-col items-center content-center">
                <div className="w-[30%]">
                    <h4 className="mt-4 text-2xl font-bold text-center text-orange-600">Real Time Collabaration</h4>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            className="mt-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                            placeholder="Room Id"
                            onChange={(e) => setRoomId(e.target.value)}
                            value={roomId}
                        />
                        <input
                            type="text"
                            className="mt-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <button className="mt-8 w-full bg-orange-600 text-white rounded-3xl p-3 text-sm font-medium hover:bg-orange-700 transition duration-200" onClick={handleJoinRoom}>
                            Join
                        </button>
                        <span className="mt-8 text-center">
                            No invitation code?
                            <a
                                href="#"
                                onClick={handleCreateRoom}
                                className="text-orange-600 p-3 text-sm font-medium transition duration-200"
                            >
                                Create New Room
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}