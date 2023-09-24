<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
  

    public function test_store_user_signup()
    {
        // $this->withoutExceptionHandling();       
        
       
        $payload = [                      
            'name'=>'taylor',
            'email'=>'taylor@gmail.com',
            'password'=>'taylor@21'
        ];     
                
       
        $response = $this->post('/api/signup',$payload);

        $response->assertJson([
            'status' => true
        ]);

     
    }



}
