import { v4 as uuidv4 } from 'uuid'
//要生成一个随机字符串 且每次执行不能发生变化 游客身份持久存储
export const getUUID = () => {
    //先从本地存储获取uuid 看是否有
    let uuid_tock = localStorage.getItem("UUIDTOKEN")
    //如果没有就生成
    if (!uuid_tock) {
        uuid_tock = uuidv4()
        localStorage.setItem("UUIDTOKEN", uuid_tock)
    }


    return uuid_tock
}