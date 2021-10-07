let globalSupArr = [];
let globalProArr = [];
let globalWare = [];
let globalCusBox = []
let rid = 0;
let box_object = {};
$('#box_add_form').submit((event)=>{
    event.preventDefault();
    const suid = $("#suppliers").val();
    const prodid = $("#product").val();
    const warid   = $("#warehouse").val();
    const quantity   = $("#quantity").val();
    const price   = $("#price").val();
    const bid   = $("#bNo").val();


    const obj = {
        suid : suid,
        prodid : prodid,
        warid : warid,
        quantity : quantity,
        price : price,
        bid : bid,
    }
    console.log(obj)
/*    if (box.length != 0 ){
        // update box
        obj.update_id = 0;
    }
    else {
        obj.update_id = 1;
    }*/
    $.ajax({
        url:'/buy/boxes/add',
        type:'POST',
        data:JSON.stringify(obj),
        dataType:'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function ( data ){
                allBox();
                fncAddReset();
                alert("işlem Başarılı");
        },
        error: function ( err ){
            alert("işlem sırasında bir hata oluştu");
        }
    })

})

allSupplier();
function allSupplier(){

    $.ajax({
        url: '/suppliers/slist',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            createSupplier(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}

function createSupplier( data ){
    console.log(" Buraso :"+data)
    $("#suppliers").find('option').remove().end();
    $("#suppliers").append(`<option data-subtext="">Seçim Yapınız</option>`);
    globalSupArr = data;
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.sname;
        console.log(st);
        $("#suppliers").append(`<option data-subtext="" value="`+itm.sid+`">`+st+`</option>`) ;
    }
    $("#suppliers").selectpicker("refresh");
}



allProduct();
function allProduct(){

    $.ajax({
        url: '/product/plist',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
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
    globalProArr = data;
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.productname;
        console.log(st);
        $("#product").append(`<option data-subtext="" value="`+itm.proid+`">`+st+`</option>`) ;
    }
    $("#product").selectpicker("refresh");
}

let globalWareArr = [];
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
    globalWareArr = data;
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.wname;
        console.log(st);
        $("#warehouse").append(`<option data-subtext="" value="`+itm.wid+`">`+st+`</option>`) ;
    }
    $("#warehouse").selectpicker("refresh");
}
codeGenerator();
function codeGenerator() {
    const date = new Date();
    const time = date.getTime();
    const key = time.toString().substring(4);
    $("#bNo").val(key);
}

function allBox( ){
    console.log("Çalıştı")
    const i = $('#suppliers').val();

    $.ajax({
        url:'/buy/boxes/' + i,
        type:'GET',
        dataType:'JSON',

        success:function (data){
            console.log(data)
            createBox(data,i);
            fncAddReset();
        },
        error:function (err){

        }

    })
}
let globalBoxes = []
function createBox( data ,suid) {
    globalCusBox = [];
    globalBoxes = data;
    let productName ;


    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data [i];

        for (let j = 0; j<globalProArr.length; j++){
            if (globalProArr[j].proid == itm.prodid){
                rid = itm.bid;
                productName = globalProArr[j].productname;
                for (let k =0 ; k<globalWareArr.length; k++){
                    if (globalWareArr[k].wid == itm.warid){
                        globalCusBox.push(itm);
                        html += `<tr>
                      <td>`+productName+`</td>
                      <td>`+itm.price+`</td>
                      <td>`+itm.quantity+`</td>
                      <td>`+itm.bid+`</td>
                      <td>`+globalWareArr[k].wname+`</td>
                       <td class="text-right" >
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button onclick="fncDelete(`+itm.boid+`)" type="button" class="btn btn-outline-primary "><i class="far fa-trash-alt"></i></button>
                            </div>
                        </td>
                    </tr>`
                    }
                }
            }
        }
    }
    $('#tableRow').html(html);
}
fncAddReset();
function fncAddReset() {
    select_id = 0;
    $("#quantity").val("");
    $("#price").val("");

    if(rid != 0){
        $("#bNo").val(rid);
        rid = 0;
    }else {
        codeGenerator();
    }
}
function fncSaveBox(){
    console.log(globalCusBox)
   paymenttype = $('#payment-type').val()
    if (globalCusBox.length != 0 && paymenttype != 0){
        $.ajax({
            url:'/buy/savebox/'+paymenttype,
            type:'POST',
            data:JSON.stringify(globalCusBox),
            dataType:'JSON',
            contentType: 'application/json; charset=utf-8',
            success: function ( data ){
                if (data == 1){
                    alert("işlem Başarılı");
                    allBox();
                    allList()
                    fncAddReset();
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
function fncDelete(box_bid){
    let answer = confirm("Silmek istediğinizden emin misniz?");
    if (answer){
        $.ajax({
            url:'/buy/deletebox/'+box_bid,
            type:'GET',
            dataType:'JSON',
            contentType: 'application/json; charset=utf-8',
            success: function ( data ){
                if (data == 1){
                    alert("işlem Başarılı");
                    allBox();
                    fncAddReset();
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

allList();
function allList(){
    $.ajax({
        url:'/buy/list/',
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

let supplierName;
let PaymentType;
    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data [i];

        for (let j = 0; j<globalSupArr.length; j++){
            if (globalSupArr[j].sid == itm.cus_id){
                supplierName = globalSupArr[j].sname;
                    if (itm.paymenttype== 1) {
                        paymenttype = "Nakit"
                    }
                    else if(itm.paymenttype ==2 ){
                        paymenttype = "Banka Kartı"
                    }
                    else {
                        paymenttype = "Banka Havale"
                    }
                        globalCusBox.push(itm);
                        html += `    <tr>
        <th scope="row">`+itm.bill_id+`</th>
        <td>`+supplierName+`</td>
        <td>`+paymenttype+`</td>
        <td>`+itm.amount+`</td>
        <td>`+itm.note+`</td>
        <td>`+itm.date+`</td>
    </tr>`


            }
        }
    }
    $('#tableBuy').html(html);

}