/*Constructor class for character objects*/
export default class Character {
    /*Params:
    _name: Name of the character
    _birthday: Birthday of the character
    _color: Display color for characters timeline
    _events: Events on the characters Timeline*/
    constructor(_name, _birthday, _color, _show, _events, _id) {
        this.name = _name;
        this.birthday = _birthday;
        this.color = _color;
        this.events = _events;
        this.show = _show;
        this.id = _id;
        this.nameDup = "";
    };

    //Methods to change character params
    
    //Change Name
    changeName(_newName) {
        this.name = _newName
    }

    //Change Birthday
    changeBirthday(_newBirthday) {
        this.birthday = _newBirthday;
    }

    //Change Color
    changeColor(_newColor){
        this.color = _newColor
    }

    changeDup(_newCount){
        this.nameDup = _newCount;
    }

    //Toggle Show
    changeVisibility(){
        this.show = !this.show;
    }

    //Methods to add/change events - multiple methods for different ways of changing the timeline

    //deletes all events from the timeline, except for the birthday
    deleteAllEvents(){
        this.events = [];
        this.events[0] = this.birthday;
    }

    //TODO Method to add event
    addEvent(_event){

    }

    //TODO Method to delete event
    deleteEvent(_event){

    }
    

}