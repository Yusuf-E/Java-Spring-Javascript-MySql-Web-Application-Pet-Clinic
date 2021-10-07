function allCategory(){

    $.ajax({
        url: '/category/list',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            createCategory(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}
allCategory()

function createCategory( data ){
    const selectedCat = $("#selectedCat").val();
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.categoryname;
        if(itm.caid != selectedCat){
            $("#product-category").append(`<option data-subtext="" value=" `+itm.caid+` ">`+st+`</option>` ) ;
        }
    }
    $("#product-category").selectpicker("refresh");



}


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

allSupplier()

function createSupplier( data ){
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.sname;
        const selectedSupp = $("#selectedSupp").val();
        if(itm.sid != selectedSupp){
            $("#product-supplier").append(`<option  data-subtext="" value=" `+itm.sid+` ">`+st+`</option>` ) ;
        }
    }
    $("#product-supplier").selectpicker("refresh");
}

// supplier delete - start
function fncProductDelete( proid ) {
    let answer = confirm("Silmek istediğinizden emin misniz?");
    if ( answer ) {

        $.ajax({
            url: './product/delete/'+proid,
            type: 'GET',
            dataType: 'text',
            success: function (data) {
                if ( data != "0" ) {
                    allProduct();
                }else {
                    alert("Silme sırasında bir hata oluştu!");
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
}

$('#product-update-form').submit( (event) =>{
    event.preventDefault();

    const product_id = $("#hip").val()
    const productname = $("#product-name").val()
    const productunit = $("#product-unit").val()
    const productcategory = $("#product-category").val()
    const producttype = $("#product-type").val()
    const productsuppliers = $("#product-supplier").val()
    const productbarcode = $("#pbarcode").val()
    const productcode = $("#pcode").val()
    const producttax = $("#ptax").val()
    const buyprice = $("#bprice").val()
    const sellprice = $("#sprice").val()
    const criticalquantity = $("#critic").val()
    let productstatus;
    let pspki;
    let pbpki;
    if($("#inlineCheckbox1").is(":checked")){
        productstatus = 'Aktif'
    }else {
        productstatus = 'Pasif'
    }
    if($("#inlineCheckbox2").is(":checked")){
        pspki = 'Dahil'
    }else {
        pspki = 'Dahil Degil'
    }
    if($("#inlineCheckbox3").is(":checked")){
        pbpki = 'Dahil'
    }else {
        pbpki = 'Dahil Degil'
    }

    const obj = {
        proid:product_id,
        productname: productname,
        productunit: productunit,
        producttype:producttype,
        productbarcode: productbarcode,
        productcode: productcode,
        producttax:producttax,
        buyprice: buyprice,
        sellprice: sellprice,
        criticalquantity: criticalquantity,
        productstatus:productstatus,
        pspki:pspki,
        pbpki:pbpki,
        productsuppliers:productsuppliers,
        productcategory:productcategory,

    }
    console.log(obj);

    $.ajax({
        url: '/product/update',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                window.location.reload(false);

            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })
})

allWarehouse()
function allWarehouse(){

    $.ajax({
        url: '/warehouse/list',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            createRow(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}

let globalArr = []
let globalStock = []
function createRow( data ) {
    globalStock = data
    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.wname;
            $("#warehouse").append(`<option  data-subtext="" value=" `+itm.wid+` ">`+st+`</option>` ) ;
            $("#warehouse-select").append(`<option  data-subtext="" value=" `+itm.wid+` ">`+st+`</option>` ) ;
        }
    $("#warehouse").selectpicker("refresh");
    $("#warehouse-select").selectpicker("refresh");
}

let lastStock = 0;

$('#form-stock').submit( (event) =>{
    event.preventDefault();



    const prodid = $("#hip").val()
    let stock = $("#quantity").val()
    const waid = $("#warehouse-select").val()
    const opstatus = true;

    stock = parseInt(stock)+parseInt(lastStock) ;

    const obj = {
        prodid:prodid,
        stock: stock,
        waid: waid,
        opstatus:opstatus,
    }
    console.log(obj);

    $.ajax({
        url: '/product/addStock',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                window.location.reload(false);

            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })
})

let stockStat = 0;
stockList();
function stockList(){
    const pid = $("#hip").val()
    console.log("pid:" + pid)
    $.ajax({
        url: '/product/pslist/' + pid,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data)
            createStock(data)
        },
        error: function (err){
            console.log(err)
        }
    })
}
$('#warehouse').on('change', function() {
        stockList()
});
function createStock( data ) {

    let j = 0;
    console.log("Buradaa")
    globalArr = data;
    const waid = $("#warehouse").val()
    console.log("değeri :" + waid)
    const waidName = $("#warehouse").find("option:selected").text();
    let opstatus;
    const productName = $("#product-name").val()
    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data [i];
        if (waid == itm.waid){
            if (j == 0 && itm.stock != null){
                lastStock = itm.stock;
                console.log("last stock" + lastStock)
                j++;
            }
            if (itm.opstatus == 1){
                opstatus = "Depoya Giriş"
            }
            else {
                opstatus = "Depodan Çıkış"
            }
            html += `<tr>
              <td>`+itm.date+`</td>
              <td >`+productName+`</td>
              <td >`+waidName+`</td>
              <td >`+opstatus+`</td>
              <td >`+itm.stock+`</td>

            </tr>`
        }

    }
    $('#stockRow').html(html);
}
