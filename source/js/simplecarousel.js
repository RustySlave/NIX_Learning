let carouselsArr = new Array();
class Carousel {
    _element; //tag element having carousel structure
    _coefficient = 0;//step
    getElement(){
        return this._element;
    }
    getCoefficient(){
        return  this._coefficient;
    }
    increaseCoefficient(val = 1){
        if(this._coefficient < 0){//coeff can't be greater 0
            this._coefficient += val;
        }
    }
    decreaseCoefficient(val = 1){
        const MOVING_ELEMENT = this._getMovingElement();
        //coeff can't be greater than all inner elements - shown elements
        if(this._coefficient >= this.getShownSubElementCount() - MOVING_ELEMENT.childElementCount){
           this._coefficient -= val;
        }
    }
    moveOneElement(){
        const MOVING_ELEMENT = this._getMovingElement();
        //calculation offset percentage
        let movingInPercents = 100/this.getShownSubElementCount(MOVING_ELEMENT)*this.getCoefficient();
        MOVING_ELEMENT.style.transform = `translateX(${movingInPercents}%)`;
    }
    getShownSubElementCount(){//dynamically calculated number of blocks shown
        const MOVING_ELEMENT = this._getMovingElement();
        let position = MOVING_ELEMENT.className.search('elements-[0-9]*-inside');
        return MOVING_ELEMENT.className.substr(position, 11).split('-')[1];
    }
    _getMovingElement(){
        return this._element.querySelector('main.moving-elements');
    }
    constructor(name, coefficient = 0) {
        this._element = name;
        this._coefficient = coefficient;
    }
}
document.querySelectorAll('.product-carousel').forEach((item)=>{
    carouselsArr.push(new Carousel(item));//creating carousels' array
});
carouselsArr.forEach((element)=>{//adding listeners for forward and backward buttons
    element.getElement().querySelectorAll('.carousel-move-btn.move-backward').forEach((btn)=>{
        btn.addEventListener('click', ()=>moveOneElementBackward(element));
    });
    element.getElement().querySelectorAll('.carousel-move-btn.move-forward').forEach( (btn)=>{
        btn.addEventListener('click', ()=>moveOneElementForward(element));
    });
})
function moveOneElementForward(carusel){
    carusel.increaseCoefficient();
    carusel.moveOneElement();
}
function moveOneElementBackward(carusel){
    carusel.decreaseCoefficient();
    carusel.moveOneElement();
}