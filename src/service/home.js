// home
import fetch from '../config/fetch'
import { API_PATH } from '../config/env'

// 用户注册
export const apiUserRegister = (obj) => fetch(API_PATH + '/user/register', obj, 'POST')

//用户信息
export const apiUserInfo = (obj) => fetch(API_PATH + '/user/user-info', obj, 'GET')

//登录
export const apiUserLogin = (obj) => fetch(API_PATH + '/user/login', obj, 'POST')
