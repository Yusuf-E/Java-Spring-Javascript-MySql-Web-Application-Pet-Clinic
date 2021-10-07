$('#product-add-form').submit( (event) =>{
    event.preventDefault();

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
        url: './product/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                allProduct();
                 $("#product-nam").val("")
                 $("#product-unit").val(0)
                 $("#product-type").val(0)
                 $("#pbarcode").val("")
                 $("#pcode").val("")
                 $("#ptax").val("")
                 $("#bprice").val("")
                 $("#sprice").val("")
                 $("#critic").val("")
                allSupplier();
                 allCategory();
                 codeGenerator();
                console.log(data)

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

    $("#product-category").find('option').remove().end();
    $("#product-category").append( `<option data-subtext=""> Seçim Yapınız </option>` );

        for (let i = 0; i<data.length;i++){
            const itm = data[i];
            const st = itm.categoryname;
            $("#product-category").append(`<option data-subtext="" value=" `+itm.caid+` ">`+st+`</option>` ) ;
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

    $("#product-supplier").find('option').remove().end();
    $("#product-supplier").append( `<option data-subtext=""> Seçim Yapınız </option>` );

    for (let i = 0; i<data.length;i++){
        const itm = data[i];
        const st = itm.sname;
        $("#product-supplier").append(`<option data-subtext="" value=" `+itm.sid+` ">`+st+`</option>` ) ;
    }
    $("#product-supplier").selectpicker("refresh");
}

allProduct();
function allProduct(){

    $.ajax({
        url: './product/plist',
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
function createRow( data ) {
    globalArr = data;
    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data [i];
        html += `<tr>
        <th scope="row">`+itm.productname+`</th>
        <td>`+itm.productbarcode+`</td>
        <td>`+itm.buyprice+`</td>
        <td>`+itm.sellprice+`</td>
        <td class="text-right" >
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="fncProductDelete(`+itm.proid+`)" type="button" class="btn btn-outline-primary "><i class="far fa-trash-alt"></i></button>
                <a href='/product/detail/`+itm.proid+`'><button type="button" class="btn btn-outline-primary "><i class="far fa-edit"></i></button></a>
              </div>
            </td>
      </tr>`
    }
    $('#productRow').html(html);
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
// supplier delete - end





function codeGenerator() {
    const date = new Date();
    const time = date.getTime();
    const key = time.toString().substring(4);
    $("#pcode").val(key);
}

$("#search").keyup(function () {

    const psearch = $("#search").val()
    if( psearch != "") {
        $.ajax({
            url: './product/search/' + psearch,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data)
                createRow(data)
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    else {
        allProduct()
    }
})


