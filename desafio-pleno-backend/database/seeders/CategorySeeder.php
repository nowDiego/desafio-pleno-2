<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('categories')->insert(
            [
               'id'=> '1',
               'name' => 'Futebol',
               'slug'=> 'futebol',                                                         
               'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
               'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]
        );

        DB::table('categories')->insert(
            [
               'id'=> '2',
               'name' => 'Basquete',
               'slug'=> 'basquete',                                                         
               'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
               'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]
        );
    }
}
