<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_store_post()
    {
        $this->withoutExceptionHandling();       
        
        $category = Category::factory()->create(); 
        $user = User::factory()->create();  

            $this->actingAs(
               $user         
           );
       
        $payload = [
           'title'=> 'Programador Cobol',
           'content'=>'Programador Cobol',
           'photo'=>'Programador Cobol',
           'category'=>$category->id
        ];     
        
       
       
        $response = $this->post('/api/posts',$payload);

        $response->assertJson([
            'status' => true
        ]);
     
    }


    public function test_update_post()
    {
        $this->withoutExceptionHandling(); 

        $category = Category::factory()->create(); 
        $user = User::factory()->create();  

            $this->actingAs(
               $user         
           );
                    
       
       $post = Post::factory()->create(
           [              
               'user_id'=>$user->id,              
           ]
       ) ;

       
           $payload = [
            'title'=> 'Programador Cobol',
            'content'=>'Programador Cobol',
            'photo'=>'Programador Cobol',
            'category'=>$category->id
            ];     
      
       
        $response = $this->patch("/api/posts/{$post->id}",$payload);
    
        $response->assertJson([
            'status' => true
        ]);
    
    }


    public function test_destroy_post()
    {
       $this->withoutExceptionHandling(); 

       $user = User::factory()->create();  

           $this->actingAs(
              $user         
          );
                  
      
      $post = Post::factory()->create(
          [              
              'user_id'=>$user->id,              
          ]
      ) ;
             
        $response = $this->delete("/api/posts/{$post->id}");
    
        $response->assertJson([
            'status' => true
        ]);
    
    }


    public function test_index_post()
    {
   
    //    $this->withoutExceptionHandling(); 
       
       $user = User::factory()->create();  

           $this->actingAs(
              $user         
          );
                 
      
      $post = Post::factory(2)->create(
          [              
              'user_id'=>$user->id,              
          ]
      ) ;

      //Filter search      
       $page = 1;
       $order = 'desc';     
       $type = 'post';       
       
 
        $response = $this->get("/api/posts?page=$page&type=$type&order=$order");
    
        $response->assertJson([
            'status' => true
        ]);
    
    }


}
