class Trips {
    constructor(data){
        this.id = data.id
        this.userID = data.userID
        this.destinationID = data.destinationID
        this.travelers = data.travelers
        this.date = data.date
        this.duration = data.duration
        this.status = data.status
        this.suggestedActivites = data.suggestedActivites
    }
}
export default Trips