class Destinations {
    constructor(data){
        this.destinations = data
    }
    //retreive specific destinations method by id
    getDestinationById(id){

        let destFilter = this.destinations.filter(dest => id === dest.id)
        return destFilter[0];
    }
}
export default Destinations