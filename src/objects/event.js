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
        this.character = _characters;
        this.length = this.eDate-this.bDate;
        this.worldEvent = _worldEvent;
    }

}