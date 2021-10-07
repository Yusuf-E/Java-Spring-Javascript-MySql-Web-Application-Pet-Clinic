let globalArr = []
allLab()
function allLab(){

    const petID = $('#petID').val()
    $.ajax({
        url: './result/'+petID,
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

function createRow( data ) {
    globalArr = data;

    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data [i];
        const st = itm.type ==  1  ? 'Hemogram' : itm.type== 2 ?  'Röntgen'  : itm.type== 3 ? 'Biyokimya' : 'Diğer'
        html += `<tr>
        <th scope="row">`+itm.date+`</th>
        <td>`+st+`</td>
        <td class="text-center" >
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="fnclabView(`+i+`)"  data-bs-toggle="modal" data-bs-target="#plabViewModel" type="submit" class="btn btn-outline-primary ">Görüntüle</button>
              </div>
            </td>
      </tr>`
    }
    $('#labRow').html(html);
}


function fnclabView( i ) {
    const itm = globalArr[i];
    const st = itm.type ==  1  ? 'Hemogram' : itm.type== 2 ?  'Röntgen'  : itm.type== 3 ? 'Biyokimya' : 'Diğer'
    $("#labtype").text(st)
    $("#labdate").text(itm.date)
    $("#labresult").text(itm.result)
    $("#imgID").attr('src','/uploads/labImage/'+itm.labimage.imagename)

}






/*function createRow2( data ) {
    globalArr = data;

    let html = ``
    for (let i = 0; i < data.length; i++) {
        const itm = data [i];
        const st = itm.type ==  1  ? 'Hemogram' : itm.type== 2 ?  'Röntgen'  : itm.type== 3 ? 'Biyokimya' : 'Diğer'
        html += `<tr>
        <th scope="row">`+st+`</th>
        <td >`+itm.date+`</td>
        <td> `+itm.result+` </td>

      </tr>`
    }
    $('#labRowView').html(html);
}*/
