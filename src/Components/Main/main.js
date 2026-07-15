import React, {useState, useRef, useEffect} from "react";
import { Button } from "react-bootstrap";
import {ButtonGroup} from "react-bootstrap";
import alarm from "../../media/alarm_sound.mp3";


export default function Timer(){
const [sessionTime, setSessionTime] = useState(25);
const [breakTime, setBreakTime] = useState(5);
const [timerLabel, setTimerLabel] = useState("Session");
const [timeLeft, setTimeLeft] = useState(1500);
const [isRunning, setIsRunning] = useState(false);

let initialTime = [
    {minutes: Math.floor(timeLeft / 60).toString().padStart(2, "0"),
    seconds: (timeLeft % 60).toString().padStart(2, "0")}
];
const [actualTimeLeft, setActualTimeLeft] = useState(initialTime)


const incrementSessionRef = useRef(0);
const decrementSessionRef = useRef(0);
const incrementBreakRef = useRef(0);
const decrementBreakRef = useRef(0);
const audioRef = useRef(null);

useEffect(() => {
let tmIntId;

if(isRunning) {
    tmIntId = setInterval(() => {
        setTimeLeft(timeLeft - 1)
    }, 100)
}
if (timeLeft === 0){
    clearInterval(tmIntId);
    const alarm = document.getElementById("beep");
    alarm.play()
    setTimeout(() => {
        alarm.pause();
    }, 2.5 * 1000)
    

if(timerLabel === "Session"){
        setTimerLabel("Break");
         setTimeLeft(breakTime * 60);        
}
else if (timerLabel === "Break"){
       setTimerLabel("Session");
      setTimeLeft(sessionTime * 60);        
}
}
return () => clearInterval(tmIntId);

}, [isRunning, timeLeft, timerLabel, actualTimeLeft])

function handleSessionIncrement(){
if(!isRunning && sessionTime < 60){
 setSessionTime(sessionTime + 1);
 setTimeLeft(timeLeft + 1 * 60)  
}    
incrementSessionRef.current = incrementSessionRef.current + 1;
}

function handleSessionDecrement(){
if(!isRunning && sessionTime > 1){
    setSessionTime(sessionTime - 1);
    setTimeLeft(timeLeft - 1 * 60)
}
decrementSessionRef.current = decrementSessionRef.current - 1;
}

function handleBreakIncrement(){
if (!isRunning && breakTime < 60)    {
setBreakTime(breakTime + 1);  
}
incrementBreakRef.current = incrementBreakRef.current + 1;
}

function handleBreakDecrement(){
if (!isRunning && breakTime > 1){
    setBreakTime(breakTime - 1);    
}
decrementBreakRef.current = decrementBreakRef.current - 1;
}

function handleStartStop(){
  setIsRunning(!isRunning)
}

function handleReset(){
   setSessionTime(25); 
   setBreakTime(5); 
   setTimerLabel("Session");
   setTimeLeft(1500);
   setIsRunning(false);
}

return (
    <>
    <div className="main_container">
        <h1>The Pomodoro Method</h1>
        <p>The Pomodoro Method is used to manage your time more efficiently by breaking your day into work sessions of a certain length followed by break sessions of a certain length. This is done to keep your attention focused on your tasks without getting burned out by the work involved. </p>
        <div className="time_container">
            <h4 id="timer_label">{timerLabel}</h4>
            <audio id="beep" ref={audioRef} ><source src={alarm} type="audio/mp3"></source></audio>
           
            <p id="time_left">{`${initialTime[0].minutes} : ${initialTime[0].seconds}`}</p>
        </div>

        <div className="container">
        <div className="session_container">
         <h4 id="session_label">Session Length</h4>
            <button id="session_increment" onClick={handleSessionIncrement} ref={incrementSessionRef}>➕</button><span id="session_length">{sessionTime}</span>
            <button id="session_decrement" onClick={handleSessionDecrement} ref={decrementSessionRef}>➖</button>
        </div>

        <div className="break_container">
        <h4 id="break_label">Break Length</h4>
        <button id="break_increment" onClick={handleBreakIncrement} ref={incrementBreakRef}>➕</button>
        <span id="break_length">{breakTime}</span>
        <button id="break_decrement" onClick={handleBreakDecrement} ref={decrementBreakRef}>➖</button>
        </div>
        </div>

        <div className="button_container">
            <ButtonGroup size="lg"  className="mb-2">
                <Button id="start_stop" variant="secondary" onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</Button>
               
                <Button id="reset" variant="secondary" onClick={handleReset}>Reset</Button>
            </ButtonGroup>
        </div>
    </div>
    </>
)


}