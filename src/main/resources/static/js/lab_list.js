function allCustomer(){
    $.ajax({
        url: './lab-list',
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
        <td>
        <a href="/lab-detail/`+itm.cid+`">`+itm.cname+" "+ itm.csurname+`</a>
        </td>
        <td>`+itm.mobile_phone+`</td>
        <td>`+itm.email+`</td>
        <td>`+itm.tax+`</td>
        <td>`+itm.cnote+`</td>
        
      </tr>`;
    }
    $('#customerRow').html(html);
}