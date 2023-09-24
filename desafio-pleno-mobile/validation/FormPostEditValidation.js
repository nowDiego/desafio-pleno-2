

export const validate = (values) => {
    const errors = {};

    
    if (values.photo){

    if ((values.photo.size/1024/1024)>10) {
        errors.photo = "Tamanho limite de 10 mb foi excedido";
    }
    else{

        if (values.photo.type !== 'image/png'  && values.photo.type !== 'image/jpeg') {
            errors.photo = "Tipo de imagem inválida";
        }

    }    
       
    }

    return errors;
};



