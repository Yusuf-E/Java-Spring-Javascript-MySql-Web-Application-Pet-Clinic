let suid = 0;
/*Supplier Add - start*/
let select_sid = 0
$('#form-supplier').submit( (event) =>{
    event.preventDefault();

    const  sname = $("#sname").val()
    const  semail = $("#semail").val()
    const  sphone = $("#sphone").val()
    let  sstatus;
    if($("#sstatus").is(":checked")){
        sstatus = 'Aktif'
    }else {
        sstatus = 'Pasif'
    }

    const obj = {
        sname: sname,
        semail: semail,
        sphone: sphone,
        sstatus: sstatus
    }
    console.log(obj);
    if ( select_sid != 0 ) {
        // update
        obj["sid"] = select_sid;
    }
    $.ajax({
        url: './suppliers/add',
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
                allSupplier()

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
/*Supplier Add - end*/

allSupplier()

/* Supplier List - start */


function allSupplier(){

    $.ajax({
        url: './suppliers/slist',
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
        <th scope="row">`+itm.sid+`</th>
        <td>`+itm.sname+`</td>
        <td>`+itm.semail+`</td>
        <td>`+itm.sphone+`</td>
        <td>`+itm.sstatus+`</td>
        <td class="text-right" >
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="fncSupplierDelete(`+itm.sid+`)" type="button" class="btn btn-outline-primary "><i class="far fa-trash-alt"></i></button>
                <button onclick="fncSupplierUpdateRow(`+i+`)" data-bs-toggle="modal" data-bs-target="#supplierUpdateModal" type="submit" class="btn btn-outline-primary "><i class="fas fa-pencil-alt"></i></button>
              </div>
            </td>
      </tr>`
    }
    $('#supplierRow').html(html);
}

// supplier delete - start
function fncSupplierDelete( sid ) {
    let answer = confirm("Silmek istediğinizden emin misniz?");
    if ( answer ) {

        $.ajax({
            url: './suppliers/delete/'+sid,
            type: 'GET',
            dataType: 'text',
            success: function (data) {
                if ( data != "0" ) {
                    allSupplier();
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

// supplier update - start
function fncSupplierUpdateRow( i ) {
    const itm = globalArr[i];
    suid = itm.sid
    $("#usname").val(itm.sname)
    $("#usemail").val(itm.semail)
    $("#usphone").val(itm.sphone)
    $("#uemail").val(itm.email)
    if (itm.sstatus == 'Aktif') {
        $('#usstatus').prop('checked', true);
    }
    else {
        $('#usstatus').prop('checked', false);
    }
}

$('#form-supplier-update').submit( (event) =>{
    event.preventDefault();
    const sid = suid;
    const  sname = $("#usname").val()
    const  semail = $("#usemail").val()
    const  sphone = $("#usphone").val()
    let  sstatus;
    if($("#usstatus").is(":checked")){
        sstatus = 'Aktif'
    }else {
        sstatus = 'Pasif'
    }

    const obj = {
        sid: sid,
        sname: sname,
        semail: semail,
        sphone: sphone,
        sstatus: sstatus
    }
    console.log(obj);

    $.ajax({
        url: './suppliers/add',
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
                allSupplier()
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

// supplier update - end





