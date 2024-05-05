/*Constructor class for Moments on the timeline*/
/*TODO
Information needed:
Difference from universal null
Year
Month
Day
Hour
Minute
Second */
export default class event{

    constructor(_name, _desc, _bDate, _eDate, _characters, _worldEvent){
        this.name = _name;
        this.desc = _desc;
        //Dates must be entered as an Array, formated as such: [Day, Month, Year, Hour, Minutes, Seconds]
        this.bDate = _bDate;
        this.eDate = _eDate;
        this.characters = _characters;
        this.length = [this.eDate[0]-this.bDate[0],
        this.eDate[1]-this.bDate[1],
        this.eDate[2]-this.bDate[2],
        this.eDate[3]-this.bDate[3],
        this.eDate[4]-this.bDate[4],
        this.eDate[5]-this.bDate[5],];
        this.worldEvent = _worldEvent;
    }

}