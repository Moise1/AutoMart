export default {
    validAdOne:{
        manufacturer: 'Opel', 
        body_type: 'mini bus', 
        model: 'New Opel 2019', 
        state: 'new', 
        status: 'available',
        price: parseFloat(5000.20), 
    },
    validAdTwo: {
        manufacturer: 'Opel', 
        body_type: 'mini bus', 
        model: 'New Opel 2019', 
        state: 'new', 
        status: 'sold',
        price: parseFloat(3000.20), 
    },

    invalidAdOne: {
        manufacturer: '',
        body_type: 'mini bus', 
        model: 'New Opel 2019', 
        state: 'New', 
        status: 'available',
        price: parseFloat(5000.20), 
    }
    
}