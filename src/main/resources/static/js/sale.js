allCustomer()
let globalCusArr = []
function allCustomer(){
    $.ajax({
        url: '/customer/clist',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            globalCusArr = data;
            createCustomer(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}
function createCustomer(data){
    $("#customers").find('option').remove().end();
    $("#customers").append(`<option data-subtext="">Seçim Yapınız</option>`);
    globalSupArr = data;
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.cname + " "+  itm.csurname;
        console.log(st);
        $("#customers").append(`<option data-subtext="" value="`+itm.cid+`">`+st+`</option>`) ;
    }
    $("#customers").selectpicker("refresh");
}
let globalProArr;
allProduct();
function allProduct(){

    $.ajax({
        url: '/product/plist',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            globalProArr = data
            console.log(data)
            createProduct(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}
function createProduct( data ){
    $("#product").find('option').remove().end();
    $("#product").append(`<option data-subtext="">Seçim Yapınız</option>`);
    $("#products").find('option').remove().end();
    $("#products").append(`<option data-subtext="">Seçim Yapınız</option>`);
    globalProArr = data;
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.productname + "-->Fiyatı :"+ itm.sellprice +"₺";
        console.log(st);
        $("#product").append(`<option data-subtext="" value="`+itm.proid+`">`+st+`</option>`) ;
        $("#products").append(`<option data-subtext="" value="`+itm.proid+`">`+st+`</option>`) ;
    }
    $("#product").selectpicker("refresh");
    $("#products").selectpicker("refresh");
}

allWarehouse()
function allWarehouse(){

    $.ajax({
        url: '/warehouse/list',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            createWareHouse(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}
function createWareHouse( data ){
    $("#warehouse").find('option').remove().end();
    $("#warehouse").append(`<option data-subtext="">Seçim Yapınız</option>`);
    $("#warehouses").find('option').remove().end();
    $("#warehouses").append(`<option data-subtext="">Seçim Yapınız</option>`);
    globalWareArr = data;
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.wname;
        console.log(st);
        $("#warehouse").append(`<option data-subtext="" value="`+itm.wid+`">`+st+`</option>`) ;
        $("#warehouses").append(`<option data-subtext="" value="`+itm.wid+`">`+st+`</option>`) ;
    }
    $("#warehouse").selectpicker("refresh");
    $("#warehouses").selectpicker("refresh");
}

codeGenerator();
function codeGenerator() {
    const date = new Date();
    const time = date.getTime();
    const key = time.toString().substring(4);
    $("#bNo").val(key);
    $("#biNo").val(key);
}


function fncSell(decision){
    let amount = 0;
    if (decision == 1){
        paymenttype = $('#payment-type').val()
        bill_id = $('#bNo').val()
        cus_id = $('#customers').val()
        prodid = $('#product').val()
        for (let k = 0 ; k<globalProArr.length;k++){
            const itm = globalProArr[k];
            if (itm.proid == prodid){
                console.log(itm.sellprice)
                amount = itm.sellprice;
            }
        }
        waid = $('#warehouse').val()
        note = $('#note').val()
    }else{
        paymenttype = $('#payment-types').val()
        bill_id = $('#biNo').val()
        cus_id = 0;
        prodid = $('#products').val()
        for (let k = 0 ; k<globalProArr.length;k++){
            const itm = globalProArr[k];
            if (itm.proid == prodid){
                console.log(itm.sellprice)
                amount = itm.sellprice;
            }
        }
        waid = $('#warehouses').val()
        note = $('#notes').val()
    }

    opestatus = false
    const obj = {
        bill_id : bill_id,
        cus_id:cus_id,
        prodid:prodid,
        amount:amount,
        waid:waid,
        note:note,
        opestatus:opestatus,
    }
    if (paymenttype != 0){
        $.ajax({
            url:'/sale/sell/'+paymenttype,
            type:'POST',
            data:JSON.stringify(obj),
            dataType:'JSON',
            contentType: 'application/json; charset=utf-8',
            success: function ( data ){
                if (data == 1){
                    alert("işlem Başarılı");
                    fncAddReset();
                    allCustomer();
                    allWarehouse();
                    allProduct();
                    allList();
                }
                else{
                    alert("işlem başarısız");
                }


            },
            error: function ( err ){
                alert("işlem sırasında bir hata oluştu");
            }
        })
    }

}
fncAddReset();
function fncAddReset() {
    select_id = 0;
    $("#note").val("");
    $("#notes").val("");


    codeGenerator();
}
allList();
function allList(){
    $.ajax({
        url:'/sale/list/',
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function ( data ){
            createSale(data);
        },
        error: function ( err ){
            alert("işlem sırasında bir hata oluştu");
        }
    })
}

function createSale(data){
    console.log(data);
    let customerName;
    let PaymentType;
    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data [i];

        if (itm.cus_id != 0){
            for (let j = 0; j<globalCusArr.length; j++){
                if (globalCusArr[j].cid == itm.cus_id){
                    customerName = globalCusArr[j].cname + ' ' + globalCusArr[j].csurname;
                    if (itm.paymenttype== 1) {
                        paymenttype = "Nakit"
                    }
                    else if(itm.paymenttype ==2 ){
                        paymenttype = "Banka Kartı"
                    }
                    else {
                        paymenttype = "Banka Havale"
                    }
                    html += `    <tr>
        <th scope="row">`+itm.bill_id+`</th>
        <td>`+customerName+`</td>
        <td>`+paymenttype+`</td>
        <td>`+itm.amount+`₺</td>
        <td>`+itm.note+`</td>
        <td>`+itm.date+`</td>
    </tr>`


                }
            }
        }
        else{
            customerName = "Kayıtlı Olmayan Kullanıcı"
            if (itm.paymenttype== 1) {
                paymenttype = "Nakit"
            }
            else if(itm.paymenttype ==2 ){
                paymenttype = "Banka Kartı"
            }
            else {
                paymenttype = "Banka Havale"
            }
            html += `<tr>
        <th scope="row">`+itm.bill_id+`</th>
        <td>`+customerName+`</td>
        <td>`+paymenttype+`</td>
        <td>`+itm.amount+`₺</td>
        <td>`+itm.note+`</td>
        <td>`+itm.date+`</td>
    </tr>`
        }

    }
    $('#tableBuy').html(html);

}
