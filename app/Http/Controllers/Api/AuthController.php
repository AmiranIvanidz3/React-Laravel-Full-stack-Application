<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignUpRequest $request){

        
        $data = $request;
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);

    }

    public function login(LoginRequest $request){

        $credentials = $request->all();;
        if (!Auth::attempt($credentials)){
            return response([
                'message' => 'Provided Credentials Is Incorrect'
            ], 422);
        }else{
            Auth::attempt($credentials);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
