class DestinationsRepo {
    constructor(allDestinationData){
        this.allDestinationData = allDestinationData
    }
    getDestinationById(id){
        let destFilter = this.destinations.filter(dest => id === dest.id)
        return destFilter[0];
    }
}