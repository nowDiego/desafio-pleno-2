export const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
        errors.name = "Nome é obrigatório";

    }    
 
    if (!values.email) {
        errors.email = "E-mail é obrigatório";
    }else if (!regex.test(values.email)) {
        errors.email = "E-mail inválido";       
    }


    if (!values.password) {
        errors.password = "Senha é obrigatória";
    }  

      

    return errors;
};



