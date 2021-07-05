import { combineReducers  } from 'redux'
import axios from 'axios'
import { Reducer } from 'react';

var reducers: Array<Reducer<any, any>>;reducers = []

export const i_state = {

    auth:                        false,
    route:                          "",
    login:                          "",
    categories:                     [],
    goods:                          [],
    basket:                         [],
    order:                          "",
    market:                         "",
    search:                         "",
    orders:                         [],
    category:                       "",
    gcard:                          "",

}


for(const [key, value] of Object.entries(i_state)){
    reducers.push(
        function (state = i_state[key], action) {
            switch(action.type){
                case key: {
                    if(typeof(value) === "object"){
                        if(Array.isArray(value)) {
                            return action[key]
                        } else {
                            let data: object; data = {};
                            for(const key1 of Object.keys(value)){ 
                                data[key1] = action[key1] === undefined ? state[key1] : action[key1]
                            }   
                            return data
                        }

                    } else return action[key]
                }
                default: return state;
            }       
        }

    )
}


export async function   getData(method : string, params){

    let res = await axios.post(
            URL + method, params
    ).then(response => response.data)
        .then((data) => {
            if(data.Код === 200) console.log(data) 
            return data
        }).catch(error => {
          console.log(error)
          return {Код: 200}
        })
    return res

}


function                create_Store(reducer, initialState) {
    var currentReducer = reducer;
    var currentState = initialState;
    var listeners: Array<any>; listeners = []
    return {
        getState() {
            return currentState;
        },
        dispatch(action) {
            currentState = currentReducer(currentState, action);
            listeners.forEach((elem)=>{
                if(elem.type === action.type){
                    elem.func();
                }
            })
            return action;
        },
        subscribe(listen: any) {
            var ind = listeners.findIndex(function(b) { 
                return b.num === listen.num; 
            });
            if(ind >= 0){
                listeners[ind] = listen;
            }else{
                listeners = [...listeners, listen]
            }
        }
    };
}

const                   rootReducer = combineReducers({

    auth:                   reducers[0],
    route:                  reducers[1],
    login:                  reducers[2],
    categories:             reducers[3],
    goods:                  reducers[4],
    basket:                 reducers[5],  
    order:                  reducers[6],  
    market:                 reducers[7],
    search:                 reducers[8],
    orders:                 reducers[9],  
    category:               reducers[10],  
    gcard:                  reducers[11],

})


export const Store   =  create_Store(rootReducer, i_state)

//export const URL = "https://marketac.ru/ut/hs/API/V1/"

export const URL = "http://marketac.ru:3000/"

export async function   getDatas(){
}

async function load( categ, page = 1 ){
    let res = await getData("method", {
        method: "Р_Продукты",
        CategoryId: categ,
        page: page,
    })  

    console.log( res )
    if(res.length > 0){
        Store.dispatch({ type: "goods", goods: res })
        if( categ === Store.getState().category.Код )
          load( categ, page + 1 )
    }

}

async function exec(){
    let res: any

    res = await getData("method", {method: "Категории"})
    Store.dispatch({type: "categories", categories: res.map((e) => {
        e.Категории = JSON.parse(e.Категории)
        return e
    })})

    console.log(res) 

}

exec();

export const car_jarr = [
    {Имя: "Сертификат в подарок",       Описание: "Подарите сертификат близким",    Картинка: "", Цвет: '#9c0c3c'}
  , {Имя: "ПромоКод",                   Описание: "Скидка на первый заказ 15%",     Картинка: "", Цвет: '#03bd38'}
  , {Имя: "Акционные товары, скидки",   Описание: "",                               Картинка: "", Цвет: '#ff0000'}
  , {Имя: "Бесплатная доставка",        Описание: "Купите товары больше 2000 руб",  Картинка: "", Цвет: '#00dd00'}
]
