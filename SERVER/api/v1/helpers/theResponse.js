// Handle Responses 

class ResponseHandler{
    constructor(status, data, error, message){
        this.status = status, 
        this.data = data, 
        this.error = error, 
        this.message = message;
    }

    result(){
        const finalRes = {}; 
        finalRes.status = this.status; 
        finalRes.message = this.message; 
        if(this.data !== null){
          finalRes.data = this.data; 
        } 

        if(this.error !== null){
            finalRes.error = this.error; 
        }
        return finalRes; 
    }
}


export default ResponseHandler; 