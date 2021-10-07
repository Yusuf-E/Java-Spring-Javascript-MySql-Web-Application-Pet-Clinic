let globalArr = []
function allSafe(){
    $.ajax({
        url: './company-cashier/list',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {

            createRow(data)

        },
        error: function (err){
            console.log(err)
        }
    })
}
allCustomer()
allSupplier()
allSafe()
function createRow( data ) {
    globalArr = data
    let temp = 0;
    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        if( itm.opestatus == false ){
            for (let j = 0; j < globalCusArr.length; j++) {
                if( globalCusArr[j].cid == itm.cus_id  ){
                    temp = -1;
                    const stType = itm.paymenttype ==  1  ? 'Nakit' : itm.paymenttype== 2 ?  'Banka Kartı'  : 'Banka Havalesi'
                    const stOpe = itm.opestatus ==  0  ? 'Para Girişi' : 'Para Çıkışı'
                    const cusname = globalCusArr[j].cname + ' ' + globalCusArr[j].csurname
                    html += `<tr>
        <th scope="row">`+itm.bill_id+`</th>
        <td>`+itm.date+`</td>
        <td>`+stOpe+`</td>
        <td>`+stType+`</td>
        <td>`+cusname+`</td>
        <td>`+itm.note+`</td>
        <td>`+itm.amount+`₺</td>
      </tr>`;
                }
                temp ++;
            }
            if (temp != -1 && temp == globalCusArr.length){
                const stType = itm.paymenttype ==  1  ? 'Nakit' : itm.paymenttype== 2 ?  'Banka Kartı'  : 'Banka Havalesi'
                const stOpe = itm.opestatus ==  0  ? 'Para Girişi' : 'Para Çıkışı'
                const cusname  = 'Kayıtlı Olmayan Müşteri'
                html += `<tr>
        <th scope="row">`+itm.bill_id+`</th>
        <td>`+itm.date+`</td>
        <td>`+stOpe+`</td>
        <td>`+stType+`</td>
        <td>`+cusname+`</td>
        <td>`+itm.note+`</td>
        <td>`+itm.amount+`₺</td>
      </tr>`;
            }
            temp = 0;
        }else {
            for (let j = 0; j < globalSupplier.length; j++) {
                if (globalSupplier[j].sid == itm.cus_id) {
                    const stType = itm.paymenttype ==  1  ? 'Nakit' : itm.paymenttype== 2 ?  'Banka Kartı'  : 'Banka Havalesi'
                    const stOpe = itm.opestatus ==  0  ? 'Para Girişi' : 'Para Çıkışı'
                    const cusname = globalSupplier[j].sname
                    html += `<tr>
        <th scope="row">`+itm.bill_id+`</th>
        <td>`+itm.date+`</td>
        <td>`+stOpe+`</td>
        <td>`+stType+`</td>
        <td>`+cusname+`</td>
        <td>`+itm.note+`</td>
        <td>`+itm.amount+`₺</td>
      </tr>`;
                }
            }
        }


    }
    $('#safeRow').html(html);
}
let globalCusArr = [];
function allCustomer(){
    $.ajax({
        url: '/customer/clist',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {

            globalCusArr = data

        },
        error: function (err){
            console.log(err)
        }
    })
}
let globalSupplier = [];
function allSupplier(){

    $.ajax({
        url: './suppliers/slist',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {

            globalSupplier = data
        },
        error: function (err){
            console.log(err)
        }
    })
}

function cashList(type){

    $.ajax({
        url: './company-cashier/cashList/'+type,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {

            createRow(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}
function opeList(ope){

    $.ajax({
        url: './company-cashier/opeList/'+ope,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            createRow(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}
let globalBillArr = []
safeAmount()
function safeAmount(){


    $.ajax({
        url: './company-cashier/list/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            globalBillArr = data;
            totalSafe()
            console.log(globalBillArr)
        },
        error: function (err){
            console.log(err)
        }
    })



}

function totalSafe(){

    let cashIn = 0;
    let cashOut = 0;

    for (let i = 0; i < globalBillArr.length; i++) {
        const itm = globalBillArr[i]
        console.log(itm)
        if(itm.opestatus == false){
            cashIn += itm.amount
        }
        else{
            cashOut += itm.amount
            console.log(cashOut)
        }
    }
    let total = cashIn - cashOut
    $("#samount").text('Bakiye : '+total+'₺')

}