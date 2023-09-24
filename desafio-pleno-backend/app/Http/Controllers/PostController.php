<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userID = Auth::id();
        
        $order = isset($request->order)?$request->order : 'desc';
        $type =  isset($request->type)?$request->type:null;

       $post = null ;

       if($type == 'feed'){

        $post = Post::with(['user','category'])->orderBy('id', $order )->paginate(7);

       } 
       elseif($type == 'post'){

        $post = Post::with(['user','category'])->where('user_id','=',$userID)->orderBy('id', $order )->paginate(6);

       }
       
       

        if(!$post){
            return response()->json([
                'status'=>false,
                'message'=>'Post não encontrado'
            ]);
        }

        return response()->json([
            'status'=>true,
            'data'=>$post
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
       $userId = Auth::id();

       $photo = '';
       
       if ($request->hasFile('photo')) {    
             
        $filename = time() . '.' . $request->file('photo')->extension();
        $photo = $request->photo->storeAs('images',  $filename , 'public');
      
       }


        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'photo' => $photo,
            'user_id'=>$userId,
            'category_id'=>$request->category
        ]);

        if(!$post){
            return response()->json([
                'status'=>false,
                'message'=>'Ocorreu um erro ao criar a postagem'
            ]);
        }

        return response()->json([
            'status'=>true,
            'message'=>'Post criado com sucesso',
            'data'=>$post->load(['user','category'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        if(!$post){
            return response()->json([
                'status'=>false,
                'message'=>'Ocorreu um erro ao buscar a postagem'
            ]);
        }

        return response()->json([
            'status'=>true,           
            'data'=>$post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        
        if(!$post){
            return response()->json([
                'status'=>false,
                'message'=>'Ocorreu um erro ao buscar a postagem'
            ]);
        }


               
       $photo = '';
       
       if ($request->hasFile('photo')) {    
               
        $filename = time() . '.' . $request->file('photo')->extension();
        $photo = $request->photo->storeAs('images',  $filename , 'public');
       
        $this->deletePhoto($post->photo);

       }

      isset($request->title)? $post->title = $request->title:null;
      isset($request->content)? $post->content = $request->content:null;
      isset($request->photo)? $post->photo = $photo:null;
      isset($request->category)? $post->category_id = $request->category:null;

    $result = $post->save();
    
       if(!$result){
        return  response()->json(['status'=>false,'message'=>'Ocorreu um erro ao atualizar']);
      }

      return  response()->json([
        'status'=>true,
        'data'=>$post->load(['user','category']),
        'message'=>'Postagem atualizada com sucesso'
    ]);

      
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if(!$post){
            return response()->json([
                'status'=>false,
                'message'=>'Ocorreu um erro ao buscar a postagem'
            ]);
        }

        $this->deletePhoto($post->photo);

        $result = $post->delete();

        if(!$result){
            return  response()->json(['status'=>false,'message'=>'Ocorreu um erro ao deletar']);
          }
  
          return  response()->json(['status'=>true,'message'=>'Postagem deletada com sucesso']);
    }



    

    public function deletePhoto($photo){

        if (Storage::disk('public')->exists($photo)) {
           
          $result =  Storage::disk('public')->delete($photo);
        
          return $result;      

        }       

      }



}
