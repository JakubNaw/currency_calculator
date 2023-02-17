import React from "react";
import './calculator.css';

function round_to_two_digits(value){
    return (Math.round(value * 100) / 100).toFixed(2);
}
export class Calculator extends React.Component{
    constructor(props) {
        super(props);

        // value1 - value given
        //value2 - result
        this.state = {value1: '', value2: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlechange_send = this.handlechange_send.bind(this);

    }
    handlechange_send(event){
        this.setState({value1: event.target.value})
    }

    handleSubmit(){
        let value = parseFloat(this.state.value1) // converting value1 to float
        //reading currencies
        let currency_sended = document.getElementById("send_drop_down").value;
        let currency_received = document.getElementById("receive_drop_down").value;
            console.log(currency_received+" " + currency_sended);
            console.log(value);
        //case - inccorrect value
        if( isNaN(value)){
            this.setState({value2: "Given value is incorrect"});
        } //sended currency same as received
        else if(currency_sended===currency_received){
            this.setState({value2: this.state.value1});
        } // received currency is zloty so you need to multiply sended value by exchange rate
        else if(currency_received==="PLN") {
            fetch("http://api.nbp.pl/api/exchangerates/rates/A/"+ currency_sended+"/")
                .then(res => res.json())
                .then(res => {

                    value = value * parseFloat(res.rates[0].mid);
                    console.log(value);
                    this.setState({value2: round_to_two_digits(value)});
                })
        } // sended currency is zloty so you need to divide sended value by exchange rate
        else if(currency_sended==="PLN"){
            fetch("http://api.nbp.pl/api/exchangerates/rates/A/"+ currency_received+"/")
                .then(res => res.json())
                .then(res => {

                    value = value / parseFloat(res.rates[0].mid);
                    console.log(value);
                    this.setState({value2: round_to_two_digits(value)});
                })
        }
        else{
            //both currencies aren't zloty and the nbp api show only exchange rates for zloty
            //in order to get result firstly we mutiply sended value by echange rate to get sended value in zloty
            //then we divide by other exchange rate
            fetch("http://api.nbp.pl/api/exchangerates/rates/A/"+ currency_sended+"/")
                .then(res => res.json())
                .then(res => {

                    value = value * parseFloat(res.rates[0].mid);
                    console.log(value);

                    //another fetch is here because of problem with doing fetches in correct order
                    fetch("http://api.nbp.pl/api/exchangerates/rates/A/"+ currency_received+"/")
                        .then(res => res.json())
                        .then(res => {

                            value = value / parseFloat(res.rates[0].mid);
                            console.log(value);

                            this.setState({value2: round_to_two_digits(value)});
                        })
                })

        }

    }
    render() {
        return(
            <div className={"calculator_comp"}>
               <div className={"calculator_box"}>
                   <div id={"sended_currency"}>
                   <div>You send </div>
                   <select id="send_drop_down">
                       <option value="PLN" >Polish zloty</option>
                       <option value="EUR">Euro</option>
                       <option value="CHF" >Swiss franc</option>
                       <option value="GBP">Pound sterling</option>

                   </select>
                       <input id={"sended_value"} size={"20"} height={"20"} type="text" onChange={this.handlechange_send} />
                   </div>
                   <div id={"recieved_currency"}>
                   <div>You receive</div>
                   <select id="receive_drop_down">
                       <option value="PLN" >Polish zloty</option>
                       <option value="EUR">Euro</option>
                       <option value="CHF" >Swiss franc</option>
                       <option value="GBP">Pound sterling</option>
                   </select>
                       <input id={"received_value"} size={"20"} height={"20"} type="text" disabled value={this.state.value2}/>
                   </div>
                   <input id={"calculate_button"} type="submit" value="Calculate" onClick={this.handleSubmit} />
               </div>
            </div>
        )
    }
}
export default round_to_two_digits;