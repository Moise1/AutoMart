
export default {
    validOrder: {
        price_offered: 4000,
        car_id: 2, 
        status: "pending", 
    }, 
    updatedOrder: {
        new_price_offered: 3000
    }, 
    invalidOrder: {
        price_offered: "mmm",
        car_id: "", 
        status: "", 
    }, 
    invalidOrderTwo: {
        price_offered: 4000,
        car_id: 20, 
        status: "pending"
    },
    invalidOrderThree: {
        price_offered: 5000,
        car_id: 4, 
        status: "processing"
    }

};