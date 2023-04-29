import { useEffect, useState } from "react";
import "./App.css";
import html2pdf from "html2pdf.js";
import data from "./data";

function Exersize({ startPos, index, name = "_______________", sets, link }) {
    return (
        <div
            className="rounded-xl mb-8 p-8 w-full aspect-square bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(bg.png)`,
            }}
        >
            <img
                className="rounded-xl mx-auto"
                src={`/assets/img (${startPos + index + 1}).jpeg`}
            />
            <div className="mt-12 flex justify-between">
                <div className="shadow w-fit pb-4">
                    <h2 className="text-3xl font-bold mt-4 bg-white text-black py-2 px-4 w-fit border-l-8 border-black rounded">
                        {name}
                    </h2>
                    <p className="text-2xl text-black font-medium ml-6 mt-4">
                        {sets}
                    </p>
                </div>
                <div className="flex-grow min-w-[30%] grid place-items-center">
                    <a href={link}>
                        <img
                            className="w-[70px] h-[70px] object-contain"
                            src="play-button.png"
                            alt=""
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

function Day({ dayName, dayNumber, exersizes, startPos }) {
    return (
        <>
            <h1 className="text-6xl font-bold mt-4 mb-10">
                DAY {dayNumber} <span className="text-main">-</span> {dayName}
            </h1>
            {exersizes.map((exersize, index) => (
                <Exersize startPos={startPos} {...exersize} index={index} />
            ))}
        </>
    );
}

function App() {
    return (
        <div className="App bg-[#0e0e0e] pb-2" id="app">
            <div className=" text-white w-[90%] mx-auto">
                <div className="flex justify-between py-6 items-center ">
                    <img
                        src="logo.png"
                        onClick={print}
                        className="rounded-full w-16"
                    />
                    <a
                        className="text-white text-xl font-medium"
                        href="https://www.facebook.com/photo/?fbid=452259133590019&set=a.452259086923357"
                    >
                        Facebook
                    </a>
                </div>
                {data.map((day, index) => {
                    let startPos = 0;
                    for (let i = 0; i < index; i++) {
                        startPos +=
                            Object.values(data[i])[0].length;
                        console.log(Object.values(data[i])[0])
                    }
                    console.log(startPos);
                    return (
                        <Day
                            dayName={Object.keys(day)[0]}
                            startPos={startPos}
                            exersizes={Object.values(day)[0]}
                            dayNumber={index + 1}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
