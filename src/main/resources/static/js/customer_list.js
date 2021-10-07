let globalArr = []
let ucid = 0;


function allCustomer(){
    $.ajax({
        url: './clist',
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
allCustomer()


function createRow( data ) {
    globalArr = data;
    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr>
        <th scope="row">`+itm.cid+`</th>
        <td>`+itm.cname+`</td>
        <td>`+itm.csurname+`</td>
        <td>`+itm.mobile_phone+`</td>
        <td>`+itm.email+`</td>
        <td>`+itm.tax+`</td>
        <td>`+itm.cnote+`</td>
        <td>`+itm.caddress+ ' ' + itm.cdistrict+ '/'+itm.cprovince+`</td>
        <td class="text-right" >
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="fncCustomerDelete(`+itm.cid+`)" type="button" class="btn btn-outline-primary "><i class="far fa-trash-alt"></i></button>
                <button onclick="fncCustomerUpdate(`+i+`)" data-bs-toggle="modal" data-bs-target="#customerUpdateModal" type="button" class="btn btn-outline-primary "><i class="fas fa-pencil-alt"></i></button>
              </div>
            </td>
      </tr>`;
    }
    $('#customerRow').html(html);
}

// customer update - start
function fncCustomerUpdate( i ) {
    const itm = globalArr[i];
    ucid = itm.cid
    $("#cname").val(itm.cname)
    $("#csurname").val(itm.csurname)
    $("#mobile_phone").val(itm.mobile_phone)
    $("#email").val(itm.email)
    $("#tax").val(itm.tax)
    $("#cnote").val(itm.cnote)
    $("#cprovince").val(itm.cprovince)
    $("#cdistrict").val(itm.cdistrict)
    $("#caddress").val(itm.caddress)

}

function updateCustomer() {
    const cid = ucid;
    const cname = $("#cname").val()
    const csurname = $("#csurname").val()
    const mobile_phone = $("#mobile_phone").val()
    const email = $("#email").val()
    const tax = $("#tax").val()
    const tax_administration = $("#tax_administration").val()
    const ctype = $("#ctype").val()
    const cNote = $("#cnote").val()
    const cProvince = $("#cprovince").val()
    const cDistrict = $("#cdistrict").val()
    const cAddress = $("#caddress").val()
    const cDiscount = $("#cdiscount").val()


    const obj = {
        cid: cid,
        cname: cname,
        csurname: csurname,
        mobile_phone: mobile_phone,
        email: email,
        tax: tax,
        tax_administration: tax_administration,
        ctype: ctype,
        cnote: cNote,
        cprovince: cProvince,
        cdistrict: cDistrict,
        caddress: cAddress,
        cdiscount: cDiscount
    }
    console.log(obj);

    $.ajax({
        url: './update',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                $("#sname").val("")
                $("#semail").val("")
                $("#sphone").val("")
                console.log(data)
                allCustomer()
            } else {
                console.log("İşlem sırasında hata oluştu!")
            }
        },
        error: function (err) {
            console.log(err)
            alert("İşlem sırısında bir hata oluştu!");
        }
    })

}

//customer update - end


$("#search").keyup(function () {

    const csearch = $("#search").val()
    if( csearch != "") {
        $.ajax({
            url: './search/' + csearch,
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
        allCustomer()
    }
})

// customer delete - start
function fncCustomerDelete( cid ) {
    let answer = confirm("Silmek istediğinizden emin misniz?");
    if ( answer ) {

        $.ajax({
            url: './delete/'+cid,
            type: 'GET',
            dataType: 'text',
            success: function (data) {
                if ( data != "0" ) {
                    allCustomer();
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
// customer delete - end