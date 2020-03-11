var radioButtonNames=[];
var createColumns=function(){
    let data={
        column1:[
            "Apple",
            "Orange",
            "Banana",
            "Pickle"
        ],
        column2:[
            "Cat",
            "Dog",
            "Pig",
            "Onion"
        ],
        column3:[
            "ocean",
            "sea",
            "land",
            "water"
        ],
    };
    return data;
};

var createRadio=function(columnName,value){
    let id_random="radio_"+Math.ceil(Math.random()*100000);
    var div = document.createElement("div");
    var radio = document.createElement("input");
    radio.setAttribute("type","radio");
    radio.setAttribute("id",id_random);
    radio.setAttribute("name",columnName);
    radio.setAttribute("value",value);
    var label = document.createElement("label");
    label.setAttribute("for",id_random);
    label.innerHTML=value;
    div.appendChild(radio);
    div.appendChild(label);
    return div;
}
var generateColumnData = function(columnName,arr){
    var columnElement = document.createElement("div")
    columnElement.setAttribute("class","column")
    var columnHeadElement = document.createElement("div");
    columnHeadElement.innerHTML=columnName;
    columnHeadElement.setAttribute("class","columnhead")
    columnElement.appendChild(columnHeadElement)
    arr.forEach(value => {
        columnElement.appendChild(createRadio(columnName,value))
    });
    return columnElement
}
var sendSelectedValuesToServer=function(chosenColumnValues){
    console.log("chosenColumnValues ",chosenColumnValues);
    var selectedcolumnvalues = document.getElementById("selectedcolumnvalues");
    if(chosenColumnValues.length>0){
        selectedcolumnvalues.innerHTML=JSON.stringify(chosenColumnValues);
    }
    else{
        selectedcolumnvalues.innerHTML="please select some option"
    }
}
var onClickUnset=function(){
    var radioButtonList = [];
    radioButtonNames.forEach(name=>{
        var temp = document.querySelectorAll(`input[name=${name}]`);
        radioButtonList.push(temp);
    });
    radioButtonList.forEach(item=>{
        item.forEach(childItem=>{
            childItem.checked=false;
        })
    });
}
var onClickCreate=function(){
    var chosenColumnValues = []
    radioButtonNames.forEach(name=>{
        var radios = document.querySelectorAll(
            `input[name=${name}]:checked`);
            console.log(radios)
        if(radios.length >0){
            chosenColumnValues.push({name: name,value:radios[0].value})   
        }
    })
    sendSelectedValuesToServer(chosenColumnValues)
}
var init = function(){
    var containerElement= document.getElementById("container")
    var listOfColumns = createColumns();
    for(var key in listOfColumns){
        radioButtonNames.push(key)
        var columnElement=generateColumnData(key,listOfColumns[key])
        containerElement.appendChild(columnElement)
    }
};
init();
