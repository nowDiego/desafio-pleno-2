<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
   
        $user = User::where('name','=',$request->username)      
        ->first();             
              
          if (!$user) {
            return
            response()->json([
                'status'=>false,
                'message'=>'Login Inválido',                
            ]);
       }
    
       if (! Hash::check($request->password, $user->password)) {
        return
        response()->json([
            'status'=>false,
            'message'=>'Login Inválido'
        ]); 
       
    }
        
    $token = Auth::login($user);
    
     $data = [
        'name'=>$user->name,
     ];
        
      return $this->respondWithToken($token,$data,'Success login');
           
    
    }
    
    
    protected function respondWithToken($token,$data,$message)
    {
        $date = Carbon::now();
        $carbon_date = Carbon::parse($date);
        $carbon_date->addHours(5);
    
        return response()->json([
            'status'=>true,
            'data'=>$data,
            'message'=>$message,            
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' =>   $carbon_date
        ]);
    }
    
    
        
    
}
