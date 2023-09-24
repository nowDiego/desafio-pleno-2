<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
            'title'=>'required|max:255',
            'content'=>'required|',
            'photo'=>'required|',
            'category'=>'required|',
        ];
    }


    public function messages()
    {
        return [            
       
            'title.required' => 'Título  é obrigatório',
            'title.max'=>'Você excedeu o número máximo caracteres deste campo',                   
          
            'content.required' => 'Conteúdo  é obrigatório',
          
            'photo.required' => 'Foto  é obrigatória',

            'category.required' => 'Categoria  é obrigatório',                   
                                              
     
        ];
    }

}
