import { IonButton, IonCard, IonCardHeader, IonIcon, IonItem, IonList, IonText } from "@ionic/react"
import { arrowBackOutline } from "ionicons/icons"
import { Store } from "../pages/Store"
import './Infopage.css'

export function InfoPage1(props):JSX.Element {
    let elem = <>
        <div className="ip-div-1">
            <div>
                <IonIcon icon = { arrowBackOutline } 
                    class = "w-2 h-2"
                    onClick= {()=>{
                        Store.dispatch({type: "route", route: "back"})
                    }}
                />
            </div>
            <div>
                <IonText class="f-24"><b>Наши контакты</b></IonText>
            </div>
            <div className="ip-div-2 f-18">
                <p>
                    Свои вопросы, пожелания или жалобы вы можете адресовать к нам по следующим контактным данным:						
                </p>
                <div className="mt-1">
                    Телефон: +7(777)777-77-77	
                </div>
                <div  className="mt-1">
                    email: asmrkt@mail.ru
                </div>
            </div>
        </div>
    </>

    return elem
}


export function InfoPage2(props):JSX.Element {
    let elem = <>
        <div className="ip-div-1">
            <div>
                <IonIcon icon = { arrowBackOutline } 
                    class = "w-2 h-2"
                    onClick= {()=>{
                        Store.dispatch({type: "route", route: "back"})
                    }}
                />
            </div>
            <div className="f-14">
                <h4>График работы</h4>		
            </div>
            <div className="ip-div-2 f-18 ml-2">
                <div>
                    понедельник – пятница: 10:00 – 19:00		
                </div>
                <div>
                    суббота: 10:00 – 17:00		
                </div>
                <div>
                    воскресенье: выходной день		
                </div>
            </div>
            <div className="f-14">
                <p>
                    <h4>Обработка заказов:</h4>						
                </p>
                <p>
                    Заказы принимаются круглосуточно, но обрабатываются в рабочее время менеджера.						
                </p>
                <p>
                    После оформления заказа с вами свяжется менеджера для уточнения деталей и подтверждения заказа.						
                </p>
                        
                <p>
                    <h4>Минимальная сумма заказа:</h4>						
                </p>
                <p>
                Минимальная сумма заказа для бесплатной доставки курьером по г. Якутск составляет 1000 рублей. При самовывозе минимальная сумма заказа не ограничена.						
                </p>

                <p>                     
                    <h4>Оплата заказа:</h4>						
                </p>
                <p>
                Оплата наличными или банковской картой при получении заказа. К оплате принимаются карты Visa, Mastercard, Maestro, МИР.						
                </p>
                <p>
                Вам будут выданы все необходимые документы для оформления покупки товарный и кассовый чек.						
                </p>
                <p>
                Для юридических лиц и индивидуальных предпринимателей возможна оплата по безналичному расчёту без НДС.						
                </p>
                <p>
                В этом случае доставка осуществляется на следующий рабочий день после зачисления оплаты на счет.						
                </p>
                <p>
                Для получении оплаченного заказа обязательно наличие у получателя документа удостоверяющего личность и доверенности или печати организации.						
                </p>

                <p>                      
                    <h4>Доставка:</h4>						
                </p>
                <p>
                Служба доставки интернет-магазина «АсМаркет» выполнит доставку выбранного вами товара:						
                </p>
                <p>
                - если заказ оформлен до 16:00, то мы доставим его на Ваш адрес на следующий день с 10 до 19.00.						
                </p>
                <p>
                - если заказ оформлен после 16:00, то мы доставим его на Ваш адрес через 1 рабочий день с 10 до 19:00.						
                </p>
                <p>
                Доставка осуществляется только в приделах указанной зоны.						
                </p>            
            </div>
            {/* <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A7737a696313c546289bcee3d00294f36e52d07aa4084cfff1f9c4de08f127d47&amp;source=constructor" 
                width="100%" 
                height="100%" 
                // frameborder="0"
            >
            </iframe>													 */}
        </div>
    </>
    return elem
}