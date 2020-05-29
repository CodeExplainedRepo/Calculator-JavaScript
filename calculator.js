const input_element = document.querySelector(".input");
const output_operation_element = document.querySelector(".operation .value");
const output_result_element = document.querySelector(".result .value");

let calculator_buttons = [
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },{
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },,{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    }
];

let data = {
    operation : [],
    result : [],
}

function createCalculatorButtons(){
    const btns_per_row = 4;
    let added_btns = 0;

    calculator_buttons.forEach( (button, index) => {
        if( added_btns % btns_per_row == 0 ){
            input_element.innerHTML += `<div class="row"></div>`;
        }
        
        const row = document.querySelector(".row:last-child");
        row.innerHTML += `<button id="${button.name}">
                            ${button.symbol}
                          </button>`;

        added_btns++;
    });
}
createCalculatorButtons();

input_element.addEventListener("click", event => { 
    const target_btn = event.target;

    calculator_buttons.forEach( button => {
        if( button.name == target_btn.id ) calculator(button);
    });
    
});

function calculator( button ){
    if( button.type == "operator" ){
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    }
    else if( button.type == "number" ){
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    }
    else if( button.type == "key" ){
        if( button.name == "clear" ){
            data.operation = [];
            data.result = [];
            updateOutputResult(0);
        }
        else if( button.name == "delete" ){
            data.result.pop();
            data.operation.pop();            
        }
    }
    else if( button.type == "calculate" ){
        
        // PUSH WHAT'S LEFT IN TEMP TO RESULT AND JOIN RESULT
        let result_joined = data.result.join('');

        // CLEAR ALL ARRAYS, NO NEED TO SAVE ANYTHING ANYMORE
        data.operation = [];
        data.result = [];

        // CHECK IF THERE WAS A SYNATX ERROR IN THE operation
        let result_final;
        try {
            result_final = eval(result_joined); 
        } catch (error) {
            if (error instanceof SyntaxError) {
                result_final = "Syntax Error!"
                updateOutputResult( result_final );
                return;
            }
        }

        // FORMAT THE RESULT
        result_final = formatResult(result_final);

        // SAVE RESULT FOR ANY FUTURE USE
        data.operation.push(result_final);
        data.result.push(result_final);
        
        // UPDATE OUTPUT
        updateOutputResult( result_final );

        return;
    }

    updateOutputOperation( data.operation.join('') );
}

function updateOutputOperation(operation){
    output_operation_element.innerHTML = operation;
}

function updateOutputResult(result){
    output_result_element.innerHTML = result;
}

function digitCounter(number){
    return number.toString().length;
}

function isFloat(number){
    return number % 1 != 0;
}

const max_output_number_length = 10;
const output_precision = 5;

function formatResult( result ){
    if( digitCounter(result) > max_output_number_length){
        if( isFloat(result) ){
            const result_int = parseInt(result);
            const result_int_length = digitCounter(result_int);

            if( result_int_length > max_output_number_length ){
                return result.toPrecision(output_precision);
            }else{
                const num_digits_after_point = max_output_number_length - result_int_length;
                return result.toFixed(num_digits_after_point);
            }
        }else{
            return result.toPrecision(output_precision);
        }
    }else{
        return result;
    }
}
