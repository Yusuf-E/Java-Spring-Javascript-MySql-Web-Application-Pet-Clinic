$('#form-warehouse').submit( (event) =>{
    event.preventDefault();

    const  wname = $("#wname").val()

    const obj = {
        wname: wname
    }
    $.ajax({
        url: './warehouse/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data) {
                $("#wname").val("")
                console.log(data)
                allWarehouse()
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
        url: './warehouse/list',
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
        html += `        <tr>
          <td><a href="#">`+itm.wname+`</a></td>
          <td >Aktif</td>

        </tr>`
    }
    $('#whRow').html(html);
}
