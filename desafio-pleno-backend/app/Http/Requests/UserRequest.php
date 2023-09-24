<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'required|max:255',
            'email'=>'required|email|unique:users,email|max:255',
            'password'=>'required|max:255',
        ];
    }


    public function messages()
    {
        return [            
       
            'name.required' => 'Nome  é obrigatório',
            'name.max'=>'Você excedeu o número máximo caracteres deste campo',                   
          
            'email.required' => 'Email  é obrigatório',
            'email.max'=>'Você excedeu o número máximo caracteres deste campo',                         
            'email.email' => 'Email inválido',
            'email.unique' => 'Email já cadastrado',


            'password.required' => 'Senha  é obrigatória',
            'password.max'=>'Você excedeu o número máximo caracteres deste campo',                   
                                              
     
        ];
    }

}
