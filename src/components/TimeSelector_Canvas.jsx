import React, { Component, useState } from 'react';

//Scrolling works other stuff don't
const HEADER_HEIGHT = 20;
const AUTOSCROLL_MARGIN = 20;
const COLORS = {
    "no": "rgb(255, 128, 128)",
    "yes": "rgb(112, 219, 112)",
    "unavailable": "white"
}
const COLUMN_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
class TimeSelector_Canvas extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
        this.headers = this.props.headers ? this.props.headers : COLUMN_HEADERS;
        this.cellWidth = this.props.cellWidth ? this.props.cellWidth : 40;
        this.cellHeight = this.props.cellHeight ? this.props.cellHeight : 10;
        this.y = 0;
        this.cellsAcross = this.props.cellsAcross ? this.props.cellsAcross : 1;
        this.timesWidth = 35;
        this.mouseMode = 0; //0 = not pressed, 1 = pressed but nothing yet, 2 = redify, 3 = greenify, 4 = dragging the time selector
        this.lastMouse = {x: 0, y: 100};
        this.curMouse = {x: 0, y: 100};
        if(this.props.data){
            this.data = this.props.data;
        }
        else{
            this.data = [];
            for(let i = 0; i < this.cellsAcross; i++){
                this.data.push(this.getFormattedDataColumn(this.props.start ? this.props.start : 6, this.props.end ? this.props.end : 21, i))
            }
        }
        loop1:
        for(let i = 0; i < this.data[0].length; i++){
            for(let j = 0; j < this.data.length; j++){
                if(this.data[j][i].color != COLORS["unavailable"]){
                    this.y = this.data[j][i].y - 10;
                    break loop1;
                }
            }
        }
    }
    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawCells = () => {
        for(let day = 0; day < this.data.length; day++){
            for(let i = 0; i < this.data[day].length; i++){
                let cell = this.data[day][i];
                
                if(cell.y+this.cellHeight > this.y && cell.y < this.y+this.canvas.height){
                    this.ctx.fillStyle = cell.color;
                    this.ctx.fillRect(cell.x, cell.y-this.y, this.cellWidth, this.cellHeight);
                }
                
            }
        }
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "black";
        this.ctx.strokeStyle = "rgb(20, 20, 20)";
        for(let i = 0; i < this.data[0].length; i++){ //Side numbers and horizontal lines
            if(this.data[0][i].y >= this.y-1 && this.data[0][i].y < this.y+this.canvas.height){
                if(i % 4 === 0){
                    let text = Math.floor(i/4);
                    if(text < 10){
                        text = "0" + text;
                    }
                    text += ":00";
                    
                    this.ctx.fillText(text, this.timesWidth/2-2.5, this.data[0][i].y-this.y);
                    this.ctx.fill();

                    this.ctx.beginPath();
                    this.ctx.moveTo(this.timesWidth-5, this.data[0][i].y-this.y);
                    this.ctx.lineTo(this.canvas.width, this.data[0][i].y-this.y);
                    this.ctx.stroke();
                }

            }
        }

    }
    drawHeaders = () => {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.timesWidth, 0, this.canvas.width-this.timesWidth, HEADER_HEIGHT);

        this.ctx.fillStyle = "black";
        for(let i = 0; i < this.headers.length; i++){
            this.ctx.fillText(this.headers[i], this.timesWidth+this.cellWidth*i+this.cellWidth*0.5, HEADER_HEIGHT/2);
            this.ctx.fill();
        }
        
        this.ctx.strokeStyle = "rgb(20, 20, 20)";
        this.ctx.beginPath();
        this.ctx.moveTo(this.timesWidth, HEADER_HEIGHT);
        this.ctx.lineTo(this.canvas.width, HEADER_HEIGHT);
        this.ctx.stroke();
    }
    drawVerticalLines = () => {
        this.ctx.strokeStyle = "rgb(40, 40, 40)";
        for(let i = 0; i < this.data.length; i++){ //Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(this.timesWidth+i*this.cellWidth, 0);
            this.ctx.lineTo(this.timesWidth+i*this.cellWidth, this.canvas.height);
            this.ctx.stroke();
        }
    }
    drawAll = () => {
        this.clearCanvas();
        this.drawCells();
        this.drawHeaders();
        this.drawVerticalLines();
    }
    getFormattedDataColumn = (start, end, day) => { //Takes a start and end hour (24-hour time, starts at 0) and converts into an array segmented into 15 minutes (length of 24*4)
        let timeRange = [];
        for(let i = 0; i < 4*24; i++){
            timeRange[i] = {
                x: this.timesWidth+day*this.cellWidth,
                y: i*this.cellHeight,
            }
            if(i >= start*4 && i < end*4){
                timeRange[i].color = COLORS["no"];
            }
            else{
                timeRange[i].color = COLORS["unavailable"];
            }
        }
        return timeRange;
    }
    mouseDraw = () => {
        for(let day = 0; day < this.data.length; day++){
            for(let i = 0; i < this.data[day].length; i++){
                let cell = this.data[day][i];
                if(this.mouseMode >= 1 && this.mouseMode <= 3){
                    if(this.lineSegRectIntersection([this.lastMouse, this.curMouse], cell.x, cell.y-this.y, this.cellWidth, this.cellHeight)){
                        if(cell.color !== COLORS["unavailable"]){
                            if(this.mouseMode === 1){
                                if(cell.color === COLORS["yes"]){
                                    cell.color = COLORS["no"];
                                    this.mouseMode = 2;
                                }
                                else if(cell.color === COLORS["no"]){
                                    cell.color = COLORS["yes"];
                                    this.mouseMode = 3;
                                }
                            }
                            else if(this.mouseMode === 2){
                                cell.color = COLORS["no"];
                            }
                            else if(this.mouseMode === 3){
                                cell.color = COLORS["yes"];
                            }
                        }
                    }
                }
            }
        }
        this.drawAll();
    }
    lineSegRectIntersection = (line, rectX, rectY, rectW, rectH) => {
        let left = rectX;
        let top = rectY;
        let right = rectX + rectW;
        let bottom = rectY + rectH;
        if(line[0].x === line[1].x && line[0].y === line[1].y){
            if(line[0].x >= left && line[0].x <= right && line[0].y >= top && line[0].y <= bottom){
                return true;
            }
        }
        if(this.lineSegIntersection(line, [{x: left, y: top}, {x: right, y: top}])){
            return true;
        }
        if(this.lineSegIntersection(line, [{x: right, y: top}, {x: right, y: bottom}])){
            return true;
        }
        if(this.lineSegIntersection(line, [{x: left, y: top}, {x: left, y: bottom}])){
            return true;
        }
        if(this.lineSegIntersection(line, [{x: left, y: bottom}, {x: right, y: bottom}])){
            return true;
        }
        return false;
    }
    lineSegIntersection = (line1, line2) => { //Checks if two line segments of format line=[{x, y}, {x, y}] intersect. Assumes line2 is either horizontal or vertical.
        if(line2[0].y === line2[1].y){ //Horizontal
            if((line1[0].y >= line2[0].y && line1[1].y <= line2[0].y) || (line1[0].y <= line2[0].y && line1[1].y >= line2[0].y)){
                let sortedX = [Math.min(line2[0].x, line2[1].x), Math.max(line2[0].x, line2[1].x)];
                if((line1[0].x >= sortedX[0] && line1[0].x <= sortedX[1]) || (line1[1].x >= sortedX[0] && line1[1].x <= sortedX[1])){
                    return true;
                }
            }
            return false;
        }
        else if(line2[0].x === line2[1].x){ //Vertical
            if((line1[0].x > line2[0].x && line1[1].x < line2[0].x) || (line1[0].x < line2[0].x && line1[1].x > line2[0].x)){
                let sortedY = [Math.min(line2[0].y, line2[1].y), Math.max(line2[0].y, line2[1].y)];
                if((line1[0].y > sortedY[0] && line1[0].y < sortedY[1]) || (line1[1].y > sortedY[0] && line1[1].y < sortedY[1])){
                    return true;
                }
            }
            return false;
        }
        else{
            console.log("Error: Line2 is neither horizontal nor vertical.")
            return false;
        }
    }
    doScroll = (deltaY) => {
        if(this.y+deltaY > 0 && this.y+this.canvas.height+deltaY < this.data[0].length*this.cellHeight){
            this.y += deltaY
            this.lastMouse.y -= deltaY;
            this.mouseDraw();
        }
    }
    handleScroll = (event) => {
        this.doScroll(event.deltaY)
        this.drawAll();
    }
    autoScroll = () => {
        const SCROLL_SPEED = 5;
        if(this.curMouse && this.mouseMode !== 4){
            if(this.curMouse.y < AUTOSCROLL_MARGIN + HEADER_HEIGHT){
                this.doScroll(-SCROLL_SPEED);
            }
            if(this.curMouse.y > this.canvas.height - AUTOSCROLL_MARGIN){
                this.doScroll(SCROLL_SPEED);
            }
        }
    }
    handleMouseDown = (e) => {
        this.mouseMode = 1;
        if(this.curMouse.x < this.timesWidth){
            this.mouseMode = 4;
        }
        this.handleMouseMove(e);
    }
    handleMouseUp = (e) => {
        this.mouseMode = 0;
        this.handleMouseMove(e);
    }
    handleMouseMove = (e) => {
        let rect = this.canvas.getBoundingClientRect();
        let mouse = {
            x: e.x - rect.left,
            y: e.y - rect.top
        }
        this.lastMouse = this.curMouse;
        if(!this.lastMouse){
            this.lastMouse = mouse;
        }
        this.curMouse = mouse;
        if(this.mouseMode === 4){
            this.y += this.curMouse.y-this.lastMouse.y;
        }
        this.mouseDraw();
    }
    handleMouseOut = (e) => {
        this.lastMouse = null;
        this.curMouse = null;
        this.mouseMode = 0;
    }
    componentDidMount = () => {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.textAlign = "center";
        this.canvas.addEventListener('wheel', this.handleScroll);
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseout', this.handleMouseOut);
        this.autoScrollInterval = setInterval(this.autoScroll, 20);
        this.drawAll();
        
    }
    render() { 
        return (
                <canvas width={this.timesWidth+this.cellWidth*this.cellsAcross} height={this.props.height ? this.props.height : 300} ref={this.canvasRef} style={{cursor: "crosshair", borderStyle: "solid", backgroundColor: "aliceblue"}}/>

            
        );
    }
}
 
export default TimeSelector_Canvas;