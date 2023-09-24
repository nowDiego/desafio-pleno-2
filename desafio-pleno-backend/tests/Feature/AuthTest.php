<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
 

    public function test_login_auth()
    {
        $user = User::factory()->create(
            [
                'name'=>'build',
                'password'=>Hash::make('building@1')
            ]
        );             

                
        $payload = [
            'username'=> 'build',
            'password'=>'building@1'
        ];
       
        $response = $this->postJson('/api/login',$payload);

        $response->assertJson([
            'status' => true
        ]);
        
    }

}
