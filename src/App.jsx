import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import html2pdf from "html2pdf.js";
const linkes = {
    "UPPER BODY": [
        { link: "https://youtu.be/tuwHzzPdaGc", sets: "3 Sets 15,12,10" },
        { link: "https://youtu.be/paCfxhgW6bI", sets: "3 Sets 15,12,10" },
        { link: "https://youtu.be/ba8tr1NzwXU", sets: "3 Sets 15,12,12" },
        { link: "https://youtu.be/OPYrUGZL8nU", sets: "3 Sets 15,12,10" },
        { link: "https://youtu.be/UCXxvVItLoM", sets: "3 Sets 15,12,10" },
        { link: "https://youtu.be/5oxviYmdHCY", sets: "3 Sets 10,8,6" },
        { link: "https://youtu.be/FRxZ6wr5bpA", sets: "3 Sets 15,12,10" },
        { link: "https://www.muscleandstrength.com/exercises/lying-tricep-extension.html", sets: "3 Sets 15,15,15" },
        {
            link: "",
            sets: (
                <>
                    {" "}
                    3 sets 15,15,15 <br /> 20 minute HIIT workout
                </>
            ),
        },
    ],
    Squat: [
        { link: "https://youtu.be/R2dMsNhN3DE", sets: "5 Sets 15,15,12,12,10" },
        { link: "https://youtu.be/uRSsOoZG9z8", sets: "5 Sets 15,15,12,12,10" },
        { link: "https://youtu.be/Orxowest56U", sets: "5 Sets 15,15,12,12,10" },
        { link: "https://youtu.be/2SHsk9AzdjA", sets: "3 Sets 10,10,10" },
        { link: "https://youtu.be/0fl1RRgJ83I", sets: "3 sets 20,18,15" },
        { link: "https://youtu.be/5Y3KW5rWMh4", sets: "3 sets 20,18,15" },
        { link: "https://youtu.be/29OfN4ztW_g", sets: "3 sets 15,12,10" },
        {
            link: "https://youtu.be/IrxfRHGiGE0",
            sets: (
                <>
                    {" "}
                    4 sets 20,18,15,12 <br /> 20 minute HIIT workout
                </>
            ),
        },
    ],
    dumbbell: [
        { link: "https://youtu.be/PgpQ4-jHiq4", sets: "3 sets 15.12,10" },
        { link: "https://youtu.be/iKrKgWR9wbY", sets: "3 sets 10,10,10" },
        { link: "https://youtu.be/dj2Gm628kas", sets: "3 sets 15.12,10" },
        { link: "https://youtu.be/iXGHN-MWFfY", sets: "3 sets 15.12,10" },
        { link: "https://youtu.be/UCXxvVItLoM", sets: "3 sets 10,10,10" },
        { link: "https://youtu.be/5oxviYmdHCY", sets: "3 sets 10,8,6" },
        { link: "https://youtu.be/UeleXjsE-98", sets: "3 sets 15,12,10" },
        {
            link: "https://www.muscleandstrength.com/exercises/ez-bar-reverse-grip-barbell-curl.html",
            sets: "3 sets 10,10,10",
        },
        {
            link: "https://youtu.be/ke2shAeQ0O8",
            sets: (
                <>
                    {" "}
                    3 sets 15.12,10 <br /> 20 minute HIIT workout
                </>
            ),
        },
    ],
    Deadlift: [
        { link: "https://youtu.be/1ZXobu7JvvE", sets: "3 sets 15,12,10" },
        { link: "https://youtu.be/Otsrtdyw2fQ", sets: "3 sets 10,10,10" },
        { link: "https://vimeo.com/281064077", sets: "3 sets 10,10,10" },
        { link: "https://youtu.be/0tn5K9NlCfo", sets: "3 sets 15,12,10" },
        { link: "https://youtu.be/0fl1RRgJ83I", sets: "3 sets 20,18,15" },
        { link: "", sets: "3 sets 20,20,20" },
        { link: "", sets: "3 sets 15,12,10" },
        {
            link: "https://youtu.be/29OfN4ztW_g",
            sets: (
                <>
                    {" "}
                    3 sets 15.12,10 <br /> 20 minute HIIT workout
                </>
            ),
        },
    ],
    'CHEST,SHOULDERS,TRICEPS': [
        { link: "https://youtu.be/8nNi8jbbUPE", sets: "3 sets 15,12,10" },
        { link: "https://youtu.be/Z57CtFmRMxA", sets: "3 sets 10,10,10" },
        { link: "https://youtu.be/beazxb8q-SA", sets: "3 sets 15,12,10" },
        { link: "https://www.menshealth.com/uk/fitness/a735489/dumbbell-standing-shoulder-press/", sets: "3 sets 15,12,10" },
        { link: "https://www.muscleandstrength.com/exercises/dumbbell-lateral-raise.html", sets: "3 sets 15,12,10" },
        
        { link: "https://youtu.be/f5V2XHVR3Dg", sets: "3 sets 20,20,20" },
        { link: "https://youtu.be/mRozZKkGIfg", sets: "3 sets 15,12,10" },// unknown
        { link: "", sets: "3 sets 15,12,10" },
        {
            link: "https://youtu.be/nNX-UJjatF0",
            sets: (
                <>
                    {" "}
                    3 sets 15,12,10 <br /> 20 minute HIIT workout
                </>
            ),
        },
    ],
    '45 minute cardio': []
};
const startImgPos = [1,10,18,27,35]
function App() {
    const [count, setCount] = useState(0);
    const print = () => {
        var element = document.body;
        var opt = {
            // margin: 1,
            filename: "myfile.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 3 },
            jsPDF: {
                unit: "px",
                // precision: 10,
                format: [document.body.clientWidth, document.body.clientHeight],
                orientation: "l",
            },
        };
        html2pdf(element, opt);
        console.log(document.body.clientWidth, document.body.clientHeight);
    };
    useEffect(() => {
        // print();
    }, []);
    return (
        <div className="App bg-[#0e0e0e] pb-2" id="app">
            <div className=" text-white w-[90%] mx-auto">
                <div className="flex justify-between py-6 items-center ">
                    <img src="logo.png" onClick={print} className="rounded-full w-16" />
                    <a
                        className="text-white text-xl font-medium"
                        href="https://www.facebook.com/photo/?fbid=452259133590019&set=a.452259086923357"
                    >
                        Facebook
                    </a>
                </div>
                {/* <h1 className="text-6xl font-bold mt-4 mb-10">
                    DAY 1 <span className="text-main">-</span> UPPERBODY
                </h1> */}

                {Object.keys(linkes).map((key, i1) => {
                    return (
                        <div key={i1}>
                            <div className="bg-yellow-600 w-full h-1 mb-1"></div>
                            <div className="bg-yellow-600 w-full h-1"></div>
                            <h1 className="text-5xl font-bold my-10">
                                DAY {i1 + 1} <span className="text-main">-</span> {key}
                            </h1>
                            {linkes[key].map((item, i2) => {
                                return (
                                    <div>
                                        <div className="grid place-items-center mt-20">
                                            <div className=" w-full relative border-[.5rem] rounded-2xl grid place-items-center border-main">
                                                <img
                                                    src={`imgs/${startImgPos[i1] + i2}.jfif`}
                                                    className="w-[90%] max-h-[90%] rounded-2xl"
                                                    alt=""
                                                />
                                                <a className="absolute" href={item.link}>
                                                    <img
                                                        src="play-button.png"
                                                        className="  w-[100px] opacity-50"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="my-8 text-3xl">
                                            <p>
                                                <span className="text-main">-</span> {item.sets}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
